---
title: 用 Multipass 快速构建 Ubuntu 环境
description: "用 Multipass 在本机快速创建 Ubuntu 虚拟机的步骤。"
date: 2024-01-01
category: 工具与配置
tags:
  - 工具与配置
  - Linux
order: 13
---

## 安装 multipass

```bash
multipass launch jammy --name acc --cpus 2 --disk 40G --memory 4G
```