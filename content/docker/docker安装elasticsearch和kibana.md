---
title: Docker 安装 Elasticsearch 和 Kibana
description: "用 Docker 部署 Elasticsearch 与 Kibana：镜像版本选择、容器与网络创建、密码配置与 IK 插件安装。"
date: 2025-01-01
tags:
  - 基础与环境
  - Docker
  - Elasticsearch
  - Linux
---
## 机器
```text
os:ubuntu22.04-lts

```

## 安装 docker
```bash
sudo apt install docker.io
# 配置docker加速
{
    "registry-mirrors": [
        "https://dockerproxy.com",
        "https://mirror.baidubce.com",
        "https://docker.m.daocloud.io",
        "https://docker.nju.edu.cn",
        "https://docker.mirrors.sjtug.sjtu.edu.cn",
        "https://registry.docker-cn.com",
        "https://mirror.ccs.tencentyun.com",
        "http://hub-mirror.c.163.com"
    ]
}
```

## 创建一个 elastic 的网络
```bash
docker network create elastic
```

## 拉取 elastic 镜像
```bash
docker pull docker.elastic.co/elasticsearch/elasticsearch:8.19.25
```

## 创建容器
```bash
docker run --restart=always --name es01-test --net elastic -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" -e "ELASTIC_PASSWORD=YOUR_PASSWORD" -d docker.elastic.co/elasticsearch/elasticsearch:8.19.25
```

## 拉取 kibana 镜像
```bash
docker pull docker.elastic.co/kibana/kibana:8.19.25
```

## 创建 kibana 容器
```bash
docker run --restart=always --name kib01-test --net elastic -p 5601:5601 -e "ELASTICSEARCH_HOSTS=http://es01-test:9200" -e "ELASTICSEARCH_USERNAME=elastic" -e "ELASTICSEARCH_PASSWORD=YOUR_PASSWORD" -d docker.elastic.co/kibana/kibana:8.19.25
```

## 版本选择说明
- 7.x 已经停止维护，新部署直接上 8.19.25 或者 9.x。
- 9.x 目前只有 9.4.x / 9.5.x / 9.6.x 三条线，部分插件（例如 IK 分词）还没有跟上，生产环境优先选 8.19.x。

## 配置密码
```bash
# 8.x 默认开启安全认证,创建容器时通过 ELASTIC_PASSWORD 环境变量指定 elastic 用户的密码
# 如果容器已经建好,可以用内置工具重置
docker exec -it es01-test /usr/share/elasticsearch/bin/elasticsearch-reset-password -u elastic
```

## 安装中文分词插件
```bash
# 进入容器
docker exec -it es01-test /bin/bash
# 容器内执行
cd bin
# 安装 IK 分词插件,版本号要和 Elasticsearch 保持一致
elasticsearch-plugin install --batch https://release.infinilabs.com/analysis-ik/stable/elasticsearch-analysis-ik-8.19.25.zip
exit
# 重启容器
docker restart es01-test
```

## 配置 kibana
```bash
# 进入kibana容器
docker exec -it kib01-test /bin/bash
# 容器内执行
cd config
echo >> kibana.yml
echo elasticsearch.username: "elastic" >> kibana.yml
echo elasticsearch.password: "YOUR_PASSWORD" >> kibana.yml
echo i18n.locale: "zh-CN" >> kibana.yml   # 设置中文,可以不选
exit
# 重启容器
docker restart kib01-test
```
