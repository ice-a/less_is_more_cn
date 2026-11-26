// Cloudflare Pages Worker：把非规范域名 301 跳到主域名，避免搜索引擎看到重复站点。
// 覆盖 pages.dev 预览域名与 www 子域；主域名请求原样透传。
const CANONICAL_HOST = '020417.xyz'

export default {
  async fetch(request) {
    const url = new URL(request.url)
    const host = url.hostname
    if (host === CANONICAL_HOST) return fetch(request)
    if (host.endsWith('.pages.dev') || host === 'www.' + CANONICAL_HOST) {
      url.hostname = CANONICAL_HOST
      url.protocol = 'https:'
      return Response.redirect(url.toString(), 301)
    }
    return fetch(request)
  },
}
