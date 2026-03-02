```python
import random
import os
import time
import shutil
import math
import cv2
import cv2
import matplotlib.pyplot as plt
# 图片扭曲
from PIL import Image, ImageFilter
from PIL import Image, ImageFilter, ImageEnhance,ImageDraw, ImageFont, ImageFilter
from uuid import uuid4
from ultralytics import YOLO


def load_characters_from_file(char_file):
    """从文本文件加载字符集"""
    if not os.path.exists(char_file):
        raise ValueError(f"字符文件不存在: {char_file}")

    with open(char_file, "r", encoding="utf-8") as f:
        # 读取文件内容并去除空格和换行符
        content = f.read().replace(" ", "").replace("\n", "")

    # 确保字符集不重复
    characters = list(set(content))

    # 添加大小写字母和数字
    digits = [str(i) for i in range(10)]
    letters = [chr(i) for i in range(65, 91)]  # 大写字母 A-Z
    letters += [chr(i) for i in range(97, 123)]  # 小写字母 a-z

    _all_chars = characters + digits + letters
    return _all_chars


all_chars = load_characters_from_file("common_chars.txt")
# 创建字符到类别的映射
char_to_class = {char: i for i, char in enumerate(sorted(set(all_chars)))}


def apply_diverse_distortion(img, size):
    """
    应用多样化的图像扭曲，同时确保文字清晰可识别

    参数:
    img: 输入的PIL图像对象
    size: 图像尺寸元组 (width, height)

    返回:
    扭曲后的PIL图像
    """
    # 增强文字对比度，提高识别率
    enhancer = ImageEnhance.Contrast(img)
    img = enhancer.enhance(1.5)  # 增加对比度

    # 随机选择一种扭曲类型（减少极端扭曲的概率）
    distortion_type = random.choices(
        ["perspective", "shear", "noise"],
        weights=[3, 3, 3],  # 透视和波浪更常见，其他较少
    )[0]

    if distortion_type == "perspective":
        # 透视扭曲 - 保持轻微的水平和垂直变换
        params = [
            1 - float(random.randint(1, 3)) / 300,  # 水平缩放
            float(random.randint(-2, 2)) / 300,  # 水平剪切
            float(random.randint(-1, 1)) / 300,  # 垂直剪切
            float(random.randint(-1, 1)) / 300,  # 水平倾斜
            1 - float(random.randint(1, 3)) / 300,  # 垂直缩放
            float(random.randint(1, 2)) / 2000,  # 水平透视
            0.0003,  # 扭曲强度
            float(random.randint(1, 2)) / 2000,  # 垂直透视
        ]
        img = img.transform(size, Image.PERSPECTIVE, params, resample=Image.BICUBIC)

    elif distortion_type == "wave":
        # 波浪扭曲 - 轻微的水平波浪，确保文字不会重叠
        wave_amplitude = random.randint(1, 2)  # 更小的振幅
        wave_frequency = random.uniform(0.01, 0.02)  # 更低的频率

        mesh = []
        grid_size = 15  # 更大的网格，减少局部变形

        for x in range(0, size[0], grid_size):
            for y in range(0, size[1], grid_size):
                box = (x, y, x + grid_size, y + grid_size)

                x0, y0 = x, y
                x1, y1 = x + grid_size, y
                x2, y2 = x + grid_size, y + grid_size
                x3, y3 = x, y + grid_size

                # 只在水平方向应用波浪变形
                x0 += wave_amplitude * math.sin(y0 * wave_frequency)
                x1 += wave_amplitude * math.sin(y1 * wave_frequency)
                x2 += wave_amplitude * math.sin(y2 * wave_frequency)
                x3 += wave_amplitude * math.sin(y3 * wave_frequency)

                quad = (x0, y0, x1, y1, x2, y2, x3, y3)
                mesh.append((box, quad))

        img = img.transform(size, Image.MESH, mesh, resample=Image.BICUBIC)

    elif distortion_type == "shear":
        # 剪切扭曲 - 非常轻微的水平剪切
        shear_factor = random.uniform(-0.02, 0.05)  # 更小的剪切因子
        img = img.transform(
            size, Image.AFFINE, (1, shear_factor, 0, 0, 1, 0), resample=Image.BICUBIC
        )

    elif distortion_type == "light_bend":
        # 轻微弯曲 - 模拟纸张弯曲效果
        cx, cy = size[0] // 2, size[1] // 2
        radius = min(size) * random.uniform(0.5, 0.7)
        magnitude = random.uniform(0.005, 0.01)  # 更小的变形强度

        mesh = []
        grid_size = 15

        for x in range(0, size[0], grid_size):
            for y in range(0, size[1], grid_size):
                box = (x, y, x + grid_size, y + grid_size)

                x0, y0 = x, y
                x1, y1 = x + grid_size, y
                x2, y2 = x + grid_size, y + grid_size
                x3, y3 = x, y + grid_size

                def bend_point(px, py):
                    dx = (px - cx) / radius
                    dy = (py - cy) / radius
                    distance_sq = dx * dx + dy * dy

                    if distance_sq < 1:
                        # 基于距离中心的位置计算变形
                        factor = 1 + magnitude * (1 - distance_sq)
                        nx = cx + (px - cx) * factor
                        ny = cy + (py - cy) * factor
                        return (nx, ny)
                    return (px, py)

                x0, y0 = bend_point(x0, y0)
                x1, y1 = bend_point(x1, y1)
                x2, y2 = bend_point(x2, y2)
                x3, y3 = bend_point(x3, y3)

                quad = (x0, y0, x1, y1, x2, y2, x3, y3)
                mesh.append((box, quad))

        img = img.transform(size, Image.MESH, mesh, resample=Image.BICUBIC)

    elif distortion_type == "noise":
        # 添加噪点和模糊，模拟打印/扫描效果
        img = img.filter(ImageFilter.GaussianBlur(radius=random.uniform(0.2, 0.5)))

        # 随机添加噪点
        if random.random() > 0.5:
            pixels = img.load()
            width, height = img.size
            for i in range(width):
                for j in range(height):
                    if random.random() < 0.05:  # 1%的像素被修改
                        pixels[i, j] = (
                            (0, 0, 0) if random.random() < 0.5 else (255, 255, 255)
                        )

    # 最后增强一次对比度，确保文字清晰
    enhancer = ImageEnhance.Contrast(img)
    img = enhancer.enhance(1.2)

    return img


def create_validate_code(fg_color,chars=all_chars,size=(200, 70),mode="RGB",bg_color=(255, 255, 255),font_size=20,font_type="./MSYH.TTC",length=random.randint(2, 4),draw_lines=True,n_line=(1, 2),draw_points=True,point_chance=1):
    """
    生成验证码图片并返回字符坐标信息
    @return: [0]: PIL Image实例
    @return: [1]: 验证码图片中的字符串
    @return: [2]: 每个字符的边界框信息（YOLO格式）
    """

    width, height = size  # 宽高
    # 创建图形
    img = Image.new(mode, size, bg_color)
    draw = ImageDraw.Draw(img)  # 创建画笔

    def get_chars():
        """生成给定长度的字符串，返回列表格式"""
        return random.sample(chars, length)

    def create_lines():
        """绘制干扰线"""
        line_num = random.randint(*n_line)  # 干扰线条数

        for i in range(line_num):
            # 起始点
            begin = (random.randint(0, size[0]), random.randint(0, size[1]))
            # 结束点
            end = (random.randint(0, size[0]), random.randint(0, size[1]))
            draw.line([begin, end], fill=(0, 0, 0))

    def create_points():
        """绘制干扰点"""
        chance = min(100, max(0, int(point_chance)))  # 大小限制在[0, 100]

        for w in range(width):
            for h in range(height):
                tmp = random.randint(0, 100)
                if tmp > 100 - chance:
                    draw.point((w, h), fill=(0, 0, 0))

    def create_strs():
        """绘制验证码字符并获取每个字符的坐标"""
        c_chars = get_chars()
        strs = " %s " % " ".join(c_chars)  # 每个字符前后以空格隔开

        char_coordinates = []  # 存储每个字符的坐标信息

        font = ImageFont.truetype(font_type, font_size)

        # 使用getbbox获取字符串的边界框
        bbox = font.getbbox(strs)
        font_width = bbox[2] - bbox[0]  # 右边界减去左边界
        font_height = bbox[3] - bbox[1]  # 下边界减去上边界

        # 应用原有的缩放因子
        font_width /= 0.7
        font_height /= 0.7

        # 计算字符串绘制起始位置
        start_x = (width - font_width) / 3
        start_y = (height - font_height) / 3

        # 绘制字符串并记录每个字符的位置
        current_x = start_x
        for char in strs:
            if char == " ":  # 跳过空格
                current_x += font_width / len(strs)
                continue

            # 获取当前字符的边界框
            char_bbox = font.getbbox(char)
            char_width = char_bbox[2] - char_bbox[0]

            # 计算字符在画布上的实际边界框
            actual_bbox = (
                current_x,
                start_y,
                current_x + char_width,
                start_y + font_height,
            )

            # 转换为YOLO格式
            x_center = (actual_bbox[0] + actual_bbox[2]) / 2 / width
            y_center = (actual_bbox[1] + actual_bbox[3]) / 2 / height
            box_width = (actual_bbox[2] - actual_bbox[0]) / width
            box_height = (actual_bbox[3] - actual_bbox[1]) / height

            # 获取字符类别
            class_id = char_to_class.get(char, 0)  # 默认类别0

            char_coordinates.append(
                {
                    "char": char,
                    "class_id": class_id,
                    "bbox": (x_center, y_center, box_width, box_height),
                }
            )

            draw.text((current_x, start_y), char, font=font, fill=fg_color)
            current_x += char_width  # 更新下一个字符的起始位置

        return "".join(c_chars), char_coordinates

    if draw_lines:
        create_lines()
    if draw_points:
        create_points()
    strs, char_info = create_strs()

    # 图形扭曲参数
    # params = [1 - float(random.randint(1, 2)) / 80,
    #           0,
    #           0,
    #           0,
    #           1 - float(random.randint(1, 10)) / 80,
    #           float(random.randint(3, 5)) / 450,
    #           0.001,
    #           float(random.randint(3, 5)) / 450
    #           ]
    # img = img.transform(size, Image.PERSPECTIVE, params)  # 创建扭曲
    # 轻微透视扭曲参数（保持文字可读性）
    # params = [
    #     1 - float(random.randint(1, 3)) / 150,  # 水平缩放：减小范围至1-3/150
    #     float(random.randint(-2, 2)) / 200,  # 水平剪切：增加微小随机偏移
    #     0,  # 垂直剪切保持0
    #     0,  # 水平倾斜保持0
    #     1 - float(random.randint(1, 3)) / 150,  # 垂直缩放：减小范围至1-3/150
    #     float(random.randint(1, 2)) / 1000,  # 水平透视：减小至1-2/1000
    #     0.0005,  # 扭曲强度：降低至0.0005
    #     float(random.randint(1, 2)) / 1000,  # 垂直透视：减小至1-2/1000
    # ]

    # # 应用透视变换并保持高质量
    # img = img.transform(size, Image.PERSPECTIVE, params, resample=Image.BICUBIC)
    # img = apply_diverse_distortion(img, size)
    return img, strs, char_info


def create_yolo_dataset(num_images, output_dir="./chinese_dataset", train_ratio=0.8):
    """
    创建YOLO格式的数据集
    """
    # 创建目录结构
    train_images_dir = os.path.join(output_dir, "images", "train")
    train_labels_dir = os.path.join(output_dir, "labels", "train")
    val_images_dir = os.path.join(output_dir, "images", "val")
    val_labels_dir = os.path.join(output_dir, "labels", "val")

    for dir_path in [
        train_images_dir,
        train_labels_dir,
        val_images_dir,
        val_labels_dir,
    ]:
        os.makedirs(dir_path, exist_ok=True)

    # 生成数据集
    for i in range(num_images):
        # 确定是训练集还是验证集
        is_train = random.random() < train_ratio
        img_dir = train_images_dir if is_train else val_images_dir
        label_dir = train_labels_dir if is_train else val_labels_dir

        # 生成验证码
        res = create_validate_code(
            (random.randint(0, 255), random.randint(0, 255), random.randint(0, 255)),
            chars=all_chars,
        )
        img, text, char_info = res

        _t = uuid4().hex.lower()
        # 保存图片
        img_path = os.path.join(img_dir, f"{_t}_{int(time.time())}_{i}.png")
        img.save(img_path)

        # 保存标签文件
        label_path = os.path.join(label_dir, f"{_t}_{int(time.time())}_{i}.txt")
        with open(label_path, "w", encoding="utf-8") as f:
            for char_data in char_info:
                class_id = char_data["class_id"]
                x, y, w, h = char_data["bbox"]
                f.write(f"{class_id} {x:.6f} {y:.6f} {w:.6f} {h:.6f}\n")

        if (i + 1) % 100 == 0:
            print(f"已生成 {i + 1}/{num_images} 张图片")

    # 创建数据配置文件
    with open(os.path.join(output_dir, "dataset.yaml"), "w") as f:
        f.write(f"""train: ./images/train
val: ./images/val

nc: {len(char_to_class)}
names: {list(char_to_class.keys())}
""")
    print(f"数据集生成完成，共生成 {num_images} 张图片")
    print(f"训练集: {len(os.listdir(train_images_dir))} 张")
    print(f"验证集: {len(os.listdir(val_images_dir))} 张")
    print(f"数据集保存在: {os.path.abspath(output_dir)}")


def train(data_dir, epochs=100):
    model = YOLO()
    # 训练模型
    model.train(
        data=f"{data_dir}/dataset.yaml",
        epochs=epochs,  # 训练轮次
        imgsz=200,  # 输入图像尺寸
        batch=8,  # 批次大小
        lr0=0.001,  # 初始学习率
        augment=True,  # 数据增强
        val=True,  # 训练期间验证
        project="ocr",  # 项目名称
        name="L1",  # 实验名称
        device="0",  # 使用 GPU
    )
    # print(results)
    # 在测试集上评估模型
    metrics = model.val()
    print(f"mAP@0.5: {metrics.box.map50}")
    print(f"mAP@0.5:0.95: {metrics.box.map}")


    # 指定自定义保存路径
    custom_save_path = "./best_model.pt"
    model.export(format="pt", save_dir=custom_save_path)
    # 导出为ONNX
    # model.export(
    #     format='onnx',
    #     imgsz=[640, 640],        # 输入尺寸，需与训练一致或调整为部署需要
    #     half=False,              # 是否FP16量化
    #     dynamic=True,            # 动态批处理，适用于批量推理
    #     simplify=True,           # 简化ONNX模型
    #     opset=12                 # ONNX算子集版本，根据部署环境选择
    # )
    # 推理
    # 批量推理文件夹中的所有图像
    # results = model.predict(
    #     source=r"E:\train_mo\chinese\test_image",
    #     save=True,
    #     save_txt=True,  # 保存预测框坐标到txt文件
    #     conf=0.4,
    #     project="yolov8_text",
    #     name="batch_inference",
    # )
    # # 显示推理结果
    # for r in results:
    #     im_array = r.plot()  # 绘制预测结果
    #     plt.imshow(im_array)
    #     plt.show()


def detect_text(image_path, model_path="yolov8_text/exp1/weights/best.pt"):
    # 加载模型
    model = YOLO(model_path)

    # 运行推理
    results = model(image_path, conf=0.4, iou=0.5)

    # 显示结果
    for r in results:
        im_array = r.plot()  # 绘制边界框和标签
        im_array = cv2.cvtColor(im_array, cv2.COLOR_BGR2RGB)  # 转换颜色空间

        # 显示图像
        plt.figure(figsize=(10, 10))
        plt.imshow(im_array)
        plt.axis('off')
        plt.show()

        # 打印检测结果
        boxes = r.boxes
        for box in boxes:
            cls = int(box.cls)
            conf = float(box.conf)
            xyxy = box.xyxy[0].tolist()
            print(f"类别: {model.names[cls]}, 置信度: {conf:.2f}, 坐标: {xyxy}")

    return results





# 使用示例
if __name__ == "__main__":
    dataset = "chinese_dataset"
    create_yolo_dataset(50000,output_dir=dataset)
    train(dataset,epochs=200)
    # trained_model, onnx_path = train_yolov11(dataset,epochs=100)
    # onnx_path = r"E:\train_mo\chinese\runs\detect\captcha_detection\weights\best.onnx"
    # print(f"训练完成! ONNX 模型路径: {onnx_path}")
    # model_path = r"E:\train_mo\chinese\ocr\L1\weights\best.onnx"
    # img = r"E:\train_mo\chinese\test_image\29dd92ba9f424bf1b3d406b6d399ace9_1750070678_26.png"
    # detect_text(img,model_path)



```