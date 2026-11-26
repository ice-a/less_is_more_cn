---
title: Flask 实现请求限速
description: "用 Flask 实现接口限速，控制单位时间内的请求次数。"
date: 2025-01-01
tags:
  - 代码与脚本
  - Python
  - 性能优化
  - Web 开发
---
## flask 实现请求限速

```python
from collections import defaultdict, deque
from time import time

from flask import Flask, jsonify, request
from loguru import logger

app = Flask(__name__)
logger.add("log.log", rotation="10 MB", retention="10 days", enqueue=True)

# 每个 IP 在 1 秒窗口内最多 5 次，超过返回 429
RATE_LIMIT = 5
WINDOW_SECONDS = 1
request_rate = defaultdict(deque)

@app.before_request
def before_request():
    ip = request.remote_addr
    now = time()
    calls = request_rate[ip]
    # 丢弃窗口外的历史记录，字典不会无限增长
    while calls and calls[0] <= now - WINDOW_SECONDS:
        calls.popleft()

    if len(calls) >= RATE_LIMIT:
        logger.warning({"requeststimes": len(calls), "ip": ip, "msg": "Too Many Requests"})
        return jsonify({'code': 429, 'msg': 'Too Many Requests'}), 429

    calls.append(now)
    logger.info({"requeststimes": len(calls), "ip": ip, "msg": "OK"})

@app.route('/')
def index():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=False)
```

## 日志

```text
2025-06-10 13:56:20.565 | INFO     | flaskdemo:before_request:32 - {'requeststimes': 1, 'ip': '127.0.0.1', 'msg': '初次访问'}
127.0.0.1 - - [10/Jun/2025 13:56:20] "GET / HTTP/1.1" 200 -
2025-06-10 13:56:20.674 | INFO     | flaskdemo:before_request:28 - {'requeststimes': 1, 'ip': '127.0.0.1', 'msg': 'OK'}
127.0.0.1 - - [10/Jun/2025 13:56:20] "GET / HTTP/1.1" 200 -
2025-06-10 13:56:20.797 | INFO     | flaskdemo:before_request:28 - {'requeststimes': 2, 'ip': '127.0.0.1', 'msg': 'OK'}
127.0.0.1 - - [10/Jun/2025 13:56:20] "GET / HTTP/1.1" 200 -
2025-06-10 13:56:20.909 | INFO     | flaskdemo:before_request:28 - {'requeststimes': 3, 'ip': '127.0.0.1', 'msg': 'OK'}
127.0.0.1 - - [10/Jun/2025 13:56:20] "GET / HTTP/1.1" 200 -
2025-06-10 13:56:21.031 | INFO     | flaskdemo:before_request:28 - {'requeststimes': 4, 'ip': '127.0.0.1', 'msg': 'OK'}
127.0.0.1 - - [10/Jun/2025 13:56:21] "GET / HTTP/1.1" 200 -
2025-06-10 13:56:21.157 | INFO     | flaskdemo:before_request:28 - {'requeststimes': 5, 'ip': '127.0.0.1', 'msg': 'OK'}
127.0.0.1 - - [10/Jun/2025 13:56:21] "GET / HTTP/1.1" 200 -
2025-06-10 13:56:21.266 | WARNING  | flaskdemo:before_request:23 - {'requeststimes': 6, 'ip': '127.0.0.1', 'msg': 'Too Many Requests'}
127.0.0.1 - - [10/Jun/2025 13:56:21] "GET / HTTP/1.1" 429 -
2025-06-10 13:56:21.362 | WARNING  | flaskdemo:before_request:23 - {'requeststimes': 7, 'ip': '127.0.0.1', 'msg': 'Too Many Requests'}
127.0.0.1 - - [10/Jun/2025 13:56:21] "GET / HTTP/1.1" 429 -
2025-06-10 13:56:21.470 | WARNING  | flaskdemo:before_request:23 - {'requeststimes': 8, 'ip': '127.0.0.1', 'msg': 'Too Many Requests'}
127.0.0.1 - - [10/Jun/2025 13:56:21] "GET / HTTP/1.1" 429 -
2025-06-10 13:56:21.595 | WARNING  | flaskdemo:before_request:23 - {'requeststimes': 9, 'ip': '127.0.0.1', 'msg': 'Too Many Requests'}
127.0.0.1 - - [10/Jun/2025 13:56:21] "GET / HTTP/1.1" 429 -
```
