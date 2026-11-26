---
title: 用 Multipass 快速构建 Ubuntu 环境
description: "用 Multipass 在本机快速创建 Ubuntu 虚拟机的步骤。"
date: 2024-01-01
tags:
  - 工具与配置
  - Linux
---
## 安装 multipass

```bash
multipass launch jammy --name acc --cpus 2 --disk 40G --memory 4G
```

## 常用命令

```bash
multipass list                                  # 查看实例列表
multipass shell acc                             # 进入实例终端
multipass mount . acc:/home/ubuntu/project      # 挂载本地目录到实例
multipass stop acc                              # 停止实例
multipass delete acc                            # 删除实例（需配合 purge）
multipass purge                                 # 清理已删除的实例
```
