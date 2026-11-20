---
title: Docker 安装 PostgreSQL
description: "用 Docker 部署 PostgreSQL，记录镜像拉取、容器启动与数据卷挂载。"
date: 2025-01-01
category: 基础与环境
tags:
  - 基础与环境
  - Docker
  - PostgreSQL
  - 数据库
order: 16
---

## postgresql
```bash
docker run -d -p 5432:5432 --name postgresql -v pgdata:/var/lib/postgresql/data -e POSTGRES_PASSWORD=YOUR_PASSWORD postgres:18
```