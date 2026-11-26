# 站点重构迁移说明（旧 VitePress 配置 → @sugarat/theme）

新站已经用 `@sugarat/theme` 搭好并构建通过。这份文档说明**旧配置每一项去了哪里**，以及**哪些开关需要你来定**。

## 一、目录与命令的变化

| 项目 | 旧 | 新 |
| --- | --- | --- |
| 源目录 | `docs/`（已整体归档为 `legacy/`） | `content/` |
| 构建产物 | `docs/.vitepress/dist` | `content/.vitepress/dist` |
| 开发 | `npm run docs:dev` | 相同（内部已是 `vitepress dev content`） |
| 构建 | `npm run docs:build` | 相同（新增 `npm run build` 别名，给 CI 用） |
| 预览 | `npm run docs:preview` | 相同 |
| URL 形态 | `.html` 结尾（cleanUrls=false） | 保持不变 |
| base | `/less_is_more_cn/` | 保持不变 |

> `legacy/` 只是备份，不再参与构建，确认无误后可以删掉（约 6.7MB）。

## 二、旧配置 → 新配置对照

配置文件：`content/.vitepress/config.mjs`（主题数据模块在同目录 `social-icons.mjs`、`legacy-redirects.mjs`、`content-map.mjs`）。

| 旧配置项（legacy/.vitepress/config.mjs） | 新位置 | 状态 |
| --- | --- | --- |
| `base: '/less_is_more_cn/'` | `base` | ✅ 原样保留 |
| `cleanUrls: false` | `cleanUrls` | ✅ 原样保留 |
| `title` / `description` | 顶层同名字段 | ✅ 原样保留 |
| `ignoreDeadLinks: true` | 顶层 | ✅ 保留 |
| `nav` 6 项 | `themeConfig.nav` | ✅ 保留；「常用导航」地址由 `/00navigation` 改为 `/navigation`（文件已改名） |
| `sidebar: generateSidebar(...)` | **已删除** | ✅ 主题用右侧「推荐文章」栏替代；想恢复左侧目录栏需在配置里设 `recommend: false` 并自配 sidebar。`vitepress-sidebar` 依赖已卸载 |
| `socialLinks` 4 个（含 B站/掘金/知乎 SVG） | `social-icons.mjs` → `themeConfig.socialLinks` | ✅ 逐字原样迁移 |
| `footer.message` / `copyright` / ICP | `getThemeConfig({ footer })` 的 `message`、`copyright`、`icpRecord` | ✅ 迁移，ICP 交给主题的备案组件渲染 |
| `search: { provider: 'local' }` | `getThemeConfig({ search })`，主题内置 pagefind | ✅ 中文文案沿用旧值，`forceLanguage: 'zh-cn'` |
| `lastUpdated.text` + `formatOptions` | `themeConfig.lastUpdated` | ✅ 保留 |
| `docFooter` 上一个 / 下一个 | `themeConfig.docFooter` | ✅ 保留 |
| `sitemap.hostname` + `transformItems` | 顶层 `sitemap` | ✅ 保留 |
| `markdown.lineNumbers / math / image.lazyLoading` | 顶层 `markdown` | ✅ 保留 |
| `head` 里的 GA / Umami / Clarity | 顶层 `head`（仅生产环境注入） | ✅ 代码保留，**是否继续使用见第三节第 7 条** |
| `transformHead` canonical / og / twitter | 同名钩子 | ✅ 保留 |
| `buildEnd` 旧路径跳转页（84 条 REDIRECTS） | `buildEnd` 重写 | ✅ 现在合并两张表：旧 84 条 + 内容映射 92 条，目标统一改写为新分组地址；本次构建产出 176 个跳转页 |
| `vite.plugins` 里的 pagefind 插件 | 主题内置（`search` 字段） | ✅ 替换，配置项一一对应 |
| `RssPlugin`（feed.rss） | 主题 `RSS` 字段 | ✅ `title: WIKI`、`baseUrl`、`link`、`description`、`copyright` 原样；已加 filter 排除首页和隐藏页（本次输出 87 篇） |
| `.vitepress/data/1.json`（524 条导航） | `content/navigation.md` | ✅ 已展开成真实 Markdown 清单（可用 522 条，脏数据已过滤） |
| 自定义 Vue 组件（Hitokoto / AdCarousel / Navigation / SponsorInfo） | 无对应实现 | ✅ 移除；`donate.md` 改为静态文案 |
| 文章 frontmatter `order` / `category` | 删除 | ✅ 新主题不需要；顺序由主题规则决定 |
| 页面类型 | 六个分类 `index.md` 落地页 | 变为 **9 个功能分组** index（ai/docker/life/resources/reverse/scripts/system/tools/web），均加 `hidden: true`，不参与文章流 |
| `docs/public/llm.txt` | `scripts/generate-llm-txt.mjs` | ✅ 改为扫描 `content/**`，输出 `content/public/llm.txt`（87 条） |

## 三、已按你的决定落地的设置（2026-11-26）

