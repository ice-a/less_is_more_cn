# 站点重构迁移说明（旧 VitePress 配置 → @sugarat/theme）

新站已经用 `@sugarat/theme` 搭好并构建通过。这份文档说明**旧配置每一项去了哪里**，以及**哪些开关需要你来定**。

## 一、目录与命令的变化

| 项目 | 旧 | 新 |
| --- | --- | --- |
| 源目录 | `docs/` | `content/` |
| 构建产物 | `docs/.vitepress/dist` | `content/.vitepress/dist` |
| 开发 | `npm run docs:dev` | 相同（内部已是 `vitepress dev content`） |
| 构建 | `npm run docs:build` | 相同（新增 `npm run build` 别名，给 CI 用） |
| 预览 | `npm run docs:preview` | 相同 |
| URL 形态 | `.html` 结尾（cleanUrls=false） | 保持不变 |
| base | `/less_is_more_cn/` | 默认不变；换 Cloudflare / 自定义域名时由 `CF_SITE_BASE` 覆盖 |

> 旧的 `docs/` 已整体删除，历史内容可在 git 历史（提交 `b3750b9`）里取回。

## 二、旧配置 → 新配置对照

配置文件：`content/.vitepress/config.mjs`（主题数据模块在同目录 `social-icons.mjs`、`legacy-redirects.mjs`、`content-map.mjs`）。

| 旧配置项（原 `docs/.vitepress/config.mjs`） | 新位置 | 状态 |
| --- | --- | --- |
| `base` / `cleanUrls: false` | 顶层同名字段 | ✅ 保留；base 可用 `CF_SITE_BASE` 覆盖 |
| `title` / `description` | 顶层同名字段 | ✅ 原样保留 |
| `ignoreDeadLinks: true` | 顶层 | ✅ 保留 |
| `nav` 6 项 | `themeConfig.nav` | ✅ 现为 5 项：首页 / 时间线 / 常用导航（`/navigation`）/ 订阅转换 / 关于；按你的要求删除了 Markdown 编辑器、动作图鉴 |
| `sidebar: generateSidebar(...)` | **已删除** | ✅ 主题用右侧「推荐文章」栏替代；想恢复左侧目录栏需设 `recommend: false` 并自配 sidebar。`vitepress-sidebar` 依赖已卸载 |
| `socialLinks` 4 个（含 B站/掘金/知乎 SVG） | `social-icons.mjs` → `themeConfig.socialLinks` | ✅ 逐字原样迁移 |
| `footer.message` / `copyright` / ICP | `getThemeConfig({ footer })` + `theme/style.css` | ✅ 已按你的要求移除：`footer.version:false`（版权/备案注释保留备用）+ `footer.blog-footer { display:none }` |
| `search: { provider: 'local' }` | `getThemeConfig({ search })`，主题内置 pagefind | ✅ 中文文案沿用旧值，`forceLanguage: 'zh-cn'` |
| `lastUpdated.text` + `formatOptions` | `themeConfig.lastUpdated` | ✅ 保留 |
| `docFooter` 上一个 / 下一个 | `themeConfig.docFooter` | ✅ 保留 |
| `sitemap.hostname` + `transformItems` | 顶层 `sitemap` | ✅ 保留；hostname 跟随 `CF_SITE_URL` |
| `markdown.lineNumbers / math / image.lazyLoading` | 顶层 `markdown` | ✅ 保留 |
| `head` 里的 GA / Umami / Clarity | 顶层 `head`（仅生产环境注入） | ✅ 代码保留；统计已按你的决定换成 GTM |
| `transformHead` canonical / og / twitter | 同名钩子 | ✅ 保留；canonical/origin 由 `CF_SITE_URL` 推导 |
| `buildEnd` 旧路径跳转页 | `buildEnd` 重写 | ✅ 合并两张表：旧 84 条 + 内容映射 92 条 = 176 个跳转页，目标统一改写为新分组地址 |
| `vite.plugins` 里的 pagefind 插件 | 主题内置（`search` 字段） | ✅ 替换，配置项一一对应 |
| `RssPlugin`（feed.rss） | 主题 `RSS` 字段 | ✅ `title/baseUrl/link/description/copyright` 原样；filter 排除首页与隐藏页（本次 88 篇） |
| `.vitepress/data/1.json`（524 条导航） | `content/navigation.md` | ✅ 展开成真实 Markdown 清单（可用 522 条，脏数据已过滤） |
| 自定义 Vue 组件（Hitokoto / AdCarousel / Navigation / SponsorInfo） | 无对应实现 | ✅ 移除；`donate.md` 改为静态文案 |
| 文章 frontmatter `order` / `category` | 删除 | ✅ 新主题不需要；顺序由主题规则决定 |
| 页面类型 | 六个分类 `index.md` 落地页 | 变为 **9 个功能分组** index（ai/docker/life/resources/reverse/scripts/system/tools/web），均加 `hidden: true` |
| `docs/public/llm.txt` | `scripts/generate-llm-txt.mjs` | ✅ 扫描 `content/**`，输出 `content/public/llm.txt`（88 条） |
| —— | `scripts/gen-robots.mjs` | 新增：按 `CF_SITE_URL` 生成 `content/public/robots.txt` |
| —— | `scripts/gen-timeline.mjs` | 新增：构建前生成 `content/timeline.md`（时间线页） |

