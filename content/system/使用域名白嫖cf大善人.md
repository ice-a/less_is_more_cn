---
title: 使用域名白嫖 Cloudflare 大善人
description: "用免费域名配合 Cloudflare Workers 的操作流程：注册域名、解析 DNS、创建 Worker。"
date: 2025-08-01
tags:
  - 基础与环境
  - Linux
---
预期效果：用免费域名配合 Cloudflare Workers，把自有域名接入 Cloudflare 网络，获得一套 CDN / 反代能力。

## 需要

- cf 账号
- 域名

### step
1. 注册白嫖域名
    1. [https://domain.digitalplat.org/](https://domain.digitalplat.org/)
    2. register -> login -> 设置 dns 解析到大善人
    3. 在 digitalplat 后台把域名的 NS 记录指向 Cloudflare（截图如下）

       ![](https://cdn.nlark.com/yuque/0/2025/png/26303072/1753772122223-904f6186-7ddb-47a6-a460-c1ada99649d1.png)
2. 大善人那里创建 worker
    1. 教程开源于这里 [https://linux.do/t/topic/656503](https://linux.do/t/topic/656503)
