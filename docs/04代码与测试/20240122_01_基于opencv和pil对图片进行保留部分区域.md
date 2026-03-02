```python
#!/usr/bin/env python3
# -*- coding: UTF-8 -*-
"""
@Project ：all_daily_tasks_code 
@File    ：制定区域外雾化.py
@Author  ：木子
@Date    ：2024/1/22 11:23
"""
import json
import os
from PIL import Image, ImageDraw

import cv2
import numpy as np


def cv_imread(file_path):
    cv_img = cv2.imdecode(np.fromfile(file_path, dtype=np.uint8), -1)
    return cv_img


# 添加cv2保存支持中文路径
def cv_im_write(savePath, tem):
    cv2.imencode('.png', tem)[1].tofile(savePath)


def change_black_to_transparent(image_path, output_path):
    # 读取图片
    image = cv_imread(image_path)

    # 将图片从BGR格式转换为RGBA格式，添加alpha通道
    rgba_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGBA)

    # 创建一个mask，初始化为全0（透明）
    mask = np.zeros(rgba_image.shape[:2], dtype=np.uint8)

    # 将黑色像素（BGR中的B和G值都接近0）对应的mask位置设置为255（不透明）
    # 这里假设黑色在BGR空间中的B和G值都小于10
    mask[(rgba_image[:, :, 0] < 10) & (rgba_image[:, :, 1] < 10)] = 255

    # 将mask应用到alpha通道
    rgba_image[:, :, 3] = mask

    # 保存图片为PNG格式以保留透明度
    cv_im_write(output_path, rgba_image)


# 调用函数
# change_black_to_transparent('input_image.png', 'output_image.png')
def change_black_to_white(image_path, output_path):
    image = Image.open(image_path)
    width, height = image.size
    for x in range(width):
        for y in range(height):
            pixel = image.getpixel((x, y))
            if pixel == (0, 0, 0):
                image.putpixel((x, y), (230, 230, 230))
    image.save(output_path)


def crop_img_from_source_img(source_img, out_put_img, polygon_points):
    image1 = Image.open(source_img)
    image2 = Image.new('RGB', (image1.size), (255, 255, 255))
    mask = Image.new("L", image1.size, 0)
    draw = ImageDraw.Draw(mask)
    for polygon_point in polygon_points:
        draw.polygon(polygon_point, fill=255)
    cropped_image = Image.new("RGB", image1.size)
    cropped_image.paste(image1, mask=mask)
    image2.paste(cropped_image, (0, 0))
    # 保存结果图片
    image2.save(out_put_img)
    # change_black_to_white(out_put_img, out_put_img)
    change_black_to_transparent(out_put_img, out_put_img)
    change_black_to_white(out_put_img, out_put_img)


# pillowtodo
def pil_todo(img_path, points, _dst):
    image = Image.open(img_path)
    # 创建一个新的白色背景图像，尺寸与原始图像相同
    white_background = Image.new('RGB', image.size, (255, 255, 255))

    # 定义多个矩形区域的坐标和大小
    # 每个矩形由 (left, upper, right, lower) 表示
    # rects = [
    #     (left1, upper1, right1, lower1),
    #     (left2, upper2, right2, lower2),
    #     # ... 更多矩形
    # ]

    # 对于每个矩形，使用Image.paste方法将其粘贴到白色背景上
    for left, upper, right, lower in points:
        # 计算矩形区域的大小
        width, height = right - left, lower - upper
        # 创建一个临时的图像区域
        region = Image.new('RGB', (width, height), (255, 255, 255))
        # 将原始图像的对应区域复制到临时图像中
        region.paste(image.crop((left, upper, right, lower)), (0, 0))
        # 将临时图像粘贴到白色背景的对应位置上
        white_background.paste(region, (left, upper))
    white_background.save(_dst)


# cv处理
def cv_to_fill_color(img_path, rectangles, output_path):
    import cv2
    import numpy as np

    # 读取图像
    image = cv_imread(img_path)  # 替换为你的图片路径
    if image.dtype != np.uint8:
        image = cv2.convertScaleAbs(image)
    # 定义多个矩形区域的坐标和大小
    # 每个矩形由 (x, y, width, height) 表示
    # rectangles = [
    #     (x1, y1, width1, height1),
    #     (x2, y2, width2, height2),
    #     # ... 更多矩形
    # ]

    # 创建一个与原始图像大小相同的全白图像
    white_image = np.ones(image.shape, dtype=np.uint8) * 255

    # 对于每个矩形，绘制填充的矩形
    for rect in rectangles:
        print(rect)
        # 解包矩形坐标和大小
        x, y, w, h = rect
        # 绘制填充矩形
        cv2.rectangle(white_image, (x, y), (x + w, y + h), (255, 255, 255), cv2.FILLED)

    # 创建一个与原始图像大小相同的全黑图像作为掩码
    mask = np.zeros(image.shape, dtype=np.uint8)
    if mask is not None and mask.shape != image.shape:
        mask = cv2.resize(mask, (image.shape[1], image.shape[0]))
    # 对于每个矩形，使用掩码绘制原始图像中的区域
    for rect in rectangles:
        print(rect)
        # 解包矩形坐标和大小
        x, y, w, h = rect
        # 绘制矩形区域
        cv2.rectangle(mask, (x, y), (x + w, y + h), (255, 255, 255), cv2.FILLED)

    # 使用按位与操作保留原始图像中的矩形区域
    result = cv2.bitwise_and(image, image, mask=mask)

    # 将原始图像与全白图像进行按位或操作，以将背景设置为白色
    result = cv2.bitwise_or(result, white_image)

    # 保存或显示结果图像
    # cv2.imshow('Result', result)
    # cv2.waitKey(0)
    # cv2.destroyAllWindows()
    cv_im_write(output_path, result)
    # 如果需要保存图像
    # cv2.imwrite('result.jpg', result)


# 标注数据存放路径 json文件和jpg图片文件
path = r"C:\Users\DM\Desktop\test\a\01"
# 保存文件
save_dir = r"C:\Users\DM\Desktop\test\a\03"

for item in os.listdir(path):
    t = os.path.join(path, item)
    if t.split(".")[-1] == "json":
        with open(t, "r", encoding="utf-8") as f:
            file_data = json.loads(f.read())
        shapes = file_data.get("shapes")
        points = []
        for it in shapes:
            _point = it.get("points")
            _label = it.get("label")
            if "$" not in _label:
                continue
            temp_list = []
            print(_point)
            polygon_points = np.array(_point, np.int32)

            # 使用cv2.boundingRect计算多边形的外接矩形框
            x, y, w, h = cv2.boundingRect(polygon_points)
            print("boundingRect", x, y, w, h)
            points.append((x, y, x + w, y + h))
        img_path = t.replace(".json", ".png")
        _dst = t.replace(path, save_dir).replace(".json", ".png")
        pil_todo(img_path, points, _dst)

```