## 三、已按你的决定落地的设置（2026-11-26）

| 项 | 落地情况 |
| --- | --- |
| 评论系统 | ✅ giscus：`ice-a/blog-comments` / `R_kgDOV8Ylqg` / Announcements `DIC_kwDOV8Ylqs4DL_hO`，pathname 映射、底部输入框、中文。需到该仓库 **Settings → Features** 打开 Discussions，并在 giscus.app 授权登录一次。 |
| 公告弹窗 | ⏸ 暂时移除：`popover` 整段已注释保留在 config.mjs，取消注释即恢复。 |
| 时间线页 | ✅ 新增 `content/timeline.md`，由 `scripts/gen-timeline.mjs` 按 frontmatter `date` 倒序生成（88 篇，同年分组），用主题内置的 `::: timeline` 语法渲染；已加入顶部导航，页面 `hidden:true` 不进文章列表/RSS/llm.txt。 |
| 首页 logo | ✅ `home.logo = 'https://avatars.githubusercontent.com/ice-a'`。 |
| 首页标签 | ✅ `homeTags: true`。 |
| 站外导航 | ✅ 仅保留「订阅转换」（https://sub.020417.xyz/），其余两项已移除。 |
| 统计脚本 | ✅ Google Tag Manager `{{SECRET_9efjwufx}}` + Microsoft Clarity `zjk1n98mr2`（仅生产环境注入）；Bing 不挂 UET/msvalidate，收录走 IndexNow。 |
| 站点验证 | ✅ 百度搜索资源平台 `baidu-site-verification=codeva-3TbUdoBDVj`（仅生产注入）。需要 Google / 必应的验证 meta 时按同样方式加一行即可。 |
| 广告 | ✅ Google AdSense：加载器 + `google-adsense-account` meta（仅生产注入）；**每篇文章正文末尾自动插入一个自适应智能广告单元**（`transformHtml` 注入到 `</main>` 前，共 88 篇）。单篇可用 frontmatter `adsense: false` 关闭；首页与隐藏页（时间线/导航/分类落地页）不插。 |
| RSS | ✅ 随构建生成 `feed.rss`（隐藏页除外）。 |
| 右侧推荐栏 | ✅ 保留主题默认。 |
| 部署 | ✅ 只用 Cloudflare Pages 连 GitHub 仓库构建（见第五节）；`.github/workflows/` 下只保留 `seo-daily.yml`。 |
| SEO 推送 | ✅ `scripts/seo-push.mjs` + `.github/workflows/seo-daily.yml`（定时从线上 sitemap 推送，与部署方式无关）。 |

## 四、SEO 与搜索引擎收录（自动推送方案）

构建产出：`sitemap.xml`、`robots.txt`（含 Sitemap）、文章页 JSON-LD `BlogPosting`、canonical / og / twitter meta。

`scripts/seo-push.mjs` 从 sitemap 读 URL 后按渠道提交；参数可以是本地 dist 目录，也可以是线上地址：

```powershell
node scripts/seo-push.mjs content/.vitepress/dist          # 本地
node scripts/seo-push.mjs https://你的域名/sitemap.xml      # 线上（配合 SITE_PREFIX=/）
```

| 渠道 | 所需环境变量 | 说明 |
| --- | --- | --- |
| IndexNow（**推荐，免验证**） | `INDEXNOW_KEY`（可选 `INDEXNOW_KEY_FILE`、`SITE_PREFIX`） | 一次覆盖 Bing / Yandex / Naver / Seznam。key 文件 `content/public/indexnow-<key>.txt` 会随构建发布。 |
| Bing Webmaster | `BING_API_KEY` | 可选补充。 |
| Google | `GOOGLE_SA_JSON` | Indexing API，需要 service account JSON。 |
| 百度站长 | `BAIDU_TOKEN`（可选 `BAIDU_SITE`） | 「链接提交」页面取 token。 |

