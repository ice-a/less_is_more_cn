// SEO 主动推送：构建后把 sitemap 里的 URL 提交给各搜索引擎
//
// 用法（GitHub Actions / 本地均可）：
//   node scripts/seo-push.mjs [dist目录]
//
// 支持渠道与所需环境变量（缺变量时该渠道自动跳过，不报错）：
//   IndexNow（Bing / Yandex / Naver / Seznam 通用）
//     INDEXNOW_KEY        站点密钥（8-64 位）
//     INDEXNOW_KEY_FILE   可选，密钥文件在公网可访问的地址
//   Bing Webmaster API
//     BING_API_KEY
//   Google Indexing API
//     GOOGLE_SA_JSON      service account JSON（单行或转义换行均可）
//     可选 GOOGLE_SA_SCOPES（默认 https://www.googleapis.com/auth/indexing）
//   百度站长主动推送
//     BAIDU_TOKEN         百度站长平台 token
//     BAIDU_SITE          站点域名（默认 ice-a.github.io）
//
// 说明：IndexNow 一条请求即可覆盖多家，优先配置；Google/Bing/百度各自需要单独凭证。

import { readFileSync } from 'node:fs'
import { createHash, createSign } from 'node:crypto'
import { resolve } from 'node:path'

let HOST = process.env.SEO_HOST || ''
// 第二个参数可以是本地 dist 目录，也可以是线上 sitemap 地址：
//   node scripts/seo-push.mjs content/.vitepress/dist
//   node scripts/seo-push.mjs https://example.com/sitemap.xml
const SITEMAP_SOURCE = process.argv[2] || 'content/.vitepress/dist'
const SITE_PREFIX = (process.env.SITE_PREFIX || '/less_is_more_cn').replace(/\/$/, '')
/** 站点根（协议 + 域名 + 前缀）；前缀随部署 base 变化，域名从 sitemap 推导 */
let SITE_ROOT = ''

function ensureSiteRoot(urls) {
  if (!SITE_ROOT) {
    const origin = urls.length ? new URL(urls[0]).origin : `https://${HOST || 'ice-a.github.io'}`
    HOST = HOST || new URL(origin).host
    SITE_ROOT = `${origin}${SITE_PREFIX}`
  }
}

function log(...args) {
  console.log('[seo-push]', ...args)
}

async function readSitemap() {
  let xml
  if (/^https?:\/\//i.test(SITEMAP_SOURCE)) {
    const res = await fetch(SITEMAP_SOURCE)
    if (!res.ok) throw new Error(`拉取 sitemap 失败: ${SITEMAP_SOURCE} -> ${res.status}`)
    xml = await res.text()
  } else {
    xml = readFileSync(resolve(SITEMAP_SOURCE, 'sitemap.xml'), 'utf8')
  }
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim())
  return [...new Set(urls)]
}

async function postJson(url, body, headers = {}) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...headers },
    body: JSON.stringify(body),
  })
  const text = await res.text()
  if (!res.ok) throw new Error(`${url} -> ${res.status} ${text.slice(0, 200)}`)
  return text
}

// ---------------- IndexNow ----------------
async function pushIndexNow(urls) {
  const key = process.env.INDEXNOW_KEY
  if (!key) {
    log('IndexNow: 未设置 INDEXNOW_KEY，跳过')
    return
  }
  const res = await postJson('https://api.indexnow.org/indexnow', {
    host: HOST,
    key,
    keyLocation: process.env.INDEXNOW_KEY_FILE || `${SITE_ROOT}/indexnow-${key}.txt`,
    urlList: urls,
  })
  log(`IndexNow: 已提交 ${urls.length} 条 -> ${res}`)
}

// ---------------- Bing Webmaster ----------------
async function pushBing(urls) {
  const key = process.env.BING_API_KEY
  if (!key) {
    log('Bing: 未设置 BING_API_KEY，跳过')
    return
  }
  const res = await postJson(
    `https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlbatch?apikey=${encodeURIComponent(key)}`,
    { siteUrl: `https://${HOST}`, urlList: urls }
  )
  log(`Bing: 已提交 ${urls.length} 条 -> ${res.slice(0, 120)}`)
}

// ---------------- Google Indexing API ----------------
function b64url(buf) {
  return Buffer.from(buf).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

async function googleToken(sa) {
  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
  const now = Math.floor(Date.now() / 1000)
  const payload = b64url(
    JSON.stringify({
      iss: sa.client_email,
      scope: process.env.GOOGLE_SA_SCOPES || 'https://www.googleapis.com/auth/indexing',
      aud: 'https://oauth2.googleapis.com/token',
      iat: now,
      exp: now + 3600,
    })
  )
  const signer = createSign('RSA-SHA256')
  signer.update(`${header}.${payload}`)
  const signature = b64url(signer.sign(sa.private_key))
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${header}.${payload}.${signature}`,
  })
  if (!res.ok) throw new Error(`google oauth -> ${res.status} ${await res.text()}`)
  return (await res.json()).access_token
}

async function pushGoogle(urls) {
  const raw = process.env.GOOGLE_SA_JSON
  if (!raw) {
    log('Google: 未设置 GOOGLE_SA_JSON，跳过')
    return
  }
  let sa
  try {
    sa = JSON.parse(raw.replace(/\\n/g, '\n'))
  } catch {
    throw new Error('GOOGLE_SA_JSON 不是合法 JSON')
  }
  const token = await googleToken(sa)
  const body = urls.map((url) => ({ url, type: 'URL_UPDATED' }))
  // Indexing API 单次上限 200 条
  let sent = 0
  for (let i = 0; i < body.length; i += 200) {
    const batch = body.slice(i, i + 200)
    await fetch('https://indexing.googleapis.com/v3/urlNotifications:batchPublish', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(batch),
    }).then(async (res) => {
      if (!res.ok) throw new Error(`google indexing -> ${res.status} ${await res.text()}`)
    })
    sent += batch.length
  }
  log(`Google: 已提交 ${sent} 条`)
}

// ---------------- 百度站长 ----------------
async function pushBaidu(urls) {
  const token = process.env.BAIDU_TOKEN
  if (!token) {
    log('Baidu: 未设置 BAIDU_TOKEN，跳过')
    return
  }
  const site = process.env.BAIDU_SITE || HOST
  const res = await fetch(`http://data.zz.baidu.com/urls?site=${encodeURIComponent(site)}&token=${token}`, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: urls.join('\n'),
  })
  const text = await res.text()
  if (!res.ok) throw new Error(`baidu -> ${res.status} ${text}`)
  log(`Baidu: 已提交 ${urls.length} 条 -> ${text.slice(0, 120)}`)
}

const urls = await readSitemap()
ensureSiteRoot(urls)
log(`从 sitemap 读到 ${urls.length} 个 URL，站点根 ${SITE_ROOT}`)

let failed = 0
for (const [name, fn] of [
  ['IndexNow', pushIndexNow],
  ['Bing', pushBing],
  ['Google', pushGoogle],
  ['Baidu', pushBaidu],
]) {
  try {
    await fn(urls)
  } catch (err) {
    failed++
    console.error(`[seo-push] ${name} 失败:`, err.message)
  }
}

if (failed) {
  log(`${failed} 个渠道失败，其余正常`)
  process.exitCode = 1
}
