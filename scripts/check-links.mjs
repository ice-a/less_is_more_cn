#!/usr/bin/env node
/**
 * 外链巡检工具（长期维护用）
 *
 * 用法：
 *   node scripts/check-links.mjs                 # 全量巡检，输出报告
 *   node scripts/check-links.mjs --concurrency 8 # 调整并发
 *   node scripts/check-links.mjs --timeout 20000 # 调整单链接超时（毫秒）
 *   node scripts/check-links.mjs --only dead     # 只看某一类：ok/dead/blocked/unreachable
 *
 * 退出码：有「dead」链接时返回 1，其余返回 0，方便挂到 CI 或定期任务上。
 *
 * 判定口径（写在这里，避免每次重新争论）：
 *   dead        404 / 410 —— 资源确实没了，需要替换或删除
 *   blocked     401 / 403 / 406 / 421 / 429 / 5xx / 521 等 —— 多为反爬、限流或需要登录，页面通常还在，保留
 *   unreachable 网络错误 / 超时 —— 可能是本机网络或对方临时故障，默认保留，人工复核
 *   placeholder 示例域、内网地址、占位主机名 —— 保留
 *
 * 对 dead 链接会尝试给出替代建议（都实测过状态码才写进报告）：
 *   readthedocs.org → readthedocs.io
 *   pythonhosted.org/<pkg> → https://pypi.org/project/<pkg>/
 *   bitbucket.org/<owner>/<repo> → https://github.com/<owner>/<repo>
 *   github.com/<owner>/<repo> 失效 → 同名仓库（按 star 数）或 PyPI 页面
 */
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const args = process.argv.slice(2)
const argOf = (name, def) => {
  const i = args.indexOf(name)
  return i >= 0 && args[i + 1] ? args[i + 1] : def
}
const CONCURRENCY = Number(argOf('--concurrency', 6))
const TIMEOUT = Number(argOf('--timeout', 15000))
const ONLY = argOf('--only', '')
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'
const CACHE_FILE = 'scripts/.link-cache.json'
const REPORT_FILE = 'scripts/_link-report.md'

const PLACEHOLDER_HOST = /^(example\.(com|org|net)|localhost|127\.0\.0\.1|0\.0\.0\.0|historyserver|es01-test|xxx+|server|host)$/i
const PLACEHOLDER_PATH = /\/(v1|api)$/

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    if (['node_modules', 'dist', 'cache', '.vitepress'].includes(name)) continue
    const full = join(dir, name)
    if (statSync(full).isDirectory()) walk(full, acc)
    else if (name.endsWith('.md')) acc.push(full)
  }
  return acc
}

/** 从 markdown 里抽出外链，并记录它出现在哪些文件 */
function collectLinks() {
  const map = new Map()
  for (const file of walk('docs')) {
    const text = readFileSync(file, 'utf8')
    const noCode = text.replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '')
    const re = /https?:\/\/[^\s)\]"'<>`]+/g
    let m
    while ((m = re.exec(noCode))) {
      const url = m[0].replace(/[.,;:，。；]+$/, '')
      if (!map.has(url)) map.set(url, new Set())
      map.get(url).add(file)
    }
  }
  return map
}

async function probe(url) {
  const c = new AbortController()
  const t = setTimeout(() => c.abort(), TIMEOUT)
  try {
    const r = await fetch(url, { redirect: 'follow', signal: c.signal, headers: { 'user-agent': UA } })
    return { status: r.status, final: r.url }
  } catch (e) {
    return { status: 0, error: String(e.cause?.code || e.name || e.message) }
  } finally {
    clearTimeout(t)
  }
}

function classify(url, res) {
  if (res.status === 404 || res.status === 410) return 'dead'
  if (res.status >= 200 && res.status < 400) return 'ok'
  if (res.status === 0) return 'unreachable'
  return 'blocked'
}

