---
title: OpenClaw安装与Skills配置教程
---

# OpenClaw安装与Skills配置教程

## 一、OpenClaw 简介

OpenClaw 是一款开源的 AI 助手工具，支持通过 Skills 扩展功能，可实现网络搜索、邮件管理、文档摘要等多种能力，支持多平台部署。

## 二、前置要求

- **操作系统**：macOS / Linux / Windows（推荐使用 WSL2）

- **Node.js**：版本需 >= 22（一键安装脚本会自动安装）

- **API Key**：推荐使用 Anthropic (Claude)、OpenAI 格式的 Key，或支持 OpenRouter/DeepSeek 的 API Key

## 三、安装步骤

### 1. 一键安装（新手首选）

#### macOS / Linux

在终端执行以下命令：

```bash

curl -fsSL https://openclaw.ai/install.sh | bash
```

#### Windows

在 PowerShell（管理员模式）执行以下命令：

```powershell

iwr -useb https://openclaw.ai/install.ps1 | iex
```

> 注意：Windows 下若脚本执行报错，可执行以下命令安装为后台服务：
> 
> ```powershell
> 
> openclaw onboard --install-daemon
> ```
> 
> 

### 2. npm 全局安装（适合已装 Node.js 的用户）

打开终端直接执行：

```bash

npm install -g openclaw@latest
```

## 四、安装验证

安装完成后，执行以下命令查看版本，显示版本号即安装成功：

```bash

openclaw --version
```

## 五、配置 Skills

Skills 是 OpenClaw 的功能扩展模块，可通过命令行或可视化方式进行配置。

### 1. 命令行方式

#### 列出可用技能

```bash

openclaw skills list
```

#### 安装技能

```bash

openclaw skills install <skill-name>
```

#### 启用技能

```bash

openclaw skills enable <skill-name>
```

### 2. 可视化配置（新手友好）

1. 登录 OpenClaw 控制台，进入「配置中心」→「Skills 配置」页签

2. 在「新增 Skills」输入框中填写技能名称，点击「安装」按钮

3. 等待 3-5 秒，安装成功后将在技能列表中显示对应技能及版本号

4. 发送指令「更新一下你的技能列表」，让 AI 助手加载新安装的技能

### 3. 常用 Skills 推荐

- **网络搜索**：`web_search`，可搜索网络并总结结果

- **邮件管理**：`email`，实现邮件收发与管理

- **文档摘要**：`summarize-v8w3`，对 PDF、文档进行摘要处理

- **PDF 处理**：`pdf-processor`，实现 PDF 文件的读取与处理

- **编程辅助**：`coder-model`，提供编程相关的辅助能力

## 六、配置向导

安装完成后，配置向导会引导你完成以下关键设置：

1. **网关配置**：选择本地网关或远程网关连接

2. **认证配置**：输入你的 API Key

3. **通道配置**：可选择 Telegram/WhatsApp 等国外平台，或暂不配置后续再添加国内平台

4. **技能配置**：选择 Yes 启用基础技能

## 七、常见问题

1. **安装失败**：检查 Node.js 版本是否符合要求，或使用一键安装脚本自动配置环境

2. **技能无法加载**：确保技能安装成功后，发送指令更新技能列表

3. **API Key 配置错误**：检查 API Key 格式是否正确，是否支持对应的 AI 模型

## 八、参考文档

- [OpenClaw 官方文档](https://open-claw.me/zh/guide/getting-started)

- [OpenClaw 新手引导向导](https://docs.openclaw.ai/zh-CN/start/wizard)
> （注：文档部分内容可能由 AI 生成）