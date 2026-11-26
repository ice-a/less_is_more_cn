---
title: 使用 ChatGPT 将普通话转为粤语
description: "用 ChatGPT 把普通话文本转成粤语写法的实验记录。"
date: 2023-11-17
tags:
  - 代码与脚本
  - Python
  - AI
---
## 安装依赖
```bash
pip install openai loguru
```
## code

说明：原文使用的 `openai.ChatCompletion` 旧接口与示例中的 `oneapi.xty.app` 中转地址都可能已失效；下面改用新版 `openai.OpenAI` 客户端，Key 从环境变量读取。

```python
#!/usr/bin/env python3
# -*- coding: UTF-8 -*-
"""
@Project ：all_daily_tasks_code 
@File    ：使用chatgpt将普通话转为粤语.py
@Author  ：木子
@Date    ：2023/11/17 10:23 
"""
import os
import time
from datetime import datetime

import openai
from loguru import logger

# API Key 从环境变量读取，不要把 key 写进源码
#   export OPENAI_API_KEY=sk-xxxx
#   export OPENAI_BASE_URL=https://your-relay.example.com/v1   # 仅第三方中转时需要，直连官方可省略
client = openai.OpenAI(
    api_key=os.environ["OPENAI_API_KEY"],
    base_url=os.environ.get("OPENAI_BASE_URL") or "https://api.openai.com/v1",
)

# 通过输入文本判断问题类型dBfF6eC76df
is_more_retry = 0

def ask_info(text_question):
    global is_more_retry
    try:
        completion = client.chat.completions.create(model="gpt-3.5-turbo",
                                                   messages=[
                                                       {
                                                           "role": "system",
                                                           "content": "假设你是一名语言翻译专家，能够将普通话完美的翻译成粤语,不要繁体字，只输出简体字。"
                                                       },
                                                       {
                                                           "role": "user",
                                                           "content": text_question
                                                       }
                                                   ])
        openai_result_info = completion.choices[0].message.content
        is_more_retry = 0
        return openai_result_info
    except Exception as _e:
        is_more_retry += 1
        if "max" in str(_e) and "token" in str(_e):
            logger.error({"openai error": "ai", "error_message": str(_e), "error_msg": "max_token",
                          "is_more_retry": is_more_retry})
            return "token"
        if is_more_retry == 2:
            logger.error({"openai error": "ai", "error_message": str(_e), "is_more_retry": is_more_retry})
            is_more_retry = 0
            return "network"
        time.sleep(10)
        return ask_info(text_question)

# print(ask_info("将`我上次听说有新的高血压药物，是什么名称？`变成粤语"))
import pandas as pd

df = pd.read_excel("2.xlsx").fillna("")
dd = df.to_dict("records")
already_info = []
for item in dd:
    # print(item)
    _ = item.get("普通话文本", "")
    _text = f"将`{_}`变成粤语"
    result = ask_info(_text)
    print(_, ">>>", result)
    item["粤语文本"] = result
    already_info.append(item)
df = pd.DataFrame(already_info)
df.to_excel("3.xlsx", index=False)
```
