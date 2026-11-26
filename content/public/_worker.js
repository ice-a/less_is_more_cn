// Cloudflare Pages Worker：统一规范域名，避免搜索引擎看到重复站点。
// - www.020417.xyz -> 301 到主域名
// - 其余请求交给 Pages 静态资源（必须走 env.ASSETS.fetch，直接 fetch(request) 会自循环）
const CANONICAL_HOST = '020417.xyz'

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    if (url.hostname === 'www.' + CANONICAL_HOST) {
      url.hostname = CANONICAL_HOST
      url.protocol = 'https:'
      return Response.redirect(url.toString(), 301)
    }
    return env.ASSETS.fetch(request)
  },
}