Google Search Console 首次建议手动添加站点地图；必应可在 Bing Webmaster 里「导入自 Search Console」。360 / 搜狗 / 头条没有稳定公开接口，靠 robots + sitemap 自然抓取。

## 五、部署到 Cloudflare Pages

### 方式 A：Pages 直接连 GitHub 仓库（推荐，不用 Actions）

Cloudflare 控制台创建 Pages 项目时选「连接到 Git」，按下表填：

| 字段 | 值 |
| --- | --- |
| 项目名称 | `less-is-more-cn` |
| 生产分支 | `master` |
| 框架预设 | 无 |
| 构建命令 | `npm ci && npm run docs:build` |
| 构建输出目录 | `content/.vitepress/dist` |
| 根目录（高级） | 留空（不要改，npm 要在仓库根执行） |

环境变量（「保存并部署」前的「环境变量(高级)」）：

| 变量 | 值 | 说明 |
| --- | --- | --- |
| `CF_SITE_BASE` | `/` | 自定义域名 / pages.dev 都是根路径 |
| `CF_SITE_URL` | `https://你的域名`（或 `https://less-is-more-cn.pages.dev`） | 影响 sitemap / canonical / og:url |
| `NODE_VERSION` | `20` | 可选，避免 Cloudflare 默认 Node 版本过旧 |

`docs:build` 已串好 `gen-robots.mjs` → `generate-llm-txt.mjs` → `vitepress build content`，robots.txt 与 llm.txt 都会自动产出。

构建由 Cloudflare 直连完成，仓库里不再需要任何部署 workflow。SEO 推送是唯一保留的 Actions：`.github/workflows/seo-daily.yml`（每 3 天从线上 sitemap 推一次，Variables 配 `SITE_PREFIX=/` 即可，站点域名由脚本从 sitemap 自动推导，`SEO_HOST` 可不填），也可以本地手动跑上面的命令。需要的 Secrets 只有 `INDEXNOW_KEY`（其余渠道按需）。

共同前提：站点地址与 base 通过 `CF_SITE_URL` / `CF_SITE_BASE` 注入（[config.mjs](</C:\Users\lee\Desktop\opensourcegithub\less_is_more_cn\content\.vitepress\config.mjs>) 顶部读取，origin 由 URL 推导），跳转页目标在构建时按当前 base 归一化。自定义域名要在 Pages 项目里绑定且 DNS 记录保持代理；IndexNow 的 key 文件必须出现在**域名根目录**，换域名后需重新验证。

## 六、已知差异（不影响使用，先说明）

- 文章里的图片仍全部是外部图床地址，没有本地化。
- `#pic_center` 这类 VitePress 图片语法后缀在新主题下不生效。
- 旧的 `order` 排序字段已移除，列表顺序由主题按日期/置顶规则生成。
- 主题基于 Element Plus，前端体积比原来的裸 VitePress 大一些。
- 12 个功能页（4 个单页 + 9 个分组索引）标记为 `hidden`，不出现在文章列表和 RSS 里。

## 七、性能优化（2026-11-26，PageSpeed Insights 移动端 0.78 → 0.87~0.88）

在 [config.mjs](</C:\Users\lee\Desktop\opensourcegithub\less_is_more_cn\content\.vitepress\config.mjs>) 里做的改动：

| 优化 | 说明 |
| --- | --- |
| 头像本地化 | `home.logo` 从 GitHub avatars 外链改为 `content/public/avatar.png`（260px / 3.8KB），消除首屏外部图片请求；首页 `transformHead` 再 preload 该图 |
| 预连接 | head 增加 clarity.ms / googletagmanager.com / pagead2.googlesyndication.com 的 `preconnect`，doubleclick 走 `dns-prefetch` |
| 关闭全路由预加载 | `shouldPreload: () => false`，避免 VitePress 把 88 篇文章的 chunk 全部 modulepreload |
| 首页背景压缩 | buildEnd 把主题 90KB 的 `bg.webp` 换成 `content/public/bg-home.webp`（54KB）并删掉原文件 |

试过但回退（没有收益或更差）：延后 GTM/Clarity/AdSense 到 load 之后、改用系统字体栈 / 删除 Inter webfont——两项都会让 LCP 明显变差。

剩余的大头是第三方脚本（GTM/AdSense/Clarity 约 300KB）与主题框架的 hydration，属于主题的固有成本；要再往上走只能裁剪主题功能（例如关掉搜索、去掉 Element Plus 相关组件）。

