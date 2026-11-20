---
title: Docker 安装 MongoDB
description: "用 Docker 部署 MongoDB：拉取镜像、启动容器并挂载数据目录。"
date: 2025-01-01
category: 基础与环境
tags:
  - 基础与环境
  - Docker
  - MongoDB
order: 12
---

## mongodb

### 拉镜像
```bash
docker pull mongo:9.0
```
### 启动

```bash
windows指定数据存放路径
docker run --rm --name mongo -d -p 27017:27017 -v D:\Mongodb\master\data:/data/db mongo:9.0
```


## 安装 Docker
```text
https://www.docker.com/get-started
下载安装即可
```
## 拉取 mongo 镜像
```bash
docker pull mongo:9.0
# 视网络情况,快的话几秒就可以拉取慢的话几分钟
```
## 创建数据卷
```bash
docker volume create --name mongodata
# 删除的命令是
docker volume rm XXX
```
## 创建容器
```bash
docker run -p 27017:27017 --name=mongodb -v mongodata:/data/db -d mongo
```
## others
之后容器被误删，数据卷都还在的，使用上面的命令创建容器，数据还在