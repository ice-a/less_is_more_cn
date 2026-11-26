import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { defineConfig } from 'vitepress'
import { getThemeConfig } from '@sugarat/theme/node'
import { socialLinks } from './social-icons.mjs'
import { REDIRECTS as LEGACY_REDIRECTS } from './legacy-redirects.mjs'
import { CONTENT_MAP } from './content-map.mjs'

// ============================================================
// 站点基础信息（沿用旧站）
// 部署到 Cloudflare Pages / 自有域名时，构建前传环境变量即可切换：
//   CF_SITE_URL=https://example.com   （默认 GitHub Pages 地址）
//   CF_SITE_BASE=/                    （默认 /less_is_more_cn/）
// origin 由 SITE_URL 推导；content-map.mjs 里存的路径前缀固定为 /less_is_more_cn，
// 下面 writeRedirectPages() 会按当前 base 归一化。
const SITE_URL = process.env.CF_SITE_URL || 'https://ice-a.github.io/less_is_more_cn'
const SITE_BASE = process.env.CF_SITE_BASE || '/less_is_more_cn/'
const SITE_ORIGIN = new URL(SITE_URL).origin
/** content-map.mjs / README.md 映射表里写死的旧前缀 */
const OLD_PREFIX = '/less_is_more_cn'
const YEAR = new Date().getFullYear()

// ============================================================
// @sugarat/theme 全局配置
// 说明：主题自带的插件（pagefind 搜索 / RSS / back2top / image-preview /
// mermaid / tabs / timeline / group-icons）都通过这里开关，
// 不需要再往 vite.plugins 里手动注册。
// ============================================================
const blogTheme = getThemeConfig({
  // 全局作者名，文章 frontmatter 没写 author 时用它兜底
  author: '爱喝水的木子',

  // 博客首页
  home: {
    name: '爱喝水的木子',
    motto: '存在即合理',
    // 首页轮播的一句话
    inspiring: [
      '存在即合理',
      'Less is more.',
      '记下来，才算真的懂了',
      '慢慢来，比较快',
    ],
    inspiringTimeout: 4000,
    pageSize: 10,
    // 用 GitHub 账号头像作为站点 logo
    logo: 'https://avatars.githubusercontent.com/ice-a',
  },

  // 首页按标签聚合的入口
  homeTags: true,

  // 顶部公告弹窗：暂时移除。需要时取消下面注释即可恢复
  // （duration：-1 只显示一次；>=0 每次都显示后自动消失；<0 不自动消失）
  // popover: {
  //   title: '公告',
  //   body: [
  //     { type: 'text', content: '本站已用 **@sugarat/theme** 重建，旧地址会自动跳转到新页面。' },
  //   ],
  //   duration: -1,
  //   reopen: true,
  // },

  // giscus 评论（基于 GitHub Discussions）
  comment: {
    type: 'giscus',
    options: {
      repo: 'ice-a/blog-comments',
      repoId: 'R_kgDOV8Ylqg',
      category: 'Announcements',
      categoryId: 'DIC_kwDOV8Ylqs4DL_hO',
      mapping: 'pathname',
      strict: '0',
      reactionsEnabled: '1',
      emitMetadata: '0',
      inputPosition: 'bottom',
      theme: 'preferred_color_scheme',
      lang: 'zh-CN',
    },
  },

  // 右侧「推荐文章」栏
  hotArticle: {
    title: '热门文章',
    pageSize: 8,
    nextText: '换一批',
    empty: '暂无推荐',
  },

  // 页脚：按你的要求移除主题版本信息与版权 / 备案行（备案信息保留在下方注释，需要时再打开）
  footer: {
    version: false,
    // copyright: 'Copyright © 2023-present 爱喝水的木子',
    // icpRecord: { name: '豫ICP备2021025932号-1', link: 'https://beian.miit.gov.cn/' },
    // securityRecord: { name: '豫公网安备 xxxxxxxx 号', link: 'https://www.beian.gov.cn/' },
  },

  // pagefind 本地搜索（旧站的文案与分词行为照搬）
  search: {
    btnPlaceholder: '搜索',
    placeholder: '搜索文档',
    emptyText: '空空如也',
    heading: '共: {{searchResult}} 条结果',
    excludeSelector: ['img', 'a.header-anchor'],
    forceLanguage: 'zh-cn',
  },

  // RSS：baseUrl 只给域名根（插件会再拼 site.base），随部署域名自动切换
  RSS: {
    title: 'WIKI',
    baseUrl: SITE_ORIGIN,
    link: SITE_URL,
    description: '存在即合理',
    copyright: `版权所有 © 2024-${YEAR} 爱喝水的木子[rxht]`,
    // 导航页 / 关于页 / 分类落地页不进 RSS
    filter: ({ frontmatter }) => frontmatter.layout !== 'home' && !frontmatter.hidden,
  },

  // 右侧「推荐文章」栏沿用主题默认配置（recommend 不写即开启）
})

