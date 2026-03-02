# 数据集格式

![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/abdbb8a677104e4cb6acbf94f5f49b58.png)

# 训练代码

```python

from ultralytics import YOLO
import multiprocessing

if __name__ == '__main__':
    # 添加 Windows 多进程支持
    multiprocessing.freeze_support()
    # Load a model
    model = YOLO("yolo11n.pt")  # load a pretrained model (recommended for training)

    # Train the model with MPS
    results = model.train(data="coco8.yaml", epochs=100, imgsz=640)
    # 量化
    results = model.val(half=True)  # evaluate model performance on the validation set
    # Run inference with the model
    # results = model("datasets/coco8/images/val/000000000061.jpg")  # predict on an image
    # result.save(filename="result.jpg")
    # 另存为模型
    model.save("best.pt")
```

# 验证识别

```python
from ultralytics import YOLO
# Load a model
model = YOLO("best.pt")  # pretrained YOLO11n model

# Run batched inference on a list of images
results = model(["datasets/coco8/images/train/000000000034.jpg"])  # return a list of Results objects

# Process results list
for result in results:
    boxes = result.boxes  # Boxes object for bounding box outputs
    masks = result.masks  # Masks object for segmentation masks outputs
    keypoints = result.keypoints  # Keypoints object for pose outputs
    probs = result.probs  # Probs object for classification outputs
    obb = result.obb  # Oriented boxes object for OBB outputs
    result.show()  # display to screen
    result.save(filename="result.jpg")  # save to disk
```

# 基于模型做成一个在线api接口

```python
import torch
from flask import Flask, request, jsonify
from ultralytics import YOLO
import cv2
import numpy as np
import base64
from PIL import Image
import io

app = Flask(__name__)

# 检查 CUDA 是否可用
device = "cuda" if torch.cuda.is_available() else "cpu"
print(f"Using device: {device}")

model = YOLO("best.pt").to(device)

def process_image(image_data):
    results = model(image_data)
    result = results[0]
    
    # 获取检测结果
    detections = []
    for box in result.boxes:
        detection = {
            "bbox": box.xyxy[0].tolist(),  # 边界框坐标
            "confidence": float(box.conf),  # 置信度
            "class_id": int(box.cls),      # 类别ID
        }
        detections.append(detection)
    
    # 保存结果图像
    result_img = result.plot()
    
    # 将结果图像转换为base64
    is_success, buffer = cv2.imencode(".jpg", result_img)
    if is_success:
        img_base64 = base64.b64encode(buffer).decode('utf-8')
        return detections, img_base64
    return None, None

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # 检查是否有文件上传
        if 'image' not in request.files:
            return jsonify({'error': 'No image uploaded'}), 400
        
        file = request.files['image']
        # 读取图像文件
        image_bytes = file.read()
        image = Image.open(io.BytesIO(image_bytes))
        
        # 处理图像
        detections, img_base64 = process_image(image)
        
        if detections is None:
            return jsonify({'error': 'Failed to process image'}), 500
        
        # 返回结果
        return jsonify({
            'detections': detections,
            'image': img_base64
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
```