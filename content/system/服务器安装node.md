---
title: 服务器安装 Node.js
description: "在服务器上安装 Node.js：用 nvm 管理版本并配置环境变量。"
date: 2022-01-01
tags:
  - 工具与配置
  - Node.js
  - Git
---
## 下载 nvm
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.7/install.sh | bash
```
## 设置环境变量
```bash
对上边输出的结果一行执行一条
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```
## 安装最新 lts 版本
```bash
nvm install --lts
```
## 查看 node 和 npm 版本
```bash
node -v
npm -v
```
