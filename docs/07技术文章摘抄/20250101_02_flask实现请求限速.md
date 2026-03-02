# flask实现请求限速

```python
from flask import *
from loguru import logger

app = Flask(__name__)
request_rate = {}
logger.add("log.log", rotation="10 MB", retention="10 days", enqueue=True)


# 限制每个ip每秒最多请求5次,超过返回429
@app.before_request
def before_request():
    global request_rate
    if request.remote_addr in request_rate:
        if request_rate[request.remote_addr] > 5:
            logger.warning(
                {"requeststimes": request_rate[request.remote_addr], "ip": request.remote_addr, "msg": "Too Many Requests"})
            request_rate[request.remote_addr] += 1
            return jsonify({'code': 429, 'msg': 'Too Many Requests'}), 429
        else:
            logger.info({"requeststimes": request_rate[request.remote_addr], "ip": request.remote_addr, "msg": "OK"})
            request_rate[request.remote_addr] += 1
    else:
        request_rate[request.remote_addr] = 1
        logger.info({"requeststimes": request_rate[request.remote_addr], "ip": request.remote_addr, "msg": "初次访问"})


@app.route('/')
def index():
    return 'Hello, World!'


if __name__ == '__main__':
    app.run(debug=False)
```

# 日志

```python
2025-06-10 13:56:20.565 | INFO     | falskdemo:before_request:32 - {'requeststimes': 1, 'ip': '127.0.0.1', 'msg': '初次访问'}
127.0.0.1 - - [10/Jun/2025 13:56:20] "GET / HTTP/1.1" 200 -
2025-06-10 13:56:20.674 | INFO     | falskdemo:before_request:28 - {'requeststimes': 1, 'ip': '127.0.0.1', 'msg': 'OK'}
127.0.0.1 - - [10/Jun/2025 13:56:20] "GET / HTTP/1.1" 200 -
2025-06-10 13:56:20.797 | INFO     | falskdemo:before_request:28 - {'requeststimes': 2, 'ip': '127.0.0.1', 'msg': 'OK'}
127.0.0.1 - - [10/Jun/2025 13:56:20] "GET / HTTP/1.1" 200 -
2025-06-10 13:56:20.909 | INFO     | falskdemo:before_request:28 - {'requeststimes': 3, 'ip': '127.0.0.1', 'msg': 'OK'}
127.0.0.1 - - [10/Jun/2025 13:56:20] "GET / HTTP/1.1" 200 -
2025-06-10 13:56:21.031 | INFO     | falskdemo:before_request:28 - {'requeststimes': 4, 'ip': '127.0.0.1', 'msg': 'OK'}
127.0.0.1 - - [10/Jun/2025 13:56:21] "GET / HTTP/1.1" 200 -
2025-06-10 13:56:21.157 | INFO     | falskdemo:before_request:28 - {'requeststimes': 5, 'ip': '127.0.0.1', 'msg': 'OK'}
127.0.0.1 - - [10/Jun/2025 13:56:21] "GET / HTTP/1.1" 200 -
2025-06-10 13:56:21.266 | WARNING  | falskdemo:before_request:23 - {'requeststimes': 6, 'ip': '127.0.0.1', 'msg': 'Too Many Requests'}
127.0.0.1 - - [10/Jun/2025 13:56:21] "GET / HTTP/1.1" 429 -
2025-06-10 13:56:21.362 | WARNING  | falskdemo:before_request:23 - {'requeststimes': 7, 'ip': '127.0.0.1', 'msg': 'Too Many Requests'}
127.0.0.1 - - [10/Jun/2025 13:56:21] "GET / HTTP/1.1" 429 -
2025-06-10 13:56:21.470 | WARNING  | falskdemo:before_request:23 - {'requeststimes': 8, 'ip': '127.0.0.1', 'msg': 'Too Many Requests'}
127.0.0.1 - - [10/Jun/2025 13:56:21] "GET / HTTP/1.1" 429 -
2025-06-10 13:56:21.595 | WARNING  | falskdemo:before_request:23 - {'requeststimes': 9, 'ip': '127.0.0.1', 'msg': 'Too Many Requests'}
127.0.0.1 - - [10/Jun/2025 13:56:21] "GET / HTTP/1.1" 429 -
```