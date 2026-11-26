---
title: 零基础 Web/App 逆向学习路径（含 AI 辅助）
description: "从零开始的爬虫与逆向学习路线：网络/前端基础、加密参数定位、AST 与补环境专题、Android/iOS 入门，以及用 AI 弥补代码能力的方法。"
date: 2026-03-02
tags:
  - 爬虫与逆向
  - 爬虫
  - 逆向工程
  - 加解密
  - AI
---
## 学习目标

从零基础到能独立还原常见 Web/App 接口的加密与签名逻辑：看懂混淆代码、定位加密入口、用 Frida 取证、用 Python 复现请求，并能借 AI 加速读代码和写脚本。

## 知识体系总览

```text
爬虫与逆向
├── 计算机与网络基础
│   ├── 操作系统、进制与编码
│   └── HTTP/HTTPS、Cookie/Session/JWT
├── 前端基础
│   ├── HTML/CSS/JavaScript、DOM/BOM
│   └── 原型链与执行上下文
├── 加密与安全
│   ├── 对称/非对称/哈希/HMAC
│   └── Web 漏洞与同源策略、CORS、CSP
├── 逆向技术
│   ├── 混淆识别与 AST 解混淆
│   ├── WebAssembly 分析
│   ├── 补环境与浏览器指纹
│   └── Frida 动态 Hook
└── 实战
    ├── 靶场与项目
    └── Android / iOS 入门
```

## 第零阶段：爬虫与网络基础（1-2 周）

- 网络爬虫是自动抓取网站数据的程序；常用语言 Python、JavaScript、Java，常用库 requests、BeautifulSoup、Scrapy、Selenium、lxml。
- 基本流程：发请求 → 解析 HTML/XML → 提取数据 → 存储（CSV/JSON/MySQL/MongoDB/对象存储）。
- 合规底线：遵守 robots.txt、控制频率、带 User-Agent、处理异常、尊重版权与使用条款。
- 反爬初识：代理 IP 池、随机延时、模拟浏览器行为、验证码、Cookie 管理（详见[反爬虫与风控](./反爬虫与风控.md)）。

## 第一阶段：Web 逆向入门（3-4 周）

- **HTTP 与 DevTools**：熟练用 Network 看 Fetch/XHR 的 Headers、Payload、Response；理解 UA、Cookie、Referer、Content-Type。
- **JS 阅读**：变量、函数、对象、JSON、控制流、时间戳处理；不要求会写框架，要求能读懂逻辑。
- **加密参数定位法**：Sources 搜 `encrypt`、`sign`、`token`、`md5`；对目标 URL 打 XHR 断点；沿 Call Stack 找到发起点。
- **AI 辅助**：把看不懂的 JS 整段贴给 AI，要求「逐行解释 + 给出等价 Python」；把 cURL 转成 requests。

## 第二阶段：安全与加密（1-2 个月）

- 对称：AES（ECB/CBC/CFB/OFB/GCM）、DES；非对称：RSA 密钥对与加解密流程；哈希：MD5/SHA1/SHA256、HMAC；编码：Base64、URL、Unicode。
- Web 安全：SQL 注入、XSS、CSRF、命令注入；同源策略、CORS、CSP、HTTPS/TLS。
- 实践：手撸一套 JS 版 AES/MD5，分析目标站的认证机制。

## 第三阶段：逆向技术核心（2-3 个月）

- 混淆类型：变量名、字符串加密、控制流平坦化、常量折叠、死代码、数组乱序、对象属性访问。
- AST 解混淆：Babel parser/traverse/types/generator 与插件编写，见专题 [AST 解混淆学习计划](./ast解混淆学习计划.md)。
- JavaScript 原型链：`prototype` / `__proto__` / `constructor`、继承与 Hidden Classes，见专题 [JavaScript 原型链大师级学习计划](./原型链学习计划.md)。
- 补环境：Recursive Proxy 框架、BOM/DOM 模拟、native toString 伪装，应对瑞数/Akamai/Cloudflare，见 [补环境完全指南](./补环境完全指南.md)。
- WASM：二进制格式、WABT/wasm2wat、IDA 分析导出函数。