| 项 | 落地情况 |
| --- | --- |
| 评论系统 | ✅ 开启 giscus：`ice-a/blog-comments` / `R_kgDOV8Ylqg` / Announcements `DIC_kwDOV8Ylqs4DL_hO`，pathname 映射、底部输入框、中文。需要到该仓库 **Settings → Features** 打开 Discussions，并在 giscus.app 授权登录一次。 |
| 公告弹窗 | ✅ `popover.title: '公告'` + 一条迁移说明，`duration: -1`（只显示一次）。改文案/开关见 config 的 `popover`。 |
| 首页 logo | ✅ `home.logo = 'https://avatars.githubusercontent.com/ice-a'`（GitHub 头像，会随 GitHub 资料更新）。 |
| 首页标签 | ✅ `homeTags: true`。 |
| 三个站外导航 | ✅ 保留（Markdown 编辑器 / 动作图鉴 / 订阅转换）。 |
| 统计脚本 | ✅ **Google Tag Manager**：`https://www.googletagmanager.com/gtm.js?id=GTM-5PLVKK4J` + `dataLayer` 初始化（按你给的片段原样注入）。Bing 侧不挂 UET、不放 `msvalidate.01` 验证 meta——Bing 收录改用 **IndexNow**（免验证），见第四节。 |
| RSS | ✅ 随构建生成 `feed.rss`（87 篇，隐藏页除外）。 |
| 右侧推荐栏 | ✅ 保留主题默认（`recommend` 不写即开）。 |
| 部署 | ✅ `.github/workflows/deploy.yml`：push master 或手动触发 → build → Pages 部署。**需到 GitHub Settings → Pages 把 Source 选为 GitHub Actions。** |

## 四、SEO 与搜索引擎收录（自动推送方案）

现状（构建时已产出）：`sitemap.xml`（100 条 URL）、`robots.txt`（含 Sitemap 指向）、文章页 JSON-LD `BlogPosting` 结构化数据、canonical / og / twitter meta。

主动推送脚本 `scripts/seo-push.mjs`，在 workflow 的 `seo` job 里于**部署完成后**运行，从 sitemap 读 URL 并逐个渠道提交；缺凭证的渠道自动跳过。各渠道需要的 secrets：

| 渠道 | secrets | 说明 |
| --- | --- | --- |
| IndexNow（**推荐，免验证**） | `INDEXNOW_KEY`（可选 `INDEXNOW_KEY_FILE`） | 一次覆盖 **Bing / Yandex / Naver / Seznam**，也就是「必应无需验证码」的推送方式。步骤：① indexnow.org 免费生成 key；② 把 `indexnow-<key>.txt` 放进 `content/public/`（构建后会在站点根目录）；③ key 填进仓库 secrets。 |
| Bing Webmaster | `BING_API_KEY` | 可选补充，需单独在 bing.com/webmasters 取 key（走 API 提交 URL）。 |
| Google | `GOOGLE_SA_JSON` | 用 Indexing API 批量提交，需要 service account JSON（Google Cloud 开 Indexing API，下载 JSON 放进 secrets）。 |
| 百度站长 | `BAIDU_TOKEN`（可选 `BAIDU_SITE`） | 主动推送 token，百度站长平台「链接提交」页面获取。 |

其他建议：Google Search Console 首次仍建议手动添加站点地图（`https://ice-a.github.io/less_is_more_cn/sitemap.xml`）；必应在 Bing Webmaster 里也可以直接「导入自 Search Console」，省去逐个提交。360 / 搜狗 / 头条目前没有稳定公开的主动推送接口，靠 robots + sitemap 自然抓取即可。

## 五、部署到 Cloudflare Pages（可选，替代 GitHub Pages）

已提供 `.github/workflows/deploy-cloudflare.yml`，与 `deploy.yml` 二选一：启用 Cloudflare 时把 `deploy.yml` 的触发条件改成 `workflow_dispatch`，避免两边同时发。

配置方式（不再需要改代码）：

| 项 | 位置 | 值 |
| --- | --- | --- |
| `CLOUDFLARE_API_TOKEN` | Secrets | Cloudflare API Token（权限 `Account → Cloudflare Pages → Edit`） |
| `CLOUDFLARE_ACCOUNT_ID` | Secrets | Cloudflare 账号 ID |
| `CF_PAGES_PROJECT` | Variables | Pages 项目名，默认 `less-is-more-cn` |
| `CF_SITE_URL` | Variables | 自定义域名，例如 `https://blog.example.com`；不填则用 `<project>.pages.dev` |
| `CF_SITE_BASE` | Variables | 路径前缀，根目录部署用 `/` |

构建时通过环境变量切换站点地址与 base（[config.mjs](</C:\Users\lee\Desktop\opensourcegithub\less_is_more_cn\content\.vitepress\config.mjs>) 顶部读取 `CF_SITE_URL` / `CF_SITE_BASE`，origin 由 URL 推导，`robots.txt` 由 `scripts/gen-robots.mjs` 同步生成），因此：

- **自定义域名 + 根路径**：`base: '/'`，所有链接从域名根开始，旧地址跳转页目标会自动归一化（映射表里写死的 `/less_is_more_cn` 前缀会在构建时替换成当前 base）。
- 若临时挂在 `<project>.pages.dev`（根路径）同理，`base` 仍是 `/`。

手动本地验证：

```powershell
$env:CF_SITE_URL='https://blog.example.com'
$env:CF_SITE_BASE='/'
npm run docs:build
```

Cloudflare 侧还需注意两点：① 自定义域名要在 Pages 项目的 Custom domains 里绑定，并确认 DNS 记录为代理状态；② IndexNow 密钥文件必须出现在**站点域名根目录**（`https://你的域名/indexnow-<key>.txt`），用 pages.dev 地址申请的 key 换域名后需要重新验证。

## 六、已知差异（不影响使用，先说明）

- 文章里的图片仍全部是外部图床地址，没有本地化。
- `#pic_center` 这类 VitePress 图片语法后缀在新主题下不生效。
- 旧的 `order` 排序字段已移除，列表顺序由主题按日期/置顶规则生成。
- 主题基于 Element Plus，前端体积比原来的裸 VitePress 大一些。
- 12 个功能页（4 个单页 + 9 个分组索引）标记为 `hidden`，不会出现在文章列表和 RSS 里。
