---
title: API QPS 限流服务
description: "这是一个基于 Go 语言开发的 API 服务，具有 IP 限流和随机数据获取功能。该服务使用 MongoDB 存储数据，内存实现 IP 限流功能。"
date: 2025-01-01
tags:
  - 工具与配置
  - Docker
  - MongoDB
  - 性能优化
  - Git
---
原项目的 GitHub 仓库已下线，本篇保留服务结构、接口与部署步骤，可按下面的目录自行实现。

## 目录结构（占位）

```text
api_qps_go/
├── main.go              # 入口：注册路由、启动 HTTP 服务
├── config/config.go     # MongoDB 连接与限流参数配置
├── data/data.json       # 初始化数据
└── scripts/init_db.go   # 把 data.json 写入 MongoDB 的初始化脚本
```

![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/1237b5440030407794dd8f449c56e95f.png)

## API QPS 限流服务

这是一个基于 Go 语言开发的 API 服务，具有 IP 限流和随机数据获取功能。该服务使用 MongoDB 存储数据，内存实现 IP 限流功能。

### 功能特点

+   IP 限流保护：每分钟最多允许 200 次请求
+   自动封禁：超出限制的 IP 将被自动封禁 10 分钟
+   随机数据获取：支持从 MongoDB 随机获取数据
+   高性能：使用内存实现高效的限流机制

### 环境要求

+   Go 1.16+
+   MongoDB 4.0+

### 数据初始化

1.  在 `data/data.json` 文件中配置初始数据，格式如下：

```json
[
    {"type": "kfcv50", "connect": "123"}
]
```

2.  运行初始化脚本：

```bash
cd scripts
go run init_db.go
```

该脚本会读取 data.json 中的数据并插入到 MongoDB 数据库中。

### 快速开始

#### 1\. 克隆项目

```bash
# 原仓库已下线，按下面的目录结构自行实现
# git clone https://github.com/ice-a/random_api_words.git api_qps_go
cd api_qps_go
```

#### 2\. 安装依赖

```bash
go mod download
```

#### 3\. 配置服务

配置文件位于 `config/config.go`，您可以根据需要修改以下配置：

```go
// MongoDB配置
MongoURI      = "mongodb://localhost:27017"
MongoDatabase = "coll"
MongoCollection = "data"

// API限流配置
MaxRequestsPerMinute = 200
BanDuration = 10 * 60 // 10分钟，单位：秒
```

#### 4\. 启动服务

```bash
go run main.go
```

服务将在 `http://localhost:8080` 启动

#### Docker 部署

1.  构建 Docker 镜像

```bash
docker build -t api-qps-service .
```

2.  运行容器

```bash
docker run -d \
  -p 8080:8080 \
  --name api-qps-service \
  api-qps-service
```

### API 接口

#### 获取随机数据

```text
GET /random
```

响应示例：

```json
{
    "type": "example_type",
    "connect": "example_connection"
}
```

#### 限流说明

+   每个 IP 每分钟最多允许 200 次请求
+   超出限制的 IP 将被自动封禁 10 分钟
+   被封禁的 IP 访问会收到 429 状态码

### 常见问题

1.  **MongoDB 连接失败**
    
    +   检查 MongoDB 服务是否正常运行
    +   验证 MongoDB 连接 URI 是否正确
    +   确保 MongoDB 数据库和集合已创建
2.  **API 请求返回 429 状态码**
    
    +   这表示您的 IP 已超出请求限制或已被封禁
    +   请等待一段时间后再试

### 性能优化建议

1.  根据实际需求调整 `MaxRequestsPerMinute` 和 `BanDuration` 参数
2.  适当配置 MongoDB 索引以提升查询性能