## 第四阶段：移动端入门（3 周）

- **Android**：MuMu/Genymotion 模拟器；Charles/Fiddler 装 HTTPS 证书到系统根；jadx 反编译看伪 Java；Frida 概念 + 让 AI 直接生成 Hook 脚本（例如「Hook `javax.crypto.Cipher.doFinal`，打印输入输出的 Hex」）。
- **iOS（了解即可）**：与 Android 逻辑相通，差异在 Objective-C 与 ARM 汇编；看到 `MOV/LDR` 直接丢给 AI 要伪代码。完整路线见 [iOS 逆向开发](./ios逆向开发.md)。

## 第五阶段：实战提升（2-3 个月）

- 靶场：DVWA、SQLi-Labs、Upload-Labs、XSS-Labs、Pikachu、WebGoat、Hack The Box、TryHackMe。
- 项目：① 选定电商/社交媒体类站点还原签名并写采集器；② 验证码识别（数字/字母/滑块/点选）；③ 反爬突破（设备指纹、人机验证）。

## 第六阶段：高级进阶（2-3 个月）

- 高级 Hook：Frida spawn/attach、浏览器扩展注入、请求拦截。
- 协议：WebSocket 握手与帧、Protobuf 字段还原、自定义协议编解码。
- 综合项目：多参数加密 + 动态签名 + 会话保持；WebView 与 App 联动分析。

## 常用 AI 指令库（Prompt Library）

- 代码解释：「这段 JavaScript 经过混淆很难读，请帮我重命名变量让其可读，并解释核心加密逻辑。」
- 协议分析：「这是抓包得到的请求体，看着像 Base64 但解开是乱码，请分析可能用了什么加密或压缩方式？（附样本）」
- 脚本生成：「我已定位加密函数是 `get_token(timestamp, uid)`，请用 Python 帮我实现签名并构造合法请求。」

## 必备工具清单

浏览器 DevTools；抓包 Fiddler/Charles/Burp/mitmproxy；逆向 IDA/Ghidra/jadx/Frida/Radare2；开发 VS Code/Node.js/Python/Git。具体链接见[爬虫逆向工程师](./爬虫逆向工程师.md#一工具清单)。

## 推荐资源

- 书：《Web 前端黑客技术揭秘》《HTTP 权威指南》《JavaScript 高级程序设计》《密码学与网络安全》《逆向工程权威指南》。
- 在线：[MDN](https://developer.mozilla.org/)、[OWASP WSTG](https://owasp.org/www-project-web-security-testing-guide/)、[freeCodeCamp](https://www.freecodecamp.org/)、[TryHackMe](https://tryhackme.com/)、[Hack The Box](https://www.hackthebox.com/)。
- 社区：[吾爱破解](https://www.52pojie.cn/)、[FreeBuf](https://www.freebuf.com/)、[先知](https://xz.aliyun.com/)、[安全客](https://www.anquanke.com/)。

## 法律与伦理

仅在授权环境内测试，遵守《网络安全法》等法规，尊重知识产权与隐私。

## 技能评估标准

- 初级（3 个月）：懂 HTTP 与前端基础、常见加密原理，会用 DevTools，过 DVWA 基础关。
- 中级（6 个月）：能还原简单混淆、用 Frida 取证、写简单逆向脚本。
- 高级（12 个月）：能分析复杂加密与 WASM、突破进阶反爬、独立完成完整项目。

## 相关笔记

- [反爬虫与风控](./反爬虫与风控.md)
- [补环境完全指南](./补环境完全指南.md)
- [AST 解混淆学习计划](./ast解混淆学习计划.md)
- [JavaScript 原型链大师级学习计划](./原型链学习计划.md)
- [爬虫管理系统开发](./爬虫管理系统开发.md)
- [iOS 逆向开发](./ios逆向开发.md)
- [数据提取入门：XPath 与 CSS 选择器](../scripts/数据提取.md)
- [利用大模型解析 HTML 为 JSON](../ai/利用龙猫ai实现解析数据.md)
