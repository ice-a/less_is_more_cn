#!/usr/bin/env node
// 最终校验（新站 content/.vitepress）：跳转页、llm.txt、构建产物一致性
// 用法：npm run docs:build && node scripts/final-verify.mjs
import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'content', '.vitepress', 'dist')
const cfgPath = join(root, 'content', '.vitepress', 'config.mjs')
const cfg = readFileSync(cfgPath, 'utf8')

const { REDIRECTS: LEGACY } = await import(
  pathToFileURL(join(root, 'content', '.vitepress', 'legacy-redirects.mjs')).href
)
const { CONTENT_MAP } = await import(
  pathToFileURL(join(root, 'content', '.vitepress', 'content-map.mjs')).href
)

const OLD_PREFIX = '/less_is_more_cn'
const baseMatch =
  /const SITE_BASE\s*=\s*process\.env\.CF_SITE_BASE\s*\|\|\s*'([^']+)'/.exec(cfg) ||
  /base\s*:\s*['"`]([^'"`]+)['"`]/.exec(cfg)
const SITE_BASE = (baseMatch ? baseMatch[1] : '/less_is_more_cn/').replace(/\/?$/, '/')

/** 把映射表里的绝对路径归一化到本地 dist 相对路径 */
function toLocalPath(p) {
  let s = decodeURI(p)
  if (s.startsWith(OLD_PREFIX)) s = s.slice(OLD_PREFIX.length)
  if (SITE_BASE !== '/' && s.startsWith(SITE_BASE)) s = s.slice(SITE_BASE.length)
  return s.replace(/^\//, '')
}

/** 目标地址：优先查 CONTENT_MAP，再退回旧表原值 */
function resolveTarget(to) {
  return (
    CONTENT_MAP[to] ||
    CONTENT_MAP[to.replace(/\.html$/, '.md')] ||
    CONTENT_MAP[to.replace(/\/?$/, '/index.md')] ||
    to
  )
}

function existsAsPage(p) {
  const rel = toLocalPath(p)
  if (!rel) return existsSync(join(dist, 'index.html'))
  const file = join(dist, rel)
  return (
    existsSync(file) ||
    existsSync(`${file}.html`) ||
    existsSync(join(file, 'index.html')) ||
    existsSync(join(dist, `${rel.replace(/\.html$/, '')}`))
  )
}

// 1) 旧配置里的 REDIRECTS + CONTENT_MAP 里的旧地址
const entries = []
for (const [from, to] of Object.entries(LEGACY)) entries.push([from, to])
for (const [from, to] of Object.entries(CONTENT_MAP)) entries.push([from, to])

let redirectPages = 0
let missingRedirect = 0
let missingTarget = 0
let badBody = 0
for (const [from, rawTarget] of entries) {
  // 首页由 VitePress 正常产出，writeRedirectPages() 不生成跳转页
  if (from === '/index.md') continue
  const pageRel = decodeURI(from).replace(/\.md$/, '.html')
  const page = join(dist, pageRel.endsWith('/') ? join(pageRel, 'index.html') : pageRel)
  if (!existsSync(page)) {
    missingRedirect++
    console.log(`MISSING redirect page: ${from}`)
    continue
  }
  redirectPages++
  if (!existsAsPage(resolveTarget(rawTarget))) {
    missingTarget++
    console.log(`MISSING redirect target: ${rawTarget} (from ${from})`)
  }
  const body = readFileSync(page, 'utf8')
  if (!body.includes('http-equiv="refresh"') || !body.includes('rel="canonical"')) {
    badBody++
    console.log(`BAD redirect body: ${from}`)
  }
}

// 2) llm.txt
const llmPath = join(dist, 'llm.txt')
let llmOk = false
let llmEntries = 0
let llmBroken = 0
let llmDup = 0
if (existsSync(llmPath)) {
  llmOk = true
  const text = readFileSync(llmPath, 'utf8')
  const seen = new Set()
  const re = /^- \[[^\]]*\]\(([^)]+)\)/gm
  let m
  while ((m = re.exec(text))) {
    llmEntries++
    const url = m[1]
    if (seen.has(url)) {
      llmDup++
      console.log(`DUPLICATE llm entry: ${url}`)
    }
    seen.add(url)
    const pathname = decodeURI(url.replace(/^https?:\/\/[^/]+/, ''))
    const relPath = pathname.startsWith(SITE_BASE) ? pathname.slice(SITE_BASE.length) : pathname.replace(/^\//, '')
    const target = relPath.endsWith('/')
      ? join(dist, relPath, 'index.html')
      : join(dist, relPath)
    if (!existsSync(target)) {
      llmBroken++
      console.log(`BROKEN llm link: ${url}`)
    }
  }
} else {
  console.log('MISSING dist/llm.txt')
}

// 3) dist 页面数
function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) walk(full, acc)
    else if (name.endsWith('.html')) acc.push(full)
  }
  return acc
}
const htmlFiles = walk(dist)
const redirectsOnDisk = htmlFiles.filter((f) => readFileSync(f, 'utf8').includes('http-equiv="refresh"')).length

console.log('---- final check ----')
console.log(`redirect entries:           ${entries.length} (legacy ${Object.keys(LEGACY).length} + content-map ${Object.keys(CONTENT_MAP).length})`)
console.log(`redirect pages on disk:     ${redirectPages} (html files: ${htmlFiles.length}, redirect html: ${redirectsOnDisk})`)
console.log(`missing redirect pages:     ${missingRedirect}`)
console.log(`missing redirect targets:   ${missingTarget}`)
console.log(`bad redirect bodies:        ${badBody}`)
console.log(`llm.txt present:            ${llmOk}`)
console.log(`llm.txt entries:            ${llmEntries}, broken: ${llmBroken}, duplicated: ${llmDup}`)
const ok = missingRedirect === 0 && missingTarget === 0 && badBody === 0 && llmOk && llmBroken === 0 && llmDup === 0
console.log(ok ? 'RESULT: PASS' : 'RESULT: FAIL')
