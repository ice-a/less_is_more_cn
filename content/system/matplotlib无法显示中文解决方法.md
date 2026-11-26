---
title: Matplotlib 无法显示中文解决方法
description: "默认情况下图里的中文会显示成方框，原因是 Matplotlib 默认字体 DejaVu Sans 不含中文字形，文中给出两种解决办法。"
date: 2022-01-01
tags:
  - 基础与环境
  - Python
  - 图像处理
---
## 复现

```python
import matplotlib.pyplot as plt

plt.plot([1, 2, 3], [1, 4, 9])
plt.title("中文标题")
plt.show()
```

默认情况下图里的中文会显示成方框，原因是 Matplotlib 默认字体 DejaVu Sans 不含中文字形。

## 解决办法一：指定系统字体

```python
import matplotlib as mpl
import matplotlib.pyplot as plt

# 常见的中文字体,按系统实际情况调整
mpl.rcParams['font.sans-serif'] = ['SimHei', 'Microsoft YaHei', 'WenQuanYi Micro Hei']
# 负号显示成方块时加上这一行
mpl.rcParams['axes.unicode_minus'] = False

plt.plot([1, 2, 3], [1, 4, 9])
plt.title("中文标题")
plt.show()
```

## 解决办法二：用字体文件路径

字体文件路径不要写死成某台机器的绝对路径，用 `matplotlib.font_manager` 在系统里找一遍：

```python
import matplotlib.pyplot as plt
from matplotlib import font_manager

def pick_font(candidates):
    """按候选名列表找到第一个系统里可用的字体文件"""
    available = {f.name for f in font_manager.fontManager.ttflist}
    for name in candidates:
        if name in available:
            return font_manager.findfont(name)
    return None

font_path = pick_font(['SimHei', 'Microsoft YaHei', 'WenQuanYi Micro Hei', 'Noto Sans CJK SC'])
if font_path is None:
    raise RuntimeError("系统里没有找到中文字体，先安装一个或者把字体文件路径传进来")

font = font_manager.FontProperties(fname=font_path)

def create_image(save_path, text):
    fig = plt.figure(figsize=(10, 1.25))
    fig.text(0.5, 0.5, '{}'.format(text),
             horizontalalignment='center', verticalalignment='center', fontsize=15, fontproperties=font)
    plt.savefig(save_path)
    plt.close()

# 生成一张带中文文字的图片
create_image('chinese_text.png', '你好，世界')
```

如果项目里带了字体文件，直接用 `FontProperties(fname=r'你的字体路径.ttf')` 也可以，只是路径要跟着项目走，别写死到某台机器的目录。
