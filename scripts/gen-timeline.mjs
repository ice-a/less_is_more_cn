// 生成「时间线」页面：按发布日期倒序列出全部文章
//
// 用法：node scripts/gen-timeline.mjs
// 已并入 docs:build 前置步骤，改完文章重新构建即可自动更新。
// 渲染用 @sugarat/theme 内置的 vitepress-markdown-timeline：
//   ::: timeline 2026-11-25
//   - [**标题**](相对路径) —— 摘要
//   :::
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'

const CONTENT_ROOT = resolve(process.argv[2] || 'content')
const OUT_FILE = join(CONTENT_ROOT, 'timeline.md')

/** 解析极简 frontmatter，返回 { data, body } */
function parseFrontmatter(text) {
  if (!text.startsWith('---')) return { data: {}, body: text }
  const end = text.indexOf('\n---', 3)
  if (end === -1) return { data: {}, body: text }
  const raw = text.slice(4, end)
  const body = text.slice(end + 4)
  const data = {}
  let lastKey = null
  for (const line of raw.split('\n')) {
    if (!line.trim()) continue
    const m = line.match(/^(\w[\w-]*)\s*:\s*(.*)$/)
    if (m) {
      lastKey = m[1]
      data[lastKey] = unquote(m[2].trim())
      continue
    }
    // 缩进的列表项，追加到上一个 key（仅处理 tags）
    const item = line.match(/^\s+-\s*(.*)$/)
    if (item && lastKey) {
      const arr = Array.isArray(data[lastKey]) ? data[lastKey] : []
      arr.push(unquote(item[1].trim()))
      data[lastKey] = arr
    }
  }
  return { data, body }
}

function unquote(v) {
  if (!v) return v
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
    return v.slice(1, -1).replace(/\\'/g, "'")
  }
  return v
}

function walk(dir) {
  const out = []
  for (const name of readdirSync(dir)) {
    if (name === '.vitepress' || name.startsWith('.')) continue
    const full = join(dir, name)
    const stat = readdirSync(dir, { withFileTypes: true }).find((d) => d.name === name)
    if (stat.isDirectory()) out.push(...walk(full))
    else if (name.endsWith('.md')) out.push(full)
  }
  return out
}

const articles = []
for (const file of walk(CONTENT_ROOT)) {
  const rel = relative(CONTENT_ROOT, file).replace(/\\/g, '/')
  if (rel === 'README.md' || rel === 'timeline.md') continue
  const { data } = parseFrontmatter(readFileSync(file, 'utf8'))
  // 分类落地页 / 导航页 / 关于 / 打赏不进时间线
  if (data.hidden) continue
  const date = data.date || ''
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) continue
  articles.push({
    rel,
    title: data.title || rel.replace(/\.md$/, ''),
    description: data.description || '',
    tags: Array.isArray(data.tags) ? data.tags : [],
    date,
  })
}

articles.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.title.localeCompare(b.title, 'zh-CN')))

// 按日期归组，同一天的多个文章放在同一个 timeline 块里
const byDate = new Map()
for (const a of articles) {
  if (!byDate.has(a.date)) byDate.set(a.date, [])
  byDate.get(a.date).push(a)
}

const lines = []
lines.push('---')
lines.push('layout: doc')
lines.push('title: 时间线')
lines.push('description: 按发布日期倒序排列的全部文章，点标题直接跳转。')
lines.push('date: 2026-11-26')
lines.push('tags:')
lines.push('  - 导航')
lines.push('hidden: true')
lines.push('---')
lines.push('')
lines.push('> 共 ' + articles.length + ' 篇文章，按发布日期从新到旧排列。')
lines.push('')

let lastYear = ''
for (const [date, items] of byDate) {
  const year = date.slice(0, 4)
  if (year !== lastYear) {
    if (lastYear) lines.push('')
    lines.push('## ' + year)
    lines.push('')
    lastYear = year
  }
  lines.push('::: timeline ' + date)
  for (const a of items) {
    const tag = a.tags.length ? '（' + a.tags.slice(0, 3).join(' / ') + '）' : ''
    const desc = a.description ? ' —— ' + a.description : ''
    lines.push('- [**' + a.title + '**](./' + a.rel.replace(/\.md$/, '.html') + ')' + tag + desc)
  }
  lines.push(':::')
}
lines.push('')

writeFileSync(OUT_FILE, lines.join('\n'), 'utf8')
console.log('[gen-timeline] ' + articles.length + ' 篇文章 -> ' + OUT_FILE)
