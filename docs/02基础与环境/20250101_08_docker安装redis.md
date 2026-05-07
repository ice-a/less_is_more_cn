---
title: docker安装redis
date: 2025-01-01
---

# 拉取镜像
```
docker pull redis
```
# 创建容器
```
docker run --name some-redis -p 6379:6379 -d redis
```