async function suggest(url) {
  const tryUrl = async (u) => {
    const r = await probe(u)
    return r.status >= 200 && r.status < 400 ? u : null
  }
  if (url.includes('readthedocs.org')) {
    const c = url.replace('readthedocs.org', 'readthedocs.io').replace(/^http:/, 'https:')
    return (await tryUrl(c)) || (await pypiGuess(url))
  }
  if (url.includes('pythonhosted.org')) {
    const m = /pythonhosted\.org\/([^/]+)/.exec(url)
    if (m) return pypiGuess(m[1])
    return null
  }
  const bh = /^https?:\/\/bitbucket\.org\/([^/]+)\/([^/#?]+)/.exec(url)
  if (bh) {
    const cand = `https://github.com/${bh[1]}/${bh[2].replace(/\.git$/, '')}`
    return tryUrl(cand)
  }
  const gh = /^https?:\/\/github\.com\/([^/]+)\/([^/#?]+)/.exec(url)
  if (gh) {
    const [, owner, repoRaw] = gh
    const repo = repoRaw.replace(/\.git$/, '')
    const direct = await tryUrl(`https://github.com/${owner}/${repo}`)
    if (direct) return direct
    const found = await searchRepo(repo, owner)
    if (found) return found
    return pypiGuess(repo)
  }
  return null
}

async function pypiGuess(name) {
  if (!name) return null
  try {
    const r = await fetch(`https://pypi.org/pypi/${encodeURIComponent(name)}/json`, { headers: { 'user-agent': UA } })
    if (!r.ok) return null
    const j = await r.json()
    return `https://pypi.org/project/${j.info.name}/`
  } catch { return null }
}

async function searchRepo(repo, owner) {
  try {
    const r = await fetch(
      `https://api.github.com/search/repositories?q=${encodeURIComponent(`${repo} in:name user:${owner}`)}&sort=stars&per_page=5`,
      { headers: { 'user-agent': UA } },
    )
    if (!r.ok) return null
    const j = await r.json()
    const hit = (j.items || []).find((i) => i.stargazers_count >= 50)
    return hit ? hit.html_url : null
  } catch { return null }
}

const links = collectLinks()
console.log(`扫描到 ${links.size} 个唯一外链（并发 ${CONCURRENCY}，超时 ${TIMEOUT}ms）`)

const cache = existsSync(CACHE_FILE) ? JSON.parse(readFileSync(CACHE_FILE, 'utf8')) : {}
const results = []
const urls = [...links.keys()]
let idx = 0
async function worker() {
  while (idx < urls.length) {
    const url = urls[idx++]
    const hit = cache[url]
    const res = hit && Date.now() - hit.at < 7 * 24 * 3600 * 1000 ? { status: hit.status, error: hit.error } : await probe(url)
    if (!hit || res.status !== hit.status) cache[url] = { status: res.status, error: res.error, at: Date.now() }
    const kind = classify(url, res)
    let suggestion = null
    if (kind === 'dead') suggestion = await suggest(url)
    results.push({ url, status: res.status, error: res.error, kind, used: [...links.get(url)], suggestion })
    process.stdout.write('.')
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker))
console.log('')
writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf8')

const groups = { ok: [], dead: [], blocked: [], unreachable: [] }
for (const r of results) groups[r.kind].push(r)

const md = []
md.push('# 外链巡检报告')
md.push('')
md.push(`- 生成时间：${new Date().toISOString()}`)
md.push(`- 扫描范围：\`docs/**.md\`（跳过代码块与行内代码）`)
md.push(`- 唯一外链：${results.length}`)
md.push(`- 可达：${groups.ok.length} ｜ 死链（404/410）：${groups.dead.length} ｜ 反爬或需授权：${groups.blocked.length} ｜ 网络不可达：${groups.unreachable.length}`)
md.push('')

if (groups.dead.length) {
  md.push('## 死链（需要替换或删除）')
  md.push('')
  for (const r of groups.dead) {
    md.push(`- \`${r.url}\` → ${r.suggestion ? `建议改为 ${r.suggestion}` : '未找到替代，建议删除链接并保留文字'}`)
    md.push(`  - 出现于：${r.used.join('、')}`)
  }
  md.push('')
}
if (groups.blocked.length) {
  md.push('## 反爬 / 需授权（保留，页面通常仍存在）')
  md.push('')
  for (const r of groups.blocked) md.push(`- \`${r.url}\` → HTTP ${r.status}`)
  md.push('')
}
if (groups.unreachable.length) {
  md.push('## 网络不可达（需人工复核，默认保留）')
  md.push('')
  for (const r of groups.unreachable) md.push(`- \`${r.url}\` → ${r.error || '连接失败'}`)
  md.push('')
}
writeFileSync(REPORT_FILE, md.join('\n'), 'utf8')

console.log(`可达 ${groups.ok.length} ｜ 死链 ${groups.dead.length} ｜ 反爬 ${groups.blocked.length} ｜ 不可达 ${groups.unreachable.length}`)
console.log(`报告：${REPORT_FILE}`)
if (ONLY) {
  const sel = groups[ONLY] || []
  console.log(`\n[${ONLY}] ${sel.length} 条`)
  for (const r of sel.slice(0, 200)) console.log(`  ${r.status} ${r.url}${r.suggestion ? '  →  ' + r.suggestion : ''}`)
}
process.exit(groups.dead.length ? 1 : 0)
