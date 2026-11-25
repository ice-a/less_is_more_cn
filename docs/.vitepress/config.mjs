import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

// 站点公开基础地址，与 sitemap.hostname 保持一致
// 站点公开基础地址。GitHub Pages 镜像部署在子路径下，
// 因此站内资源与页面链接都要带 base 前缀。
const SITE_URL = 'https://ice-a.github.io/less_is_more_cn'
const SITE_BASE = '/less_is_more_cn/'

// 改名前的旧路径 → 新路径。站点没有服务端重定向能力，构建时为旧路径生成跳转页。
const REDIRECTS = {
  "/01杂记/20240101_01_AFF.html": "/01杂记/20240101_01_aff推广链接收藏.html",
  "/01杂记/20240101_01_路漫漫.html": "/01杂记/20240101_02_路漫漫.html",
  "/01杂记/20240101_02_life.html": "/01杂记/20240101_03_生活不止眼前的苟且.html",
  "/01杂记/20240101_02_阅读单.html": "/01杂记/20240101_04_阅读单.html",
  "/01杂记/20240101_03_随机图api.html": "/01杂记/20240101_05_随机图api.html",
  "/01杂记/20240101_04_bt链接.html": "/01杂记/20240101_06_种子搜索地址.html",
  "/01杂记/20240911_01_未完继续.html": "/01杂记/20240911_01_逆向文章记录.html",
  "/01杂记/20240101_05_fuli.html": "/01杂记/20240101_07_福利站点收藏.html",
  "/02基础与环境/20240101_01_关于ubuntu服务器启动samba并创建不同用户组访问限制.html": "/02基础与环境/20240101_01_samba共享配置与访问控制.html",
  "/02基础与环境/20240101_01_ubuntu启动samba并按用户组限制访问.html": "/02基础与环境/20240101_01_samba共享配置与访问控制.html",
  "/04工具与配置/20220101_01_samba配置审计.html": "/02基础与环境/20240101_01_samba共享配置与访问控制.html",
  "/02基础与环境/20240101_02_逛github遇到喜欢的项目但是没时间去看的解决方法.html": "/02基础与环境/20240101_02_逛github收藏项目.html",
  "/02基础与环境/20240812_01_远程.html": "/02基础与环境/20240812_01_远程工具连接ubuntu一直100不动.html",
  "/02基础与环境/20250801_04_linux_server_proxy.html": "/02基础与环境/20250801_04_linux代理配置.html",
  "/02基础与环境/20250101_06_docker安装mongodb.html": "/02基础与环境/20250101_06_docker部署常用服务.html",
  "/02基础与环境/20250101_07_docker安装neo4j.html": "/02基础与环境/20250101_06_docker部署常用服务.html",
  "/02基础与环境/20250101_08_docker安装redis.html": "/02基础与环境/20250101_06_docker部署常用服务.html",
  "/02基础与环境/20250101_11_docker安装postgresql.html": "/02基础与环境/20250101_06_docker部署常用服务.html",
  "/02基础与环境/20250101_13_docker容器管理.html": "/02基础与环境/20250101_06_docker部署常用服务.html",
  "/03代码与脚本/20220101_01_学习的一些地址.html": "/03代码与脚本/20220101_01_学习资源地址.html",
  "/03代码与脚本/20220101_01_针对一个文件夹里边有成千上万的文件进行分类.html": "/03代码与脚本/20220101_02_按文件类型批量分类文件夹.html",
  "/03代码与脚本/20220101_02_SQL速查.html": "/03代码与脚本/20220101_03_sql速查.html",
  "/03代码与脚本/20220101_03_python相见恨晚的库.html": "/03代码与脚本/20220101_04_python相见恨晚的库.html",
  "/03代码与脚本/20230101_01_多张图片合成一张.html": "/03代码与脚本/20230101_01_opencv与pillow图片处理.html",
  "/03代码与脚本/20230101_02_多张图片合成一张.html": "/03代码与脚本/20230101_01_opencv与pillow图片处理.html",
  "/03代码与脚本/20230101_03_根据图片的md5值进行去重.html": "/03代码与脚本/20230101_01_opencv与pillow图片处理.html",
  "/03代码与脚本/20230101_06_使用cv统计视频时长.html": "/03代码与脚本/20230101_01_opencv与pillow图片处理.html",
  "/03代码与脚本/20230101_07_使用opencv将透明背景图片转变为白色背景图片.html": "/03代码与脚本/20230101_01_opencv与pillow图片处理.html",
  "/03代码与脚本/20230101_08_使用opencv统计视频时长.html": "/03代码与脚本/20230101_01_opencv与pillow图片处理.html",
  "/03代码与脚本/20230101_09_使用opencv转换透明背景为白色.html": "/03代码与脚本/20230101_01_opencv与pillow图片处理.html",
  "/03代码与脚本/20230101_09_图片旋转摆正根据图片的exif信息.html": "/03代码与脚本/20230101_01_opencv与pillow图片处理.html",
  "/03代码与脚本/20230101_10_根据exif信息摆正图片.html": "/03代码与脚本/20230101_01_opencv与pillow图片处理.html",
  "/03代码与脚本/20230101_10_图片压缩.html": "/03代码与脚本/20230101_01_opencv与pillow图片处理.html",
  "/03代码与脚本/20230101_11_图片压缩.html": "/03代码与脚本/20230101_01_opencv与pillow图片处理.html",
  "/03代码与脚本/20240122_01_基于opencv和pil对图片进行保留部分区域.html": "/03代码与脚本/20230101_01_opencv与pillow图片处理.html",
  "/03代码与脚本/20240528_02_根据图片md5值去重.html": "/03代码与脚本/20230101_01_opencv与pillow图片处理.html",
  "/03代码与脚本/20250101_04_基于vad对音频进行切割.html": "/03代码与脚本/20230101_06_音频处理.html",
  "/03代码与脚本/20250101_05_基于vad对音频进行切割.html": "/03代码与脚本/20230101_06_音频处理.html",
  "/03代码与脚本/20230101_03_技术文档.html": "/03代码与脚本/20220101_01_学习资源地址.html",
  "/03代码与脚本/20230101_04_技术文档合集.html": "/03代码与脚本/20220101_01_学习资源地址.html",
  "/03代码与脚本/20230101_04_一些接口.html": "/03代码与脚本/20220101_01_学习资源地址.html",
  "/03代码与脚本/20230101_05_一些接口.html": "/03代码与脚本/20220101_01_学习资源地址.html",
  "/03代码与脚本/20230101_05_学习的几个社区.html": "/03代码与脚本/20220101_01_学习资源地址.html",
  "/03代码与脚本/20230101_07_学习社区.html": "/03代码与脚本/20220101_01_学习资源地址.html",
  "/03代码与脚本/20240808_01_UserAgent处理.html": "/03代码与脚本/20240808_01_useragent处理.html",
  "/03代码与脚本/20240813_01_模型识别接口flask.html": "/03代码与脚本/20240813_01_flask实现模型识别接口mock.html",
  "/03代码与脚本/20250101_04_dp挂载代理使用.html": "/03代码与脚本/20250101_03_drissionpage挂载代理.html",
  "/03代码与脚本/20250101_06_ppt转pdf.html": "/03代码与脚本/20250101_05_ppt转pdf.html",
  "/03代码与脚本/20250101_07_python常见的加解密.html": "/03代码与脚本/20250101_06_python常见的加解密.html",
  "/03代码与脚本/20250101_07_未完待续.html": "/03代码与脚本/20250101_07_github项目收藏.html",
  "/03代码与脚本/mysql主从同步集群搭建.html": "/03代码与脚本/20260507_01_mysql主从同步集群搭建.html",
  "/04工具与配置/20220101_02_server安装node.html": "/04工具与配置/20220101_02_服务器安装node.html",
  "/04工具与配置/20220101_03_server服务器安装jupyterlab.html": "/04工具与配置/20220101_03_服务器安装jupyterlab.html",
  "/04工具与配置/20220101_05_picgo+lsky图床.html": "/04工具与配置/20220101_05_picgo-lsky图床.html",
  "/04工具与配置/20240101_01_部署项目到vercel.html": "/04工具与配置/20240101_02_部署项目到vercel.html",
  "/04工具与配置/20240101_02_pm2定时推送到git仓库及定时执行mongo备份.html": "/04工具与配置/20240101_03_pm2定时推送git并执行mongo备份.html",
  "/04工具与配置/20240101_02_服务器上安装vscode远程写代码.html": "/04工具与配置/20240101_04_服务器上安装vscode远程写代码.html",
  "/04工具与配置/20240101_03_高版本labelme格式转换为低版本格式.html": "/04工具与配置/20240101_05_高版本labelme格式转换为低版本格式.html",
  "/04工具与配置/20240101_05_镜像站.html": "/04工具与配置/20240101_06_一些镜像站.html",
  "/04工具与配置/20240101_06_快速构建一个新的ubuntu系统.html": "/04工具与配置/20240101_07_用multipass快速构建ubuntu环境.html",
  "/04工具与配置/20250101_01_APIQPS限流服务.html": "/04工具与配置/20250101_01_apiqps限流服务.html",
  "/04工具与配置/20250101_01_开发工具.html": "/04工具与配置/20250101_02_开发工具清单.html",
  "/04工具与配置/20240101_04_好用的工具.html": "/04工具与配置/20250101_02_开发工具清单.html",
  "/04工具与配置/20260302_01_OpenClaw安装与Skills配置教程.html": "/04工具与配置/20260302_01_openclaw安装与skills配置教程.html",
  "/04工具与配置/20260313_01_OpenClaw_Skills_MCP联动作战手册.html": "/04工具与配置/20260302_01_openclaw安装与skills配置教程.html",
  "/04工具与配置/20260313_01_openclaw-skills-mcp联动作战手册.html": "/04工具与配置/20260302_01_openclaw安装与skills配置教程.html",
  "/05爬虫与逆向/20251101_01_爬虫本地部署使用DNS Resolver.html": "/05爬虫与逆向/20251101_01_爬虫本地部署使用dnsresolver.html",
  "/05爬虫与逆向/20251101_04_Frida 高级脚本.html": "/05爬虫与逆向/20251101_02_爬虫逆向工程师.html",
  "/05爬虫与逆向/20251101_03_frida高级脚本.html": "/05爬虫与逆向/20251101_02_爬虫逆向工程师.html",
  "/05爬虫与逆向/20260302_00_什么是爬虫.html": "/05爬虫与逆向/20260302_02_web逆向零基础学习计划.html",
  "/05爬虫与逆向/20260302_01_什么是爬虫.html": "/05爬虫与逆向/20260302_02_web逆向零基础学习计划.html",
  "/05爬虫与逆向/20260302_01_web逆向学习计划.html": "/05爬虫与逆向/20260302_02_web逆向零基础学习计划.html",
  "/05爬虫与逆向/20260302_01_反爬虫与风控.html": "/05爬虫与逆向/20260302_03_反爬虫与风控.html",
  "/05爬虫与逆向/20260302_02_补环境完全指南.html": "/05爬虫与逆向/20260302_04_补环境完全指南.html",
  "/05爬虫与逆向/20260302_03_ast解混淆学习计划.html": "/05爬虫与逆向/20260302_05_ast解混淆学习计划.html",
  "/05爬虫与逆向/20260302_04_原型链学习计划.html": "/05爬虫与逆向/20260302_06_原型链学习计划.html",
  "/05爬虫与逆向/20260302_05_爬虫管理系统开发.html": "/05爬虫与逆向/20260302_07_爬虫管理系统开发.html",
  "/05爬虫与逆向/20260302_08_ios逆向.html": "/05爬虫与逆向/20260302_08_ios逆向开发.html",
  "/06AI与算法/20240101_01_tts.html": "/06AI与算法/20240101_01_tts语音合成.html",
  "/06AI与算法/20250101_03_炼丹环境torch.html": "/06AI与算法/20250101_03_炼丹环境pytorch.html",
  "/06AI与算法/20260302_01_逆向激进prompt.html": "/06AI与算法/20260302_02_逆向激进prompt.html",
  "/06AI与算法/20260302_02_利用AI辅助零基础学习路径.html": "/05爬虫与逆向/20260302_02_web逆向零基础学习计划.html",
  "/06AI与算法/20260302_03_利用ai辅助零基础学习路径.html": "/05爬虫与逆向/20260302_02_web逆向零基础学习计划.html",
  "/04工具与配置/20250101_02_flask实现api接口mock.html": "/03代码与脚本/20240813_01_flask实现模型识别接口mock.html",
}

