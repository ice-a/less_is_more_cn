---
title: Flask 实现模型识别接口 mock
description: "用 Flask 搭建模型识别接口的 mock 服务，模拟上传图片后返回识别结果。"
date: 2024-08-13
tags:
  - 代码与脚本
  - Python
  - Web 开发
  - 图像处理
---
## flask 实现 api 接口
```python
import os

from flask import Flask, jsonify, request  
from loguru import logger  
from werkzeug.utils import secure_filename  
  
app = Flask(__name__)  
  
  
# 这里写识别图片的逻辑  
def ocr_image(image):  
    logger.info({"status": "识别图片"})  
    return "识别成功的结果"  
  
  
# 上传图片  
@app.route('/upload', methods=['POST'])  
def upload():  
    if request.method == 'POST':  
        f = request.files['file']  
        filename = secure_filename(f.filename)  # 过滤路径，避免 ../ 穿越或覆盖任意文件
        if not filename:
            return jsonify({'code': 400, 'msg': '无效文件名'})
        save_dir = os.path.join(os.getcwd(), 'uploads')  # 限制在固定上传目录内
        os.makedirs(save_dir, exist_ok=True)
        saved_path = os.path.join(save_dir, filename)
        f.save(saved_path)  
        try:  
            result = ocr_image(saved_path)  
            return jsonify({'code': 200, 'msg': '识别成功', 'data': result})  
        except Exception as e:  
            logger.error(e)  
            return jsonify({'code': 500, 'msg': '识别失败', 'data': str(e)})  
    else:  
        return jsonify({'code': 400, 'msg': '请求方式错误'})  
  
  
if __name__ == '__main__':  
    app.run(host='0.0.0.0', port=8080, debug=True)
```
