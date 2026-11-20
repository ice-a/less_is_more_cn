---
title: Docker 安装 Redis
description: "用 Docker 部署 Redis：拉取镜像、启动容器，并说明为什么要在脚本里固定版本号。"
date: 2025-01-01
category: 基础与环境
tags:
  - 基础与环境
  - Docker
  - Redis
order: 14
---

## 拉取镜像
```bash
docker pull redis:8.8-alpine
```
## 创建容器
```bash
docker run --name some-redis -p 6379:6379 -d redis:8.8-alpine
```
## others
- `redis` 不带 tag 会拉到 `latest`，版本会跟着上游漂移，写进脚本时最好固定版本。
- 8.x 的 `alpine` 镜像体积小，适合本地开发；生产环境建议用官方 Debian 基础镜像。