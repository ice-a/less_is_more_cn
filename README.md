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
- **评论系统**：[Waline](https://waline.js.org/)
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
| `Waline` | 评论系统集成 |

## 项目结构

```
docs/
├── index.md                 # 首页
├── about.md                 # 关于页
├── givemefive.md            # 赞助页
├── 00navigation/            # 导航页
├── 01杂记/                  # 杂记文章
├── 02基础与环境/             # 基础与环境文章
├── 03代码与脚本/             # 代码与脚本文章
├── 04工具与配置/             # 工具与配置文章
├── 05爬虫与逆向/             # 爬虫与逆向文章
├── 06AI与算法/              # AI 与算法文章
├── public/                  # 静态资源
└── .vitepress/
    ├── config.mjs           # VitePress 配置
    ├── components/          # 自定义 Vue 组件
    ├── theme/               # 自定义主题
    └── data/                # 导航数据
```

## 快速开始

### 环境要求

- Node.js >= 18
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
