#!/usr/bin/env node
/**
 * 生成 llm.txt —— 面向大模型的站点索引（llmstxt.org 约定）。
 *
 * 用法：
 *   node scripts/generate-llm-txt.mjs
 *   npm run docs:llm
 *
 * 产物：
 *   docs/public/llm.txt
 *   VitePress 构建时会把 public 目录原样复制到站点根目录，因此线上路径为 /llm.txt。
 *
 * 内容全部来自现有文章与站点配置，不维护任何手工副本：
 *   - 站点基础地址来自 docs/.vitepress/config.mjs 的 sitemap.hostname；
 *   - 站点标题、简介来自 config.mjs 与 docs/index.md；
 *   - 分类与条目来自 docs 下的 Markdown 及其 frontmatter；
 *   - 条目摘要优先取 frontmatter.description，没有则取正文首个有效段落。
 *
 * 脚本可重复执行：同样的输入必然得到同样的输出。
 */
import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync } from 'node:fs'
import { dirname, join, relative, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const docsDir = join(root, 'docs')
const configPath = join(docsDir, '.vitepress', 'config.mjs')
const outPath = join(docsDir, 'public', 'llm.txt')

const UNKNOWN_BASE = '(TBD: 站点公开基础 URL)'

/** 递归收集 docs 下的 Markdown 文件（跳过 .vitepress 目录）。 */
function collectMarkdown(dir, acc = []) {
  for (const entry of readdirSync(dir)) {
    if (entry === '.vitepress') continue
    const full = join(dir, entry)
    const st = statSync(full)
    if (st.isDirectory()) collectMarkdown(full, acc)
    else if (entry.endsWith('.md')) acc.push(full)
  }
  return acc
}

/**
 * 解析 frontmatter。只支持本仓库实际用到的写法：
 *   key: value / key: "value" / key: [a, b] / key: [a, b]
 * 解析不到就返回空对象，不猜测。
 */
function parseFrontmatter(text) {
  const out = {}
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(text)
  if (!m) return out
  for (const rawLine of m[1].split(/\r?\n/)) {
    const line = rawLine.trim()
    if (!line || line.startsWith('#')) continue
    const kv = /^([A-Za-z0-9_-]+)\s*:\s*(.*)$/.exec(line)
    if (!kv) continue
    const key = kv[1]
    let value = kv[2].trim()
    if (value.startsWith('"') && value.endsWith('"') && value.length > 1) {
      value = value.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\')
      out[key] = value
      continue
    }
    if (value.startsWith('[') && value.endsWith(']')) {
      out[key] = value
        .slice(1, -1)
        .split(',')
        .map((v) => v.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean)
      continue
    }
    out[key] = value
  }
  return out
}

/** 去掉 frontmatter 之后的正文。 */
function bodyOf(text) {
  const m = /^---\r?\n[\s\S]*?\r?\n---\r?\n?/.exec(text)
  return m ? text.slice(m[0].length) : text
}

/**
 * 从正文里取第一个有效段落，作为没有 description 时的摘要。
 * 跳过标题、代码块、表格、列表、链接、HTML 和纯符号行。
 */
function firstParagraph(body) {
  const lines = body.split(/\r?\n/)
  let inFence = false
  for (const line of lines) {
    const t = line.trim()
    if (/^(```|~~~)/.test(t)) {
      inFence = !inFence
      continue
    }
    if (inFence || !t) continue
    if (t.startsWith('#')) continue
    if (t.startsWith('|') || t.startsWith('>') || t.startsWith('<')) continue
    if (/^[-*+]\s/.test(t) || /^\d+\.\s/.test(t)) continue
    if (/^[-=*_]{3,}$/.test(t)) continue
    const plain = t.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[*_`]/g, '').trim()
    if (!plain || /^https?:\/\//i.test(plain)) continue
    if (plain.length < 8) continue
    return plain
  }
  return ''
}

/** 站点基础地址：优先 config.mjs 的 sitemap.hostname，取不到就明确标注待补。 */
// 站点基础地址：优先读 config.mjs 顶部的 SITE_URL 常量（部署地址的唯一来源），
// 读不到再退回 sitemap.hostname，都没有则明确标注待填。
function resolveBaseUrl() {
  const cfg = readFileSync(configPath, 'utf8')
  const siteUrl = /const\s+SITE_URL\s*=\s*['"`]([^'"`]+)['"`]/.exec(cfg)
  if (siteUrl) return siteUrl[1].replace(/\/+$/, '')
  const host = /hostname\s*:\s*['"`]([^'"`]+)['"`]/.exec(cfg)
  return host ? host[1].replace(/\/+$/, '') : UNKNOWN_BASE
}

/** 站点标题与站点级描述。 */
function resolveSiteMeta() {
  const cfg = readFileSync(configPath, 'utf8')
  const title = /\btitle\s*:\s*['"`]([^'"`]+)['"`]/.exec(cfg)
  const desc = /\bdescription\s*:\s*['"`]([^'"`]+)['"`]/.exec(cfg)
  return {
    title: title ? title[1] : 'VitePress 笔记站',
    description: desc ? desc[1] : ''
  }
}

/** 页面路径：index.md 对应目录 URL，其余对应 .html。 */
function urlPathFor(relPath) {
  const normalized = relPath.split(sep).join('/')
  if (normalized === 'index.md') return '/'
  if (normalized.endsWith('/index.md')) return '/' + normalized.slice(0, -'index.md'.length)
  return '/' + normalized.replace(/\.md$/, '.html')
}

/** 站内相对链接同时存在说明文字与目标，取目标作为分组线索。 */
function isMeaningfulSummary(text) {
  if (!text) return false
  if (/^https?:\/\//i.test(text)) return false
  return text.length >= 8
}

const baseUrl = resolveBaseUrl()
const site = resolveSiteMeta()

const files = collectMarkdown(docsDir)
const pages = []
for (const file of files) {
  const rel = relative(docsDir, file).split(sep).join('/')
  const text = readFileSync(file, 'utf8')
  const fm = parseFrontmatter(text)
  const body = bodyOf(text)
  const description = isMeaningfulSummary(fm.description)
    ? fm.description
    : firstParagraph(body)
  pages.push({
    rel,
    title: fm.title || '',
    description,
    date: fm.date || '',
    order: Number.parseInt(fm.order, 10),
    layout: fm.layout || '',
    urlPath: urlPathFor(rel),
    segment: rel.includes('/') ? rel.split('/')[0] : '',
    isIndex: rel.endsWith('/index.md')
  })
}

/** 分组：按顶层目录归类，根目录页面单独成组。 */
const groups = new Map()
for (const page of pages) {
  const key = page.segment || ''
  if (!groups.has(key)) groups.set(key, [])
  groups.get(key).push(page)
}

/** 组内排序：index.md 排在最前，其余按 frontmatter order 升序，再按文件名。 */
function comparePages(a, b) {
  if (a.isIndex !== b.isIndex) return a.isIndex ? -1 : 1
  const ao = Number.isFinite(a.order) ? a.order : Number.MAX_SAFE_INTEGER
  const bo = Number.isFinite(b.order) ? b.order : Number.MAX_SAFE_INTEGER
  if (ao !== bo) return ao - bo
  return a.rel.localeCompare(b.rel, 'zh-CN')
}

/** 组顺序：按该目录 index.md 的 order 升序；根目录组排在最前。 */
function groupOrder(key) {
  const list = groups.get(key)
  const indexPage = list.find((p) => p.isIndex)
  if (key === '') return -1
  if (indexPage && Number.isFinite(indexPage.order)) return indexPage.order
  return Number.MAX_SAFE_INTEGER
}

const orderedKeys = [...groups.keys()].sort((a, b) => {
  const oa = groupOrder(a)
  const ob = groupOrder(b)
  if (oa !== ob) return oa - ob
  return a.localeCompare(b, 'zh-CN')
})

/** 首页说明：优先 docs/index.md 的 description。 */
const homePage = pages.find((p) => p.rel === 'index.md')
const siteSummary = (homePage && homePage.description) || site.description

/** 关于页首段，用来给站点一句更完整的介绍。 */
const aboutPage = pages.find((p) => p.rel === 'about.md')
const aboutLead = aboutPage ? aboutPage.description : ''

const lines = []
lines.push(`# ${site.title}`)
lines.push('')
lines.push(`> ${siteSummary}`)
lines.push('')
if (aboutLead && aboutLead !== siteSummary) {
  lines.push(aboutLead)
  lines.push('')
}
lines.push(`站点基础地址：${baseUrl}`)
lines.push('')

let entryCount = 0
for (const key of orderedKeys) {
  const list = groups.get(key).sort(comparePages)
  const groupTitle = key === '' ? '站点页面' : key
  lines.push(`## ${groupTitle}`)
  lines.push('')
  for (const page of list) {
    // 首页作为站点入口单独出现，不在分类清单里重复。
    if (page.rel === 'index.md') continue
    const absolute = baseUrl === UNKNOWN_BASE ? page.urlPath : baseUrl + page.urlPath
    const encoded = baseUrl === UNKNOWN_BASE ? page.urlPath : encodeURI(absolute)
    const title = page.title || page.rel.replace(/\.md$/, '')
    const summary = page.description ? page.description.replace(/\s+/g, ' ').trim() : ''
    lines.push(summary ? `- [${title}](${encoded}): ${summary}` : `- [${title}](${encoded})`)
    entryCount++
  }
  lines.push('')
}

const output = lines.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n'
mkdirSync(dirname(outPath), { recursive: true })
writeFileSync(outPath, output, 'utf8')

console.log(`llm.txt written: ${relative(root, outPath)}`)
console.log(`base url: ${baseUrl}`)
console.log(`entries: ${entryCount} (markdown files: ${pages.length})`)
