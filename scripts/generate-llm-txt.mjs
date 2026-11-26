#!/usr/bin/env node
/**
 * 生成 llm.txt —— 面向大模型的站点索引（llmstxt.org 约定）。
 *
 * 用法：
 *   node scripts/generate-llm-txt.mjs
 *   npm run docs:llm
 *
 * 产物：content/public/llm.txt，VitePress 构建时原样复制到站点根目录。
 *
 * 输入全部来自 content/ 下的 Markdown frontmatter，不维护手工副本：
 *   - title / description / date / tags / hidden
 */
import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync } from 'node:fs'
import { join, relative, resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const contentDir = join(root, 'content')
const outPath = join(contentDir, 'public', 'llm.txt')

const SITE_URL = 'https://ice-a.github.io/less_is_more_cn'
const BASE = '/less_is_more_cn/'
const TITLE = '爱喝水的木子'
const DESC = '存在即合理'

function collect(dir, acc = []) {
  for (const entry of readdirSync(dir)) {
    if (entry === '.vitepress' || entry === 'public') continue
    const full = join(dir, entry)
    const st = statSync(full)
    if (st.isDirectory()) collect(full, acc)
    else if (entry.endsWith('.md')) acc.push(full)
  }
  return acc
}

function parseFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n/)
  if (!m) return { fm: {}, body: raw }
  const fm = {}
  const lines = m[1].split('\n')
  let key = null
  for (const line of lines) {
    const kv = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/)
    if (kv) {
      key = kv[1]
      fm[key] = kv[2].replace(/^["']|["']$/g, '')
      continue
    }
    const li = line.match(/^\s+-\s+(.*)$/)
    if (li && key) {
      fm[key] = [].concat(fm[key]).filter(Boolean)
      fm[key].push(li[1].replace(/^["']|["']$/g, ''))
    }
  }
  return { fm, body: raw.slice(m[0].length) }
}

const files = collect(contentDir)
const rows = []
for (const file of files) {
  const rel = relative(contentDir, file).replace(/\\/g, '/')
  if (rel === 'README.md') continue
  const { fm, body } = parseFrontmatter(readFileSync(file, 'utf8'))
  if (fm.hidden === 'true' || fm.hidden === true) continue
  if (fm.layout === 'home') continue
  if (!fm.title) continue
  // SITE_URL 已含仓库子路径 /less_is_more_cn，直接拼相对路径
  const url =
    rel === 'index.md'
      ? `${SITE_URL}/`
      : `${SITE_URL}/${encodeURI(rel.replace(/\.md$/, '.html'))}`
  const desc =
    fm.description ||
    body
      .split('\n')
      .map((l) => l.trim())
      .find((l) => l && !l.startsWith('#') && !l.startsWith('|') && !l.startsWith('-')) ||
    ''
  rows.push({ url, title: fm.title, desc: String(desc).replace(/\s+/g, ' ').trim() })
}

rows.sort((a, b) => a.url.localeCompare(b.url))

const text = `# ${TITLE}
> ${DESC}

# 笔记

${rows.map((r) => `- [${r.title}](${r.url}): ${r.desc}`).join('\n')}
`
mkdirSync(dirname(outPath), { recursive: true })
writeFileSync(outPath, text, 'utf8')
console.log(`llm.txt written: ${rows.length} entries -> ${outPath}`)
