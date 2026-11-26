---
title: 获取 JSON 中最深处的一个 value
description: "从嵌套 JSON 中取出最深处的一个 value 的写法。"
date: 2023-01-01
tags:
  - 代码与脚本
  - Python
---
```python
import json
import time

DATA_FILE = r"data.json"  # JSON 文件路径，按需修改

# 统计耗时
def count_running(f):
    def inner(*arg, **kwarg):
        s_time = time.time()
        res = f(*arg, **kwarg)
        e_time = time.time()
        print('耗时：{}秒'.format(e_time - s_time))
        return res

    return inner

# 返回最深处的一个 value（第一次遇到的叶子）
@count_running
def recursion_get_value(dict_data):
    deepest = {"depth": -1, "value": None}

    def walk(node, depth):
        if isinstance(node, dict):
            for value in node.values():
                walk(value, depth + 1)
        elif depth > deepest["depth"]:
            deepest["depth"] = depth
            deepest["value"] = node

    walk(dict_data, 0)
    return deepest["value"]

if __name__ == "__main__":
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)
    print("最深处的一个 value:", recursion_get_value(data))
```
