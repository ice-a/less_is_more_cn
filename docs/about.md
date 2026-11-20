---
title: 关于
description: "这里是「爱喝水的木子」的个人笔记站，主要用来存放平时学习和工作里记录下来的东西。"
date: 2026-05-07
category: 关于
tags:
  - 关于
  - 爬虫
  - 逆向工程
order: 8
---

<Hitokoto />

<AdCarousel />

## 关于这个站点

这里是「爱喝水的木子」的个人笔记站，主要用来存放平时学习和工作里记录下来的东西。

写的东西比较杂，大致分成几类：

- 环境和基础配置的踩坑记录，比如装 Docker、Node.js、Python 环境时遇到的问题和解决办法；
- 写过的代码片段和脚本，多是 Python 和 JavaScript；
- 爬虫和逆向相关的学习笔记，包括反爬与风控的常见手段、补环境思路、AST 解混淆、原型链等；
- 工具和配置的整理，比如服务器初始化要装哪些软件、镜像站、图床、限流服务这类小工具。

内容以「自己能用」为准：写得对的会一直留着，写错或者过时的会改掉或者删掉。因为是个人笔记，所以不追求面面俱到，也不敢保证每篇都是对的，看的时候留个心眼。

## 正在学的方向

- 爬虫：异步爬虫、分布式调度、验证码识别、数据清洗；
- 逆向：JavaScript 逆向、Web API 逆向、App 逆向、协议分析；
- 反爬对抗：浏览器指纹、请求特征、行为模拟、代理池管理；
- 后端：Flask / FastAPI 风格的 API 服务、Docker 部署、数据库与缓存；
- 前端：Vue 生态、页面性能优化；
- 数据与算法：PyTorch 训练环境、模型推理、数据可视化。

上面这些大多只是学过、用过，还没有到能称为「精通」的程度。

## 站点的技术实现

站点本身用 VitePress 搭建，部署在 GitHub Pages，源码放在 [GitHub](https://github.com/ice-a)。

- VitePress 2 + Vue 3
- vitepress-sidebar 自动生成侧边栏，排序由每篇笔记的 frontmatter 里的 `order` 决定
- vitepress-plugin-pagefind 生成搜索索引，中文分词用 `Intl.Segmenter`
- vitepress-plugin-rss 生成 RSS
- GA、Umami、Microsoft Clarity 三个统计脚本，只在生产构建时注入

## 联系方式

- **GitHub**：[github.com/ice-a](https://github.com/ice-a)
- **B站**：[space.bilibili.com/309278307](https://space.bilibili.com/309278307)
- **掘金**：[juejin.cn/user/712139267643543](https://juejin.cn/user/712139267643543/posts)
- **知乎**：[zhihu.com/people/love_water_blue](https://www.zhihu.com/people/love_water_blue/posts)

站点没有单独留邮箱。

## 写在最后

写笔记这件事本身没什么门槛，难的是坚持把踩过的坑记下来，回头还能搜到。

如果这些笔记对你有点用，欢迎通过上面的联系方式找我交流。
