---
title: OpenCV 与 Pillow 图片处理
description: "图片与视频批处理脚本合集：多图拼接、透明背景转白、EXIF 方向校正、按目标体积压缩、区域保留裁剪、MD5 去重与视频时长统计。"
date: 2023-01-01
category: 代码与脚本
tags:
  - 代码与脚本
  - Python
  - 图像处理
  - OpenCV
order: 5
---

## 通用的中文路径读写

OpenCV 的 `imread/imwrite` 不支持中文路径，统一用 `imdecode/imencode` 包一层：

```python
import os

import cv2
import numpy as np


def cv_imread(file_path):
    return cv2.imdecode(np.fromfile(file_path, dtype=np.uint8), -1)


def cv_imwrite(save_path, img):
    ext = os.path.splitext(save_path)[1] or ".png"
    cv2.imencode(ext, img)[1].tofile(save_path)
```

## 多张图片拼接并叠加文字

原片段是「原图 + 加文字副本」横向拼接，补上保存与批量入口：

```python
import cv2 as cv
import numpy as np

src = cv.imread("test.jpg")
text = "You are so beautiful!"
add_text = src.copy()
cv.putText(add_text, text, (200, 100), cv.FONT_HERSHEY_COMPLEX, 2.0, (100, 200, 100), 5)
res = np.hstack([src, add_text])
cv.imwrite("merged.jpg", res)
cv.imshow("text", res)
cv.waitKey()
cv.destroyAllWindows()
```

纵向拼长图（先统一宽度再 `vstack`）：

```python
paths = ["1.jpg", "2.jpg", "3.jpg"]
width = 800
imgs = [cv.imread(p) for p in paths]
imgs = [cv.resize(i, (width, int(i.shape[0] * width / i.shape[1]))) for i in imgs]
cv.imwrite("long.jpg", np.vstack(imgs))
```

## 透明背景转白色背景

原实现两层 `for` 逐像素，且 `width=sp[0]`、`height=sp[1]` 与 `img[xw, yh]` 的取序写反。改为按 alpha 合成到白底：

```python
import cv2
import numpy as np

img = cv_imread("input.png")
if img.ndim == 3 and img.shape[2] == 4:
    alpha = img[:, :, 3:4] / 255.0
    rgb = img[:, :, :3].astype(np.float32)
    out = (rgb * alpha + 255.0 * (1 - alpha)).astype(np.uint8)
    cv_imwrite("input_white.png", out)
else:
    cv_imwrite("input_white.png", img)  # 无 alpha，原样输出
```

## 根据 EXIF 信息摆正图片

原代码 `except` 分支引用了函数内不存在的 `_save`、`i`，会二次抛 `NameError`。Pillow 已内置 `ImageOps.exif_transpose`：

```python
import os

from PIL import Image, ImageOps

src_dir = r"输入目录"
dst_dir = r"输出目录"

for name in os.listdir(src_dir):
    in_file = os.path.join(src_dir, name)
    out_file = os.path.join(dst_dir, name)
    try:
        img = Image.open(in_file)
        img = ImageOps.exif_transpose(img)  # 按 EXIF Orientation(274) 自动摆正
        img.save(out_file)
    except Exception as e:
        print("error:", in_file, e)
```

手写映射（没有 `ImageOps` 时）：Orientation 1=不旋转、3=180°、6=顺时针 90°、8=逆时针 90°，用 `img.rotate(angle, expand=True)`。

## 图片压缩到目标体积

```python
import os
from multiprocessing.pool import ThreadPool

from PIL import Image


def get_size(file):
    return os.path.getsize(file) / 1024  # KB


def compress_image(infile, outfile="", mb=500, step=10, quality=80):
    """不改变尺寸，把图片压到 mb KB 以内"""
    if outfile and os.path.exists(outfile):
        return outfile, get_size(outfile)
    o_size = get_size(infile)
    if o_size <= mb:
        return infile, o_size
    if not outfile:
        root, suffix = os.path.splitext(infile)
        outfile = f"{root}-out{suffix}"
    while o_size > mb and quality > 0:
        Image.open(infile).save(outfile, quality=quality)
        quality -= step
        o_size = get_size(outfile)
    return outfile, get_size(outfile)


if __name__ == "__main__":
    input_dir, output_dir = r"输入目录", r"输出目录"
    pool = ThreadPool(4)
    for name in os.listdir(input_dir):
        pool.apply_async(
            compress_image,
            args=(os.path.join(input_dir, name), os.path.join(output_dir, name)),
        )
    pool.close()
    pool.join()
```

