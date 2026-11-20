# 爱喝水的木子 - 个人技术博客

> 存在即合理 | 一个小菜鸡的个人博客

基于 [VitePress](https://vitepress.dev/) 构建的个人技术博客，记录学习过程中的技术知识、实践经验和工具分享。

在线访问：[https://104303.xyz](https://104303.xyz)

## 内容分类

| 分类 | 说明 |
|------|------|
| 杂记 | 个人随笔、生活感悟、阅读清单 |
| 基础与环境 | Docker 部署（MongoDB / Redis / ES / Hadoop / Neo4j / PostgreSQL）、Ubuntu 配置、conda、Go 环境等 |
| 代码与脚本 | Python / JavaScript / Flask / OpenCV / ffmpeg / 加解密 / 数据提取等代码片段 |
| 工具与配置 | YOLO 训练、API Mock、ES 仪表盘、Windows 工具等 |
| 爬虫与逆向 | DNS 解析、Frida 脚本、反爬策略、AST 脱混淆、iOS 逆向、浏览器指纹等 |
| AI 与算法 | TTS、音频数据集、PyTorch、Prompt 工程、AI 辅助学习路径 |

## 技术栈

- **框架**：VitePress 2.0 (alpha) + Vue 3
- **全文搜索**：[vitepress-plugin-pagefind](https://github.com/ATQQ/sugar-blog/tree/master/packages/vitepress-plugin-pagefind)（支持中文分词）
- **数学公式**：[markdown-it-mathjax3](https://github.com/tani/markdown-it-mathjax3)
- **图片查看**：[viewerjs](https://fengyuanchen.github.io/viewerjs/) + vitepress-plugin-image-viewer
- **RSS 订阅**：[vitepress-plugin-rss](https://github.com/ATQQ/sugar-blog/tree/master/packages/vitepress-plugin-rss)
- **侧边栏**：[vitepress-sidebar](https://github.com/jooy2/vitepress-sidebar) 自动生成

## 自定义组件

| 组件 | 说明 |
|------|------|
| `Hitokoto` | 一言随机语录展示（调用 hitokoto.cn API） |
| `Navigation` | 网站导航页，支持搜索和分类筛选 |
| `SponsorInfo` | 赞助页面，支持微信 / 支付宝 / QQ / USDT / Buy Me A Coffee |
| `AdCarousel` | 广告 / 图片轮播组件 |

## 项目结构

```
docs/
├── index.md                 # 首页
├── about.md                 # 关于页
├── givemefive.md            # 赞助页
├── 00navigation.md          # 导航页
├── 01杂记/                  # 杂记文章
│   └── index.md             # 分类落地页（分类说明 + 笔记清单）
├── 02基础与环境/             # 基础与环境文章
├── 03代码与脚本/             # 代码与脚本文章
├── 04工具与配置/             # 工具与配置文章
├── 05爬虫与逆向/             # 爬虫与逆向文章
├── 06AI与算法/              # AI 与算法文章
├── public/                  # 静态资源（llm.txt 由脚本生成到这里）
└── .vitepress/
    ├── config.mjs           # VitePress 配置
    ├── components/          # 自定义 Vue 组件
    ├── theme/               # 自定义主题
    └── data/                # 导航数据
```

每个分类目录下都有一个 `index.md` 落地页，侧边栏的分类标题会直接取它的 `title`，并可点击进入。

## 维护工具

| 命令 | 作用 | 产物 |
|------|------|------|
| `npm run docs:dev` | 本地开发服务器 | — |
| `npm run docs:build` | 构建生产版本 | `docs/.vitepress/dist` |
| `npm run docs:preview` | 预览生产构建 | — |
| `npm run docs:llm` | 按当前文章与 frontmatter 重新生成 `llm.txt` | `docs/public/llm.txt` |
| `npm run docs:links` | 巡检全站外链，生成死链清单与替代建议 | `scripts/_link-report.md` |

### llm.txt

`llm.txt` 是给大模型用的站点索引，放在 `docs/public/llm.txt`，构建时会被复制到站点根目录（线上路径 `/llm.txt`）。内容全部由 `scripts/generate-llm-txt.mjs` 从文章本身生成，不要手工维护副本：站点简介、分类导航、每篇文章的标题、URL 与摘要，URL 取自 `docs/.vitepress/config.mjs` 里的 `sitemap.hostname` 并做百分号编码，和 `sitemap.xml` 保持一致。摘要优先取 frontmatter 里的 `description`，没有再从正文第一个有效段落提取。

文章增删或改名后重新跑一次 `npm run docs:llm` 即可。

### 外链巡检

`npm run docs:links` 会扫描 `docs/**/*.md`（跳过代码块和行内代码里的地址），并发请求每个外链，结果分四类写进 `scripts/_link-report.md`：

| 分类 | 判定 | 处理方式 |
|------|------|----------|
| 可达 | 2xx / 3xx | 不用管 |
| 死链 | 404 / 410 | 资源真的没了，替换成新地址或删掉条目；脚本会给出候选替代并逐个实测 |
| 反爬或需授权 | 401 / 403 / 406 / 429 / 5xx / 521 | 页面通常还在（反爬、限流、需要登录），保留 |
| 网络不可达 | 超时、DNS 解析失败等 | 本机网络问题居多，默认保留，需要人工复核 |

报告里还有一段「死链替代建议」，是脚本按 readthedocs → readthedocs.io、pythonhosted → PyPI、bitbucket → GitHub 这类规律试出来的候选地址，逐条实测过才算数。发现死链时按这个顺序处理：

1. 先看替代建议，能替换的直接替换（替换前人工确认地址确实是同一个项目）。
2. 找不到替代的，清单类笔记里直接删掉这一条；单篇笔记里把失效链接改成文字说明，并说明「原链接已失效」。
3. 改完再跑一次 `npm run docs:links`，确认「死链」一栏归零。

只要还有死链，命令会以退出码 1 结束，可以直接挂到 CI 上做定期巡检。

### 旧路径跳转

文章改名或合并后，旧地址不会自动跳转。`docs/.vitepress/config.mjs` 里维护了一份 `REDIRECTS` 映射（旧路径 → 新路径），构建结束后会在 `dist` 里为每个旧路径生成一个带 `refresh` 与 `canonical` 的跳转页，既照顾已经收录的旧链接，也不让跳转页进入 sitemap。新增改名或合并时，往 `REDIRECTS` 里补一条即可。

## 笔记格式

每篇笔记的 frontmatter 统一使用下面这几个字段：

```yaml
---
title: 笔记标题          # 侧边栏显示的标题
date: 2026-11-19        # 首次创建日期
category: 爬虫与逆向     # 所属分类
tags:                   # 关键词，最多 5 个
  - 爬虫
  - 反爬虫与风控
order: 1                # 同一目录内的排序序号，裸数字
---
```

- `order` 决定侧边栏里的先后顺序，目录内从 1 开始递增；顶层页面用 1（常用导航）、2~7（六个分类）、8（关于）、9（赞助）。
- `title` 不要再写成 `document`、`git`、`工具` 这类看不出内容的词，直接写清楚这篇在讲什么。
- 正文标题从 `##` 开始，`#` 留给页面标题，避免和页面标题重复。

## 快速开始

### 环境要求

- Node.js >= 22（推荐 22 LTS 或更新的 LTS 版本）
- npm

### 安装与运行

```bash
# 克隆仓库
git clone https://github.com/ice-a/less_is_more_cn.git
cd less_is_more_cn

# 安装依赖
npm install

# 启动开发服务器
npm run docs:dev

# 构建生产版本
npm run docs:build

# 预览生产构建
npm run docs:preview
```

## 社交链接

- **GitHub**：[ice-a](https://github.com/ice-a)
- **Bilibili**：爱喝水的木子
- **掘金**：爱喝水的木子
- **知乎**：爱喝水的木子

## 许可证

[MIT](LICENSE) | 豫ICP备2021025932号-1
