---
title: OpenClaw 安装、Skills 与 MCP 联调指南
description: "OpenClaw 开源 AI 助手：一键安装、Skills 配置、MCP 接入与联调排错。"
date: 2026-03-02
category: 工具与配置
tags:
  - 工具与配置
  - Node.js
  - AI
  - Linux
order: 21
---

## 一、OpenClaw 简介

OpenClaw 是一款开源的 AI 助手框架，负责消息路由与 UI，通过 Skills 扩展能力（网络搜索、邮件管理、文档摘要等），支持 macOS / Linux / Windows（推荐 WSL2），可本地或云端部署。

## 二、前置要求

- **操作系统**：macOS / Linux / Windows（推荐使用 WSL2）
- **Node.js**：版本需 ≥ 22，pnpm ≥ 9（一键安装脚本会自动安装 Node）
- **API Key**：Anthropic（Claude）/ OpenAI 格式，或 OpenRouter / DeepSeek 的 Key，放到 `.env.local` 或系统环境变量中，不要写进仓库

## 三、安装

### 一键安装（新手首选）

```bash
# macOS / Linux
curl -fsSL https://openclaw.ai/install.sh | bash
```

```powershell
# Windows（管理员 PowerShell）
iwr -useb https://openclaw.ai/install.ps1 | iex
# 脚本报错时改为安装后台服务
openclaw onboard --install-daemon
```

### npm 全局安装

适合已经装好 Node.js 的环境：

```bash
npm install -g openclaw@latest
```

### 已有环境更新

拉取代码后重跑依赖安装；升级 Node 版本后执行 `pnpm install --frozen-lockfile`，避免二进制缓存失配。建议前期用本地前台模式，联调通过后再改成 systemd / pm2 常驻。

## 四、安装验证与健康检查

```bash
openclaw --version
openclaw doctor
```

显示版本号且 doctor 无红色报错即视为正常。

## 五、配置 Skills

Skills 是 OpenClaw 的功能扩展模块，可通过命令行或可视化方式配置。

### 目录规范

每个技能一个文件夹 `$CODEX_HOME/skills/<name>/SKILL.md`，在 SKILL.md 里描述触发条件、输入输出与安全注意事项；需要脚本时放 `scripts/`，引用资料放 `references/`。命名用「领域+用途」（如 `figma-export`、`openai-docs`），避免空格与大写。

### 命令行方式

```bash
openclaw skills list                    # 列出可用技能
openclaw skills install "<skill-name>"  # 安装技能
openclaw skills enable "<skill-name>"   # 启用技能
```

### 可视化配置（新手友好）

1. 登录 OpenClaw 控制台，进入「配置中心」→「Skills 配置」页签
2. 在「新增 Skills」输入框中填写技能名称，点击「安装」
3. 等待 3-5 秒，安装成功后会显示对应技能及版本号
4. 发送指令「更新一下你的技能列表」，让助手加载新安装的技能

### 常用 Skills 推荐

- **网络搜索**：`web_search`，搜索网络并总结结果
- **邮件管理**：`email`，实现邮件收发与管理
- **文档摘要**：`summarize-v8w3`，对 PDF、文档做摘要
- **PDF 处理**：`pdf-processor`，读取与处理 PDF
- **编程辅助**：`coder-model`，提供编程相关的辅助能力

### Skills 测试与版本控制

- 干跑（Dry-run）：按 SKILL.md 里的触发规则在对话中刻意触发，确认上下文加载正常
- 依赖外部文件/数据库的技能，先在本地填好示例配置，避免线上缺参
- SKILL.md 与脚本同提交；密钥、cookie、token 一律走环境变量，禁止入库

## 六、配置向导

安装完成后，向导会引导完成关键设置：

1. **网关配置**：选择本地网关或远程网关连接
2. **认证配置**：输入 API Key
3. **通道配置**：可选 Telegram / WhatsApp 等平台，也可先跳过
4. **技能配置**：选择 Yes 启用基础技能

## 七、MCP 接入步骤

MCP（Model Context Protocol）用于把外部系统（设计、监控、私有 API 等）安全接入助手。

1. **确定服务信息**：MCP 服务器地址、认证方式（API Key / Bearer / Basic）、可调用的资源或函数名
2. **配置客户端**：按服务器 README 填入 `mcp.json` 或项目配置的 `mcp.servers[]`，逐项填写 `name`、`url`、`auth`、超时
3. **健康检查**：用 curl / httpie 对 `/health` 或 `/version` 探活，确认证书与跨域没问题
4. **限流与重试**：为高延迟接口显式设置超时，重试 3 次指数退避，避免阻塞对话线程
5. **安全隔离**：有副作用的接口（写库、发消息）默认关闭自动调用，确认后手动触发，必要时加白名单

## 八、联调顺序

1. 启动 OpenClaw，打开前端控制台确认无红色报错
2. 触发一个现有技能（如 `$openai-docs`）验证技能加载成功
3. 启用一个 MCP 服务器，调用最简单的只读方法（`ping` / `list`）
4. 组合技能与 MCP：技能取数，再把结果交给模型总结
5. 记录耗时与失败率，单次超过 3 秒或错误率超过 5% 就调优（缓存、并行、缩减上下文）

## 九、常见问题速查

- **安装失败**：检查 Node.js 版本是否达标，或改用一键安装脚本
- **技能无法加载**：安装成功后发送「更新一下你的技能列表」
- **API Key 配置错误**：核对 Key 格式与支持的模型供应商
- **模型 401/403**：环境变量名与所选供应商是否匹配、所在区域能否直连
- **MCP 连接超时**：端口是否暴露、TLS 证书是否合法，可临时用本地 hosts 绑定测试
- **技能未触发**：核对 SKILL.md 的触发词，或在对话中明确说出技能名
- **前端报 CORS**：MCP 服务端补 `Access-Control-Allow-Origin` 等响应头

## 十、后续维护

- 每次升级 Node / pnpm 后，先跑健康检查再上线
- 新增技能或 MCP 时同步记录到仓库，避免出现无人了解的「暗技能」
- 每月做一次依赖安全扫描与密钥轮换

## 十一、参考文档

- [OpenClaw 官方文档](https://open-claw.me/zh/guide/getting-started)
- [OpenClaw 新手引导向导](https://docs.openclaw.ai/zh-CN/start/wizard)
