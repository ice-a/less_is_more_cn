---
title: 02 基础与环境
description: "搭建开发环境的过程记录：Linux 与 Ubuntu 上的常用配置、Docker 部署、数据库和中间件的容器化安装。"
date: 2026-11-19
category: 基础与环境
tags:
  - 基础与环境
layout: doc
order: 3
---

搭建开发环境的过程记录：Linux 与 Ubuntu 上的常用配置、Docker 部署、数据库和中间件的容器化安装。

本分类共 17 篇笔记。

- [Matplotlib 无法显示中文解决方法](./20220101_01_matplotlib无法显示中文解决方法.md) —— 默认情况下图里的中文会显示成方框，原因是 Matplotlib 默认字体 DejaVu Sans 不含中文字形，文中给出两种解决办法。
- [Ubuntu 安装 Node.js 版本过低问题](./20220101_02_ubuntu安装nodejs版本过低.md) —— 解决 Ubuntu 上 Node.js 版本过低的问题：用 NodeSource 安装新版本，或用 nvm 管理多个版本。
- [Samba 共享配置与访问控制](./20240101_01_samba共享配置与访问控制.md) —— 在 Ubuntu 上安装 Samba、配置共享目录并按用户组限制访问，同时启用 full_audit 审计、recycle 回收站与 rsyslog 日志。
- [逛 GitHub 遇到喜欢的项目但是没时间去看的解决方法](./20240101_02_逛github收藏项目.md) —— GitHub 收藏方法：遇到喜欢的项目先 clone 到本地，留着以后再看。
- [筛选 JSON 中为空的标注文件](./20240101_04_筛选文件大小是0的.md) —— 判断 JSON 里 `shapes` 是否为空，把空标注文件挪到另一个目录的 Python 写法。
- [生成 DOCX 文件](./20240101_05_生成docx文件.md) —— 用 Python 生成 DOCX 文档的写法。
- [搞个小游戏](./20240513_01_搞个小游戏.md) —— 石蒜（Sakana）模拟器的项目地址与在线试玩入口。
- [远程工具连接 Ubuntu 一直 100 不动了](./20240812_01_远程工具连接ubuntu一直100不动.md) —— 远程桌面连接 Ubuntu 一直卡在 100% 时的排查思路，以及关闭 Wayland 的做法。
- [Conda 环境管理](./20250101_01_conda环境.md) —— Conda 环境管理笔记：Miniforge 的下载安装与环境创建、切换操作。
- [Docker 安装 Elasticsearch 和 Kibana](./20250101_04_docker安装elasticsearch和kibana.md) —— 用 Docker 部署 Elasticsearch 与 Kibana：镜像版本选择、容器与网络创建、密码配置与 IK 插件安装。
- [Docker 安装 Hadoop](./20250101_05_docker安装hadoop.md) —— 用 Docker 部署 Hadoop，记录镜像拉取与容器启动步骤。
- [Docker 部署常用服务](./20250101_06_docker部署常用服务.md) —— 用 Docker 一条命令部署 MongoDB、Neo4j、Redis、PostgreSQL，并记录容器重启策略与镜像加速配置。
- [Docker 一些 demo](./20250101_09_docker一些demo.md) —— 用 Docker 跑各类开源小工具的示例合集，覆盖数据库、中间件与网站分析等场景。
- [并发测试网站](./20250801_01_并发测试网站.md) —— 并发测试网站的搭建记录，用 Python 脚本压测接口响应。
- [使用域名白嫖 Cloudflare 大善人](./20250801_02_使用域名白嫖cf大善人.md) —— 用免费域名配合 Cloudflare Workers 的操作流程：注册域名、解析 DNS、创建 Worker。
- [Linux 代理配置](./20250801_04_linux代理配置.md) —— 在无图形界面的 Linux 服务器上配置网络代理，用 Docker 启动 Mihomo（Clash 增强版）与 Yacd 管理界面。
- [Go 环境安装](./20251211_01_go环境安装.md) —— Go 环境安装记录：用版本管理器切换多个 Go 版本，并配置 GOROOT、GOBIN 等环境变量。
