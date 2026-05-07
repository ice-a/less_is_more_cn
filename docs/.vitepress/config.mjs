import { defineConfig } from 'vitepress'
import { generateSidebar } from 'vitepress-sidebar'
import { pagefindPlugin } from "vitepress-plugin-pagefind"
import { RssPlugin } from 'vitepress-plugin-rss'


// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "爱喝水的木子",
  description: "存在即合理",
  ignoreDeadLinks: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    comment: {
      // 设置评论提供者为Waline
      provider: 'waline',
      // Waline服务器URL
      serverURL: 'https://waline.020417.xyz/',
      // 自动跟随系统暗色模式
      dark: 'auto',
      // 语言设置为中文
      lang: 'zh-CN',
      // 每页显示10条评论
      pageSize: 10,
      // 评论输入框占位符
      placeholder: '有什么想法? 来评论吧~',
      // 必需的元数据
      requiredMeta: ['nick', 'mail']
    },
    nav: [
      { text: '首页', link: '/' },
      { text: '常用导航', link: '/00navigation' },
      { text: '题库', link: 'https://tiku.020417.xyz/' },
      { text: '关于', link: '/about' }
    ],

    sidebar: generateSidebar({
      documentRootPath: 'docs',
      collapsed: false,
      collapseDepth: 2,
      useTitleFromFrontmatter: true,
      useTitleFromFileHeading: true,
      hyphenToSpace: true,
      underscoreToSpace: true,
      excludeFiles: ['README.md'],
      includeEmptyFolder: false,
      sortMenusByFrontmatterOrder: true,
    }),

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ice-a' },
      {
        icon: {
          svg: '<svg t="1761726609054" class="icon" viewBox="0 0 1117 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5470" width="200" height="200"><path d="M222.859636 17.966545c-9.495273 8.936727-18.432 22.341818-20.666181 29.044364-3.909818 12.846545 13.963636 68.142545 22.341818 68.142546s32.395636 25.693091 32.395636 34.629818c0 17.873455-19.549091 28.485818-51.386182 28.485818-37.981091 0-113.943273 30.161455-140.194909 55.854545-10.053818 9.495273-28.485818 36.864-41.332363 61.44L0 339.688727v512.186182l23.458909 44.125091c26.810182 51.944727 39.098182 64.791273 90.484364 92.718545l44.683636 24.576h788.666182l44.683636-21.783272c56.413091-26.810182 79.313455-49.152 104.448-103.330909l19.549091-41.890909v-252.462546l0.558546-252.462545-19.549091-39.656728c-10.053818-22.341818-30.72-51.386182-46.359273-65.349818-34.071273-32.954182-94.394182-59.205818-133.492364-59.205818-59.205818 0-70.935273-24.576-29.044363-63.115636 22.341818-20.107636 25.134545-27.368727 25.134545-49.710546 0-21.783273-3.909818-30.72-18.432-45.800727-10.053818-10.053818-24.576-18.432-32.395636-18.432-12.846545 0-37.422545 10.053818-44.125091 18.432-1.675636 1.675636-39.098182 38.539636-82.664727 80.989091l-79.872 77.637818-91.042909-0.558545c-49.710545 0-96.069818-2.792727-102.213819-5.02691-6.144-2.792727-41.890909-34.071273-79.313454-70.935272C272.570182-7.168 256.372364-16.104727 222.859636 17.966545z m712.145455 286.533819c5.585455 0.558545 21.783273 10.053818 34.629818 22.341818l23.458909 21.783273 1.675637 236.823272c1.117091 215.04 0.558545 237.940364-9.495273 257.489455-15.639273 29.602909-37.981091 44.125091-71.493818 45.800727-15.639273 0.558545-189.346909 0.558545-385.396364 0l-355.793455-1.675636-49.152-49.152V355.886545l22.900364-24.576c17.314909-19.549091 27.927273-25.693091 45.800727-27.368727 17.873455-1.117091 692.596364-0.558545 742.865455 0.558546z" fill="#1296DB" p-id="5471"></path><path d="M304.407273 496.64c-22.341818 24.017455-22.900364 27.368727-22.900364 72.610909 0 43.566545 1.117091 48.593455 19.549091 69.818182 31.837091 36.305455 60.881455 35.188364 92.16-2.792727 12.288-13.963636 13.963636-24.017455 14.522182-69.818182 0-51.386182-0.558545-53.061818-21.783273-74.286546-29.602909-30.161455-51.944727-28.485818-81.547636 4.468364z m428.962909-3.909818c-20.666182 20.666182-21.783273 22.900364-21.783273 75.403636 0 51.944727 0.558545 54.178909 20.107636 73.169455 26.810182 25.693091 39.098182 29.044364 63.674182 15.080727 31.837091-18.432 43.566545-47.476364 40.215273-98.862545-2.792727-38.539636-5.026909-45.800727-24.017455-65.349819-27.368727-27.927273-49.710545-27.927273-78.196363 0.558546z" fill="#1296DB" p-id="5472"></path></svg>'
        },
        link: 'https://space.bilibili.com/309278307',
        ariaLabel:'B站'
      },
      {
        icon: {
          svg: '<svg t="1761726833032" class="icon" viewBox="0 0 1316 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7568" width="200" height="200"><path d="M643.181714 247.698286l154.916572-123.172572L643.181714 0.256 643.072 0l-154.660571 124.269714 154.660571 123.245715 0.109714 0.182857z m0 388.461714h0.109715l399.579428-315.245714-108.361143-87.04-291.218285 229.888h-0.146286l-0.109714 0.146285L351.817143 234.093714l-108.251429 87.04 399.433143 315.136 0.146286-0.146285z m-0.146285 215.552l0.146285-0.146286 534.893715-422.034285 108.397714 87.04-243.309714 192L643.145143 1024 10.422857 525.056 0 516.754286l108.251429-86.893715L643.035429 851.748571z" fill="#1E80FF" p-id="7569"></path></svg>'
        },
        link: 'https://juejin.cn/user/712139267643543/posts',
        ariaLabel:'掘金'
      },
      {
        icon: {
          svg: '<svg t="1761727057797" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10591" width="200" height="200"><path d="M544.949 561.422s0-71.387-34.779-75.050c-34.779-3.663-142.775 0-142.775 0v-219.654h161.078s-1.83-73.219-32.949-73.219h-261.755l43.93-117.148s-65.897 3.663-89.692 45.761-98.844 252.604-98.844 252.604 25.627 10.983 67.726-20.134c42.101-31.116 56.743-86.033 56.743-86.033l76.879-3.663 1.83 223.316s-133.621-1.83-161.078 0c-27.457 1.83-42.101 75.050-42.101 75.050h203.182s-18.307 124.47-69.557 214.164c-53.085 89.692-151.929 161.078-151.929 161.078s71.387 29.287 140.947-10.983c69.557-42.101 120.811-223.316 120.811-223.316l162.912 203.182s14.643-97.013-1.83-124.47c-18.307-27.457-113.49-137.283-113.49-137.283l-42.101 36.607 29.287-120.811h177.552zM587.050 188.010l-1.83 660.793h65.897l23.795 82.37 115.321-82.37h162.912v-660.793h-366.091zM879.92 775.584h-76.879l-97.013 75.050-21.965-75.050h-20.134v-512.527h215.991v512.527z" fill="#f4ea2a" p-id="10592"></path></svg>'
        },
        link: 'https://www.zhihu.com/people/love_water_blue/posts',
        ariaLabel:'知乎'
      },
    ],
    footer: {
      message: 'Released under the MIT License. | <a href="https://beian.miit.gov.cn/" target="_blank">豫ICP备2021025932号-1</a>',
      copyright: 'Copyright © 2023-present 爱喝水的木子'
    },
    search: {
      provider: 'local'
    },
    lastUpdated: {
      text: 'Last Updated',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },
    docFooter: {
      prev: '上一个',
      next: '下一个'
    }
  },
  sitemap: {
    hostname: 'https://104303.xyz',
  },
  lastUpdated: true,
  markdown: {
    lineNumbers: true,
    math: true,
    image: {
      lazyLoading: true
    }
  },
  // 只在生产环境加载分析脚本，避免开发环境中的ORB错误
  head: [
    ...(process.env.NODE_ENV === 'production' ? [
      [
        'script',
        { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-0JFM2DF8ET' }
      ],
      [
        'script',
        {},
        `window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-0JFM2DF8ET');`
      ],
      [
        'script',
        {
          defer: true,
          src: 'https://count.020417.xyz/script.js', // 替换为您的实际 Umami 脚本 URL
          'data-website-id': '59d7c17b-7e3e-4e1d-b587-b33602435f0f',
        },
      ],
      [
        'script',
        {},
        `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "txpswcwz8r");
        `,
      ]
    ] : []),
      
    // Bing Webmaster Tools Meta 验证标签
    [
      'meta',
      {
        name: 'msvalidate.01',
        content: '1234567890ABCDEF',
      },
    ]
  ],
  vite: {
    plugins: [
      pagefindPlugin({
        btnPlaceholder: '搜索',
        placeholder: '搜索文档',
        emptyText: '空空如也',
        heading: '共: {{searchResult}} 条结果',
        excludeSelector: ['img', 'a.header-anchor'],
        forceLanguage: 'zh-cn',
        customSearchQuery: (input) => {
          const segmenter = new Intl.Segmenter('zh-CN', { granularity: 'word' })
          const result = []
          for (const it of segmenter.segment(input)) {
            if (it.isWordLike) {
              result.push(it.segment)
            }
          }
          return result.join(' ')
        },
        filter(searchItem, idx, originArray) {
          return !searchItem.route.includes('404')
        }
      }),
      RssPlugin({
        title: 'WIKI',
        baseUrl: 'https://104303.xyz',
        copyright: `版权所有 © 2024-${new Date().getFullYear()} 爱喝水的木子[rxht]`
      })
    ]
  }
})
