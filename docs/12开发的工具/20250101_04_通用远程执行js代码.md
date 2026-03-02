# github地址

```bash
https://github.com/ice-a/remote_run_js_code
```

# Remote JavaScript Code Runner

这是一个用于远程执行JavaScript代码的后端服务。

## 功能特点

+   远程执行JavaScript代码
+   安全的代码执行环境（使用vm2）
+   RESTful API接口
+   支持文件上传

## 安装步骤

1.  克隆项目：
    
    ```bash
    git clone [repository-url]
    cd remote_run_js_code
    ```
    
2.  安装依赖：
    
    ```bash
    npm install
    ```
    

## 使用方法

### 开发环境

```bash
npm run dev
```

### 生产环境

```bash
npm start
```

### Docker部署

```bash
docker build -t remote-js-runner .
docker run -p 3000:3000 remote-js-runner
```

## 项目结构

```
├── server.js          # 主服务器文件
├── public/            # 静态文件
├── uploads/           # 上传文件目录
└── package.json       # 项目配置文件
```

## 依赖项

+   express: Web服务器框架
+   multer: 文件上传中间件
+   vm2: 安全的代码执行环境
+   nodemon: 开发环境自动重启（dev依赖）

## API接口

### 1\. 上传文件执行

+   端点：`POST /execute`
+   参数：文件上传，字段名为`file`
+   返回：`{"result": 执行结果}` 或 `{"error": "错误信息"}`

### 2\. 直接执行代码

+   端点：`POST /execute-code`
+   参数：JSON格式 `{"code": "JavaScript代码字符串"}`
+   返回：`{"result": 执行结果}` 或 `{"error": "错误信息"}`

## Python调用示例

在`examples/python_client.py`中提供了完整的Python调用示例代码，包括：

+   通过代码字符串执行JavaScript
+   通过文件上传执行JavaScript

使用前请确保安装了requests库：

```bash
pip install requests
```

### 执行结果

![执行结果](https://i-blog.csdnimg.cn/direct/de2ebc281b1e4c4e97d7faa52a418d72.png#pic_center)

## 测试代码示例

以下是一个简单的测试代码示例：

```javascript
// 筛选数组中的元素
function solution(arr) {
    let answer = []
    let min = 1;
    return answer = arr.filter((v) => v !== min);
}

solution([4,9,2,22])
```

### 执行结果：

![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/89d7695b8d19442b9a847ad0c5fa7efb.png#pic_center)

## 注意事项

+   确保Node.js版本 >= 18.0.0
+   生产环境部署时注意配置安全策略
+   建议设置代码执行超时限制