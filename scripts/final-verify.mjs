#!/usr/bin/env node
// 最终校验：跳转页、llm.txt、构建产物一致性
import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs'
import { join, relative, sep, dirname, resolve } from 'node:path'

const root = process.cwd()
const dist = join(root, 'docs', '.vitepress', 'dist')
const cfg = readFileSync(join(root, 'docs', '.vitepress', 'config.mjs'), 'utf8')

// 1) 跳转页
const block = /const REDIRECTS = \{([\s\S]*?)\n\}/.exec(cfg)
const entries = []
if (block) {
  const re = /"([^"]+)":\s*"([^"]+)"/g
  let m
  while ((m = re.exec(block[1]))) entries.push([m[1], m[2]])
}
let redirectPages = 0
let missingRedirect = 0
let missingTarget = 0
let badBody = 0
for (const [from, to] of entries) {
  const page = join(dist, decodeURI(from))
  if (!existsSync(page)) {
    missingRedirect++
    console.log(`MISSING redirect page: ${from}`)
    continue
  }
  redirectPages++
  const targetFile = join(dist, decodeURI(to))
  if (!existsSync(targetFile)) {
    missingTarget++
    console.log(`MISSING redirect target: ${to}`)
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
    // 去掉站点 base 前缀，再按本地 dist 目录核对
    const baseMatch = /const SITE_BASE = '([^']+)'/.exec(cfg) || /base\s*:\s*['"`]([^'"`]+)['"`]/.exec(cfg)
    const basePrefix = baseMatch ? baseMatch[1] : '/'
    const relPath = pathname.startsWith(basePrefix)
      ? pathname.slice(basePrefix.length)
      : pathname.replace(/^\//, '')
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
const redirectsOnDisk = htmlFiles.filter((f) => {
  const t = readFileSync(f, 'utf8')
  return t.includes('http-equiv="refresh"')
}).length

console.log('---- final check ----')
console.log(`redirect entries in config: ${entries.length}`)
console.log(`redirect pages on disk:     ${redirectPages} (html files: ${htmlFiles.length}, redirect html: ${redirectsOnDisk})`)
console.log(`missing redirect pages:     ${missingRedirect}`)
console.log(`missing redirect targets:   ${missingTarget}`)
console.log(`bad redirect bodies:        ${badBody}`)
console.log(`llm.txt present:            ${llmOk}`)
console.log(`llm.txt entries:            ${llmEntries}, broken: ${llmBroken}, duplicated: ${llmDup}`)
const ok = missingRedirect === 0 && missingTarget === 0 && badBody === 0 && llmOk && llmBroken === 0 && llmDup === 0
console.log(ok ? 'RESULT: PASS' : 'RESULT: FAIL')
