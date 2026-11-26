// 按当前部署地址生成 content/public/robots.txt（GitHub Pages / Cloudflare 通用）
// 用法：node scripts/gen-robots.mjs
// 环境变量：CF_SITE_URL（默认生产域名 020417.xyz）
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const siteUrl = (process.env.CF_SITE_URL || 'https://020417.xyz').replace(/\/$/, '')

const body = `User-agent: *
Allow: /
Disallow: /.vitepress/
Disallow: /*.md$

# 搜索引擎抓取入口
Sitemap: ${siteUrl}/sitemap.xml
`

mkdirSync(resolve(root, 'content', 'public'), { recursive: true })
writeFileSync(resolve(root, 'content', 'public', 'robots.txt'), body, 'utf8')
console.log(`[gen-robots] Sitemap: ${siteUrl}/sitemap.xml`)