// ============================================================
// 旧路径跳转页生成
// content/README.md 里有完整的「旧 docs 路径 -> 新 content 路径」映射表，
// 构建时读取它，为每个旧地址生成一个 meta refresh + canonical 跳转页。
// ============================================================
function writeRedirectPages(outDir) {
  const basePrefix = SITE_BASE.replace(/\/?$/, '/')
  let count = 0

  const write = (fromPath, targetUrl) => {
    // 目标地址：CONTENT_MAP / README 映射表里固定带 /less_is_more_cn 前缀，
    // 旧 REDIRECTS 表里不带前缀。统一归一化到当前部署 base。
    let target
    if (targetUrl.startsWith(OLD_PREFIX)) {
      const rel = targetUrl.slice(OLD_PREFIX.length).replace(/^\//, '')
      // base 为 / 时目标从域名根开始；否则拼到子路径下
      const root = SITE_BASE === '/' ? '/' : basePrefix
      target = root + rel
    } else {
      target = encodeURI(basePrefix + targetUrl.replace(/^\//, ''))
    }
    // 跳转页文件名统一成 .html；目录型地址写 index.html
    let outName = fromPath
    if (outName.endsWith('/')) outName += 'index.html'
    else outName = outName.replace(/\.md$/, '.html')
    // 首页由 VitePress 正常产出，不要覆盖
    if (outName === '/index.html') return
    const file = resolve(outDir, `.${outName}`)
    if (!file.startsWith(resolve(outDir))) return
    const dir = dirname(file)
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
    writeFileSync(
      file,
      `<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <title>页面已移动</title>
    <meta http-equiv="refresh" content="0; url=${target}" />
    <link rel="canonical" href="${SITE_ORIGIN}${target}" />
    <meta name="robots" content="noindex, follow" />
  </head>
  <body>
    <p>这个页面已经移动到 <a href="${target}">${target}</a>。</p>
    <script>location.replace(${JSON.stringify(target)})</script>
  </body>
</html>
`,
      'utf8'
    )
    count++
  }

  // 1) 旧配置里的 REDIRECTS：目标如果已被重新组织，改指向新地址
  for (const [from, legacyTo] of Object.entries(LEGACY_REDIRECTS)) {
    const hit =
      CONTENT_MAP[legacyTo] ||
      CONTENT_MAP[legacyTo.replace(/\.html$/, '.md')] ||
      CONTENT_MAP[legacyTo.replace(/\/?$/, '/index.md')]
    write(from, hit || legacyTo)
  }

  // 2) 内容提取产生的旧 -> 新映射
  for (const [from, to] of Object.entries(CONTENT_MAP)) {
    write(from, to)
  }

  return count
}

export default defineConfig({
  extends: blogTheme,

  // ---------- VitePress 站点配置 ----------
  base: SITE_BASE,
  lang: 'zh-CN',
  title: '爱喝水的木子',
  description: '存在即合理',
  // 保留 .html 后缀，旧链接与跳转页命名一致
  cleanUrls: false,
  ignoreDeadLinks: true,
  // README.md 是迁移说明，不作为页面输出
  srcExclude: ['**/README.md'],

  lastUpdated: true,

  // 可选：隐藏首页底部的「博客信息」整块（统计 + 置顶文章 + 友链 + 标签）
  // css: '.blog-info-wrapper{display:none!important}',

  markdown: {
    lineNumbers: true,
    math: true,
    image: { lazyLoading: true },
  },

  sitemap: {
    hostname: SITE_URL,
    transformItems(items) {
      return items.map((item) => ({
        ...item,
        url: SITE_URL.replace(/\/$/, '') + '/' + encodeURI(item.url.replace(/^\//, '')),
      }))
    },
  },

  // 生产环境注入统计脚本；开发环境不加载
  head: [
    ['meta', { name: 'robots', content: 'index, follow, max-image-preview:large' }],
    ...(process.env.NODE_ENV === 'production'
      ? [
          // Google Tag Manager（{{SECRET_9efjwufx}}）
          ['script', { async: '', src: 'https://www.googletagmanager.com/gtm.js?id={{SECRET_9efjwufx}}' }],
          [
            'script',
            {},
            `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());`,
          ],
          // Microsoft Clarity（zjk1n98mr2）
          [
            'script',
            {},
            `(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "zjk1n98mr2");`,
          ],
          // 百度搜索资源平台站点验证
          ['meta', { name: 'baidu-site-verification', content: 'codeva-3TbUdoBDVj' }],
        ]
      : []),
  ],

  // 统一注入 canonical / og / twitter
  transformHead(ctx) {
    const siteUrl = (ctx.siteConfig.sitemap && ctx.siteConfig.sitemap.hostname) || SITE_URL
    const page = ctx.page || ''
    const path = page === 'index.md' ? '/' : '/' + page.replace(/\.md$/, '.html')
    const url = siteUrl.replace(/\/$/, '') + encodeURI(path)
    const title = ctx.pageData && ctx.pageData.title ? `${ctx.pageData.title} | ${ctx.siteData.title}` : ctx.siteData.title
    const description =
      (ctx.pageData && (ctx.pageData.description || (ctx.pageData.frontmatter && ctx.pageData.frontmatter.description))) ||
      ctx.siteData.description ||
      ''
    const isHome = page === 'index.md'
    const items = [
      ['link', { rel: 'canonical', href: url }],
      ['meta', { property: 'og:type', content: isHome ? 'website' : 'article' }],
      ['meta', { property: 'og:site_name', content: ctx.siteData.title }],
      ['meta', { property: 'og:locale', content: 'zh_CN' }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
    ]
    // 文章页补 JSON-LD（结构化数据，利于搜索引擎展示）
    if (!isHome) {
      items.splice(1, 0, [
        'script',
        { type: 'application/ld+json' },
        JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: ctx.pageData.title || ctx.siteData.title,
          description,
          url,
          mainEntityOfPage: { '@type': 'WebPage', '@id': url },
          datePublished:
            (ctx.pageData.frontmatter && ctx.pageData.frontmatter.date) || undefined,
          author: { '@type': 'Person', name: ctx.siteData.title },
          publisher: { '@type': 'Organization', name: ctx.siteData.title },
        }),
      ])
    }
    return items
  },

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '时间线', link: '/timeline' },
      { text: '常用导航', link: '/navigation' },
      { text: '订阅转换', link: 'https://sub.020417.xyz/' },
      { text: '关于', link: '/about' },
    ],
    socialLinks,
    docFooter: { prev: '上一个', next: '下一个' },
    lastUpdated: { text: 'Last Updated', formatOptions: { dateStyle: 'full', timeStyle: 'medium' } },
  },

  // 构建结束后生成旧地址跳转页
  async buildEnd(siteConfig) {
    const count = writeRedirectPages(siteConfig.outDir)
    siteConfig.logger.info(`redirect pages: ${count}`)
  },

  // 主题自带的 vite 插件需要继承，这里只补 SSR 外部化配置
  vite: {
    ...(blogTheme.vite || {}),
    ssr: {
      ...(blogTheme.vite?.ssr || {}),
      noExternal: ['@sugarat/theme', 'vitepress-plugin-product-card'],
    },
  },
})
