# redis

```
1.docker
docker run -p 6379:6379 -it --rm redis/redis-stack-server:latest
2.手动编译
git clone --recursive https://github.com/RedisBloom/RedisBloom.git
cd RedisBloom
./sbin/setup
make
在redis配置文件中添加
loadmodule /path/to/redisbloom.so
然后启动
redis-server redis.conf
```

# 测试代码

```python
import os
from loguru import logger  # 日志相关
import redis


# -------------------------


def test_get_key():
    # 随机从26个字母中选择5个字母
    import random
    import string
    letters = string.ascii_lowercase
    random_letters = ''.join(random.choice(letters) for i in range(2))
    # logger.info("random_letters:{}".format(random_letters))
    return random_letters


# 获取ip
host = os.getenv('REDIS_URL', 'localhost')
# 获取端口
port = os.getenv('REDIS_PORT', 6379)
# 获取密码
password = os.getenv('REDIS_PASSWORD', '')
# 获取db
db = os.getenv('REDIS_DB', 0)
# 创建布隆过滤器
filter_name = os.getenv('REDIS_FILTER_NAME', 'test_filter')
# 错误率
error_rate = os.getenv('REDIS_ERROR_RATE', 0.01)
# 预计插入的元素数量
capacity = os.getenv('REDIS_CAPACITY', 10000)

logger.info(f"redis: {host}:{port}")
logger.info(f"config:过滤器名字{filter_name}错误率{error_rate}预计数量{capacity}")
# 连接到 Redis
r = redis.Redis(host=host, port=port, password=password, db=db, decode_responses=True).bf()

try:
    r.reserve(filter_name, error_rate, capacity)
except Exception as e:
    logger.error(f"过滤器已经存在:{e}")

# 随机添加100个
for i in range(100):
    r.add(filter_name, test_get_key())
# 随机生成100个看是否存在
for i in range(100):
    key = test_get_key()
    if r.exists(filter_name, key):
        logger.info(f"key:{key}存在", key)
    else:
        logger.info(f"key:{key}不存在", key)

# 批量生成100个
keys = [test_get_key() for i in range(100)]
# 批量添加
# r.madd(filter_name, *keys)
# 批量检查
print(r.mexists(filter_name, *keys))
```