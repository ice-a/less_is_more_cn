---
title: Ubuntu 安装 Node.js 版本过低问题
description: "解决 Ubuntu 上 Node.js 版本过低的问题：用 NodeSource 安装新版本，或用 nvm 管理多个版本。"
date: 2022-01-01
category: 基础与环境
tags:
  - 基础与环境
  - Node.js
  - Git
  - Linux
order: 2
---

## 卸载

### 卸载低版本的

```bash
sudo apt remove nodejs
sudo apt remove npm
# 删除残留文件
cd /usr/local/lib  -> 删除所有node和node_modules文件
cd /usr/local/include -> 删除所有node和node_modules文件
cd /usr/local/bin -> 删除所有node和node_modules文件
```

## 安装

### 方法 1

```bash
# 安装git和curl，如果已经安装过，可以跳过
sudo apt install git curl
#  安装nodejs
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
# 查看版本
node -v
npm -v
```

### 方法 2

#### nvm 安装管理版本

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.7/install.sh | bash
#或者
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.7/install.sh | bash
# 添加环境变量
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
#安装
nvm install --lts  # 最新稳定版本
nvm install 22.23.5  # 指定版本
nvm use 22.23.5  # 切换版本
nvm ls  # 查看已安装的版本
nvm current  # 查看当前使用的版本
nvm alias default 22.23.5  # 设置默认版本
nvm uninstall 22.23.5  # 卸载指定版本
```