# API QPS 限流服务

# [github](https://github.com/ice-a/random_api_words)

![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/1237b5440030407794dd8f449c56e95f.png)

# API QPS 限流服务

这是一个基于Go语言开发的API服务，具有IP限流和随机数据获取功能。该服务使用MongoDB存储数据，内存实现IP限流功能。

## 功能特点

+   IP限流保护：每分钟最多允许200次请求
+   自动封禁：超出限制的IP将被自动封禁10分钟
+   随机数据获取：支持从MongoDB随机获取数据
+   高性能：使用内存实现高效的限流机制

## 环境要求

+   Go 1.16+
+   MongoDB 4.0+

## 数据初始化

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

## 快速开始

### 1\. 克隆项目

```bash
git clone https://github.com/ice-a/random_api_words.git api_qps_go
cd api_qps_go
```

### 2\. 安装依赖

```bash
go mod download
```

### 3\. 配置服务

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

### 4\. 启动服务

```bash
go run main.go
```

服务将在 `http://localhost:8080` 启动

### Docker部署

1.  构建Docker镜像

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

## API接口

### 获取随机数据

```
GET /random
```

响应示例：

```json
{
    "type": "example_type",
    "connect": "example_connection"
}
```

### 限流说明

+   每个IP每分钟最多允许200次请求
+   超出限制的IP将被自动封禁10分钟
+   被封禁的IP访问会收到429状态码

## 常见问题

1.  **MongoDB连接失败**
    
    +   检查MongoDB服务是否正常运行
    +   验证MongoDB连接URI是否正确
    +   确保MongoDB数据库和集合已创建
2.  **API请求返回429状态码**
    
    +   这表示您的IP已超出请求限制或已被封禁
    +   请等待一段时间后再试

## 性能优化建议

1.  根据实际需求调整`MaxRequestsPerMinute`和`BanDuration`参数
2.  适当配置MongoDB索引以提升查询性能