// 写出旧路径的跳转页：meta refresh + canonical + JS 跳转
function writeRedirectPages(outDir) {
  let count = 0
  // 跳转目标必须带 base 前缀，否则在子路径部署下会跳到站点根目录
  const basePrefix = SITE_BASE.replace(/\/?$/, '/')
  for (const [from, to] of Object.entries(REDIRECTS)) {
    const target = encodeURI(basePrefix + to.replace(/^\//, ''))
    const file = resolve(outDir, `.${from}`)
    if (!file.startsWith(resolve(outDir))) continue
    mkdirSync(dirname(file), { recursive: true })
    writeFileSync(
      file,
      `<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <title>页面已移动</title>
    <meta http-equiv="refresh" content="0; url=${target}" />
    <link rel="canonical" href="${SITE_URL}${target}" />
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
  return count
}

import { defineConfig } from 'vitepress'
import { generateSidebar } from 'vitepress-sidebar'
import { pagefindPlugin } from "vitepress-plugin-pagefind"
import { RssPlugin } from 'vitepress-plugin-rss'


// https://vitepress.dev/reference/site-config
export default defineConfig({
  // 子路径部署：assets 与站内链接统一带 base 前缀
  base: SITE_BASE,
  // 生成 .html 后缀，与旧路径跳转页命名保持一致
  cleanUrls: false,
  title: "爱喝水的木子",
  description: "存在即合理",
  ignoreDeadLinks: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '常用导航', link: '/00navigation' },
      { text: 'Markdown 编辑器', link: 'https://md.lideshan.cn/' },
      { text: '动作图鉴', link: 'https://sport.hlds.fun/' },
      { text: '订阅转换', link: 'https://sub.020417.xyz/' },
      { text: '关于', link: '/about' },
    ],

    sidebar: generateSidebar({
      documentRootPath: 'docs',
      collapsed: false,
      collapseDepth: 2,
      useTitleFromFrontmatter: true,
      useTitleFromFileHeading: true,
      useFolderTitleFromIndexFile: true,
      useFolderLinkFromIndexFile: true,
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
    // hostname 用完整站点地址（含 base），canonical 与 RSS 保持一致
    hostname: SITE_URL,
    transformItems(items) {
      return items.map((item) => ({
        ...item,
        url: SITE_URL.replace(/\/$/, '') + '/' + encodeURI(item.url.replace(/^\//, ''))
      }))
    },
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
    ] : [])
  ],
  // 统一注入 canonical / og / twitter 元数据（VitePress 内置钩子，不引入新插件）
  transformHead(ctx) {
    const siteUrl = (ctx.siteConfig.sitemap && ctx.siteConfig.sitemap.hostname) || SITE_URL
    const page = ctx.page || ''
    const path = page === 'index.md' ? '/' : '/' + page.replace(/\.md$/, '.html')
    // 与 sitemap.xml 保持一致：中文目录与文件名按 percent-encoding 输出，并补 base 前缀
    const url = siteUrl.replace(/\/$/, '') + encodeURI(path)
    const title = ctx.pageData && ctx.pageData.title
      ? `${ctx.pageData.title} | ${ctx.siteData.title}`
      : ctx.siteData.title
    const description =
      (ctx.pageData && (ctx.pageData.description ||
        (ctx.pageData.frontmatter && ctx.pageData.frontmatter.description))) ||
      ctx.siteData.description || ''
    return [
      ['link', { rel: 'canonical', href: url }],
      ['meta', { property: 'og:type', content: page === 'index.md' ? 'website' : 'article' }],
      ['meta', { property: 'og:site_name', content: ctx.siteData.title }],
      ['meta', { property: 'og:locale', content: 'zh_CN' }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
    ]
  },

  // 构建结束后为旧路径生成跳转页
  async buildEnd(siteConfig) {
    const count = writeRedirectPages(siteConfig.outDir)
    siteConfig.logger.info(`legacy redirect pages: ${count}`)
  },

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
        // 插件会用 base 前缀拼条目链接，channel link 需要带 base 的完整地址
        baseUrl: 'https://ice-a.github.io',
        link: SITE_URL,
        description: "存在即合理",
        copyright: `版权所有 © 2024-${new Date().getFullYear()} 爱喝水的木子[rxht]`
      })
    ]
  }
})
