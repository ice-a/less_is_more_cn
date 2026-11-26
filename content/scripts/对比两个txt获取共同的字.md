---
title: 对比两个 TXT 获取共同的字
description: "对比两个 TXT 文件，找出两边都出现的字。"
date: 2023-01-01
tags:
  - 代码与脚本
  - Python
---
```python
import chardet

# 获取文件编码
def get_file_encode(file_path):
    """
    获取文件编码
    :param file_path: 文件路径
    :return: 文件编码
    """
    with open(file_path, 'rb') as f:
        return chardet.detect(f.read())['encoding']

# 获取文件内容
def get_file_content(file_path):
    """
    获取文件内容
    :param file_path: 文件路径
    :return: 文件内容
    """
    # 临时存储列表
    list_data = []
    with open(file_path, 'r', encoding=get_file_encode(file_path)) as f:
        for line in f.readlines():
            for word in line.replace("\n", ''):
                if word not in list_data:
                    list_data.append(word)
    return list_data

# 对比两个列表找到相同的值
def compare_list(list_1, list_2):
    """
    对比两个列表找到相同的值
    :param list_1: 列表1
    :param list_2: 列表2
    :return: 相同的值
    """
    list_3 = []
    for i in list_1:
        if i in list_2:
            list_3.append(i)
    return list_3

# 将列表数据写入到结果中
def write_result(list_data, save_result):
    """
    将列表数据写入到结果中
    :param list_data: 对比的列表文件
    :param save_result:保存结果
    """
    with open(save_result, 'a', encoding='utf-8') as f:  # 只打开一次文件，避免逐条开关 IO
        for word in list_data:
            f.write(word + "\n")

# 把下面的路径改成实际文件位置
txt1 = "随机汉字_1.txt"
txt2 = "随机汉字_2.txt"
save_txt = "结果.txt"

list_1 = get_file_content(txt1)
list_2 = get_file_content(txt2)
list_3 = compare_list(list_1, list_2)
write_result(list_3, save_txt)
```
