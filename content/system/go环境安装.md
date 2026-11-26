---
title: Go 环境安装
description: "Go 环境安装记录：用版本管理器切换多个 Go 版本，并配置 GOROOT、GOBIN 等环境变量。"
date: 2025-12-11
tags:
  - 基础与环境
  - Git
  - Linux
---
## 使用 g 管理 Go 版本

[voidint/g](https://github.com/voidint/g) 是一个跨平台的 Go 版本管理器，可以在多个 Go 版本之间切换。

### Windows

```powershell
iwr https://raw.githubusercontent.com/voidint/g/master/install.ps1 -useb | iex
```

### Linux / macOS

安装前建议清空 `GOROOT`、`GOBIN` 等环境变量。

```bash
curl -sSL https://raw.githubusercontent.com/voidint/g/master/install.sh | bash
echo "unalias g" >> ~/.bashrc # 可选。若其他程序（如 'git'）使用了 'g' 作为别名。
source "$HOME/.g/env"
```