## 只保留指定区域

PIL 版（`points` 为 `(left, upper, right, lower)` 列表）：

```python
from PIL import Image


def pil_keep_regions(img_path, points, dst):
    image = Image.open(img_path)
    white = Image.new("RGB", image.size, (255, 255, 255))
    for left, upper, right, lower in points:
        white.paste(image.crop((left, upper, right, lower)), (left, upper))
    white.save(dst)
```

OpenCV 版（`rectangles` 为 `(x, y, w, h)` 列表，区域外填白）：

```python
import cv2
import numpy as np


def cv_keep_regions(img_path, rectangles, dst):
    image = cv_imread(img_path)
    if image.dtype != np.uint8:
        image = cv2.convertScaleAbs(image)
    mask = np.zeros(image.shape[:2], dtype=np.uint8)
    for x, y, w, h in rectangles:
        cv2.rectangle(mask, (x, y), (x + w, y + h), 255, cv2.FILLED)
    kept = cv2.bitwise_and(image, image, mask=mask)
    white = np.full_like(image, 255)
    out = cv2.bitwise_or(kept, cv2.bitwise_and(white, white, mask=cv2.bitwise_not(mask)))
    cv_imwrite(dst, out)
```

调用入口（JSON 标注 → 外接矩形 → PIL 裁剪）：

```python
import json
import os

import cv2
import numpy as np

path = r"标注目录"  # json 与同名 png 放在一起
save_dir = r"输出目录"

for item in os.listdir(path):
    if not item.endswith(".json"):
        continue
    with open(os.path.join(path, item), "r", encoding="utf-8") as f:
        shapes = json.load(f).get("shapes", [])
    points = []
    for it in shapes:
        label = it.get("label", "")
        if "$" not in label:
            continue
        x, y, w, h = cv2.boundingRect(np.array(it["points"], np.int32))
        points.append((x, y, x + w, y + h))
    stem = item[:-5]
    pil_keep_regions(os.path.join(path, stem + ".png"), points, os.path.join(save_dir, stem + ".png"))
```

## 根据 MD5 去重

原实现把整个文件读进内存，且不过滤目录。改为流式哈希 + 可选删除：

```python
import hashlib
import os


def md5_of(file_path, chunk=1 << 20):
    h = hashlib.md5()
    with open(file_path, "rb") as f:
        for block in iter(lambda: f.read(chunk), b""):
            h.update(block)
    return h.hexdigest()


def dedupe(folder, delete=False):
    seen = {}
    for root, _, files in os.walk(folder):
        for name in files:
            p = os.path.join(root, name)
            digest = md5_of(p)
            if digest in seen:
                print("重复:", p, "==", seen[digest])
                if delete:
                    os.remove(p)
            else:
                seen[digest] = p


if __name__ == "__main__":
    dedupe(r"图片目录", delete=False)
```

## 统计视频时长

原实现用魔法数字 `get(5)/get(7)` 且不释放 `VideoCapture`：

```python
import os

import cv2

VIDEO_SUFFIX = (".mp4", ".avi", ".3gp")


def count_video_duration(file_path):
    cap = cv2.VideoCapture(file_path)
    if not cap.isOpened():
        return 0
    fps = cap.get(cv2.CAP_PROP_FPS)
    frames = cap.get(cv2.CAP_PROP_FRAME_COUNT)
    cap.release()
    return int(frames / fps) if fps else 0


def count_folder_duration(folder):
    total = 0
    for root, _, files in os.walk(folder):
        for name in files:
            if name.lower().endswith(VIDEO_SUFFIX):
                duration = count_video_duration(os.path.join(root, name))
                total += duration
                print(os.path.join(root, name), duration)
    return total


if __name__ == "__main__":
    print(count_folder_duration(r"视频目录"))
```
