---
title: Blogging Like a Hacker
---

### docker加速地址

```
{
  "builder": {
    "gc": {
      "defaultKeepStorage": "20GB",
      "enabled": true
    }
  },
  "experimental": false,
  "registry-mirrors": [
    "https://registry.hub.docker.com",
    "https://docker.mirrors.ustc.edu.cn",
    "https://mirror.baidubce.com",
    "https://docker.mirrors.sjtug.sjtu.edu.cn",
    "https://docker.nju.edu.cn"
  ]
}
```

### docker\_es\_kib\_7.17.6

```
# 创建一个elastic网络
docker network create elastic
# 拉取elastic镜像
docker pull docker.elastic.co/elasticsearch/elasticsearch:7.17.6
# 创建elastic容器
docker run --restart=always --name es01-test --net elastic -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" -d docker.elastic.co/elasticsearch/elasticsearch:7.17.6
# 拉取kibana镜像
docker pull docker.elastic.co/kibana/kibana:7.17.6
# 创建kibana容器
docker run --restart=always --name kib01-test --net elastic -p 5601:5601 -e "ELASTICSEARCH_HOSTS=http://es01-test:9200" -d docker.elastic.co/kibana/kibana:7.17.6
# 可选配置(添加密码)
# 进入容器
docker exec -it es01-test /bin/bash
# 切换到config文件夹
-> cd config 
# 进行配置
-> echo xpack.security.enabled: true >> elasticsearch.yml
-> echo xpack.license.self_generated.type: basic >> elasticsearch.yml
-> echo xpack.security.transport.ssl.enabled: true >> elasticsearch.yml
-> echo xpack.security.authc.api_key.enabled: true >> elasticsearch.yml
-> exit
# 重启容器
docker restart es01-test
# 再次进入容器配置密码
docker exec -it es01-test /bin/bash
# 切换到bin目录
-> cd bin
# 开始设置密码
-> elasticsearch-setup-passwords interactive
-> 输入各个的密码,有4个密码elastic, kibana, logstash_system,beats_system
# 可选是否安装中文分词插件
-> cd ../plugin
-> elasticsearch-plugin install https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v7.17.6/elasticsearch-analysis-ik-7.17.6.zip
-> exit
# 进入kibana容器
docker exec -it kib01-test /bin/bash
# 切换到config文件夹
-> cd config
# 开始配置
-> echo >> kibana.yml
-> echo elasticsearch.username: "elastic" >> kibana.yml
-> echo elasticsearch.password: "xxxx" >> kibana.yml   # xxxx是设置的密码
-> echo i18n.locale: "zh-CN" >> kibana.yml   # 设置中文,可以不选
exit
# 重启容器
docker restart kib01-test
```

### docker\_hadoop

```
services:
  namenode:
    image: bde2020/hadoop-namenode:2.0.0-hadoop3.2.1-java8
    container_name: namenode
    ports:
      - 9870:9870
      - 9000:9000
    volumes:
      - ./hadoop/dfs/name:/hadoop/dfs/name
      - ./input:/input
    environment:
      - CLUSTER_NAME=test
    env_file:
      - ./hadoop.env

  datanode:
    image: bde2020/hadoop-datanode:2.0.0-hadoop3.2.1-java8
    container_name: datanode
    depends_on:
      - namenode
    volumes:
      - ./hadoop/dfs/data:/hadoop/dfs/data
    environment:
      SERVICE_PRECONDITION: "namenode:9870"
    env_file:
      - ./hadoop.env
  
  resourcemanager:
    image: bde2020/hadoop-resourcemanager:2.0.0-hadoop3.2.1-java8
    container_name: resourcemanager
    environment:
      SERVICE_PRECONDITION: "namenode:9000 namenode:9870 datanode:9864"
    env_file:
      - ./hadoop.env

  nodemanager1:
    image: bde2020/hadoop-nodemanager:2.0.0-hadoop3.2.1-java8
    container_name: nodemanager
    environment:
      SERVICE_PRECONDITION: "namenode:9000 namenode:9870 datanode:9864 resourcemanager:8088"
    env_file:
      - ./hadoop.env
  
  historyserver:
    image: bde2020/hadoop-historyserver:2.0.0-hadoop3.2.1-java8
    container_name: historyserver
    environment:
      SERVICE_PRECONDITION: "namenode:9000 namenode:9870 datanode:9864 resourcemanager:8088"
    volumes:
      - ./hadoop/yarn/timeline:/hadoop/yarn/timeline
    env_file:
      - ./hadoop.env
```

```
CORE_CONF_fs_defaultFS=hdfs://namenode:9000
CORE_CONF_hadoop_http_staticuser_user=root
CORE_CONF_hadoop_proxyuser_hue_hosts=*
CORE_CONF_hadoop_proxyuser_hue_groups=*
CORE_CONF_io_compression_codecs=org.apache.hadoop.io.compress.SnappyCodec

HDFS_CONF_dfs_webhdfs_enabled=true
HDFS_CONF_dfs_permissions_enabled=false
HDFS_CONF_dfs_namenode_datanode_registration_ip___hostname___check=false

YARN_CONF_yarn_log___aggregation___enable=true
YARN_CONF_yarn_log_server_url=http://historyserver:8188/applicationhistory/logs/
YARN_CONF_yarn_resourcemanager_recovery_enabled=true
YARN_CONF_yarn_resourcemanager_store_class=org.apache.hadoop.yarn.server.resourcemanager.recovery.FileSystemRMStateStore
YARN_CONF_yarn_resourcemanager_scheduler_class=org.apache.hadoop.yarn.server.resourcemanager.scheduler.capacity.CapacityScheduler
YARN_CONF_yarn_scheduler_capacity_root_default_maximum___allocation___mb=8192
YARN_CONF_yarn_scheduler_capacity_root_default_maximum___allocation___vcores=4
YARN_CONF_yarn_resourcemanager_fs_state___store_uri=/rmstate
YARN_CONF_yarn_resourcemanager_system___metrics___publisher_enabled=true
YARN_CONF_yarn_resourcemanager_hostname=resourcemanager
YARN_CONF_yarn_resourcemanager_address=resourcemanager:8032
YARN_CONF_yarn_resourcemanager_scheduler_address=resourcemanager:8030
YARN_CONF_yarn_resourcemanager_resource__tracker_address=resourcemanager:8031
YARN_CONF_yarn_timeline___service_enabled=true
YARN_CONF_yarn_timeline___service_generic___application___history_enabled=true
YARN_CONF_yarn_timeline___service_hostname=historyserver
YARN_CONF_mapreduce_map_output_compress=true
YARN_CONF_mapred_map_output_compress_codec=org.apache.hadoop.io.compress.SnappyCodec
YARN_CONF_yarn_nodemanager_resource_memory___mb=16384
YARN_CONF_yarn_nodemanager_resource_cpu___vcores=8
YARN_CONF_yarn_nodemanager_disk___health___checker_max___disk___utilization___per___disk___percentage=98.5
YARN_CONF_yarn_nodemanager_remote___app___log___dir=/app-logs
YARN_CONF_yarn_nodemanager_aux___services=mapreduce_shuffle

MAPRED_CONF_mapreduce_framework_name=yarn
MAPRED_CONF_mapred_child_java_opts=-Xmx4096m
MAPRED_CONF_mapreduce_map_memory_mb=4096
MAPRED_CONF_mapreduce_reduce_memory_mb=8192
MAPRED_CONF_mapreduce_map_java_opts=-Xmx3072m
MAPRED_CONF_mapreduce_reduce_java_opts=-Xmx6144m
MAPRED_CONF_yarn_app_mapreduce_am_env=HADOOP_MAPRED_HOME=/data/docker-compose/hadoop-3.2.1/
MAPRED_CONF_mapreduce_map_env=HADOOP_MAPRED_HOME=/data/docker-compose/hadoop-3.2.1/
MAPRED_CONF_mapreduce_reduce_env=HADOOP_MAPRED_HOME=/data/docker-compose/hadoop-3.2.1/
```

### docker\_mongo

```
# docker pull 
docker pull mongo:4.4-rc
# docker run
docker run --rm --name mongo -d -p 27017:27017 -v D:\Mongodb\master\data:/data/db mongo:4.4-rc
docker run -itd --restart=always -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=lideshan -e MONGO_INITDB_ROOT_PASSWORD=leemuzi -v /home/ubuntu/docker_config/mongo/db:/data/db mongo
```

### docker\_neo4j

```
version: "3"
services:
  neo4j:
    image: neo4j
    volumes:

      - ./db/neo4j/conf:/var/lib/neo4j/conf:rw
      - ./db/neo4j/mnt:/var/lib/neo4j/import:rw
      - ./db/neo4j/plugins:/plugins:rw
      - ./db/neo4j/data:/data:rw
      - ./db/neo4j/logs:/var/lib/neo4j/logs:rw

    restart: always
    ports:

      - 7474:7474
      - 7687:7687

    environment:

      - NEO4J_dbms_memory_heap_maxSize=4G
      - NEO4J_AUTH=neo4j/123456 #修改默认用户密码
```

```
docker run --publish=7474:7474 --publish=7687:7687 --name neo4j -d neo4j
```

### docker\_redis

```
# 拉镜像
docker pull redis
# docker run
docker run --name some-redis -p 6379:6379 -d redis
docker run -itd --restart=always -p 6379:6379 --name redis -v /home/ubuntu/docker_config/redis/data:/data -v /home/ubuntu/docker_config/redis/conf:/etc/redis redis redis-server /etc/redis/redis.conf
```

### docker\_postgresql

```
docker run -d -p 5432:5432 --name postgresql -v pgdata:/var/lib/postgresql/data -e POSTGRES_PASSWORD=pass123 postgres
```

### docker\_hertzbeat

```
监控
docker run -d -p 1157:1157 -p 1158:1158 -e LANG=zh_CN.UTF-8 -e TZ=Asia/Shanghai -v /root/hertzbeat//data:/opt/hertzbeat/data -v /root/hertzbeat/logs:/opt/hertzbeat/logs -v /root/hertzbeat/application.yml:/opt/hertzbeat/config/application.yml -v /root/hertzbeat/sureness.yml:/opt/hertzbeat/config/sureness.yml --restart=always --name hertzbeat tancloud/hertzbeat
# 采集器
docker run -d -e IDENTITY=custom-collector-name -e MODE=public -e MANAGER_HOST=127.0.0.1 -e MANAGER_PORT=1158 --name hertzbeat-collector tancloud/hertzbeat-collector
```

### docker\_mysql

```
docker run -itd --restart=always -p 3306:3306 --name mysql -v /home/ubuntu/docker_config/mysql/log:/var/log/mysql -v /home/ubuntu/docker_config/mysql/data:/var/lib/mysql -v /home/ubuntu/docker_config/mysql/conf:/etc/mysql -e MYSQL_ROOT_PASSWORD=lideshan mysql:5.7
```

### docker\_域名扫描

```
docker run -p 3000:3000 lissy93/web-check
```

### Ciphey自动解密

```
https://github.com/Ciphey/Ciphey
```

### bt聚合

```
https://github.com/Jackett/Jackett
```

### 别具一格的头像

```
https://github.com/TencentARC/PhotoMaker
```

### vue构建项目docker部署

```
# 创建一个vue项目
npm init vite@latest my-vue-app -- --template vue
cd my-vue-app
npm install
npm run build
# 编写dockerfile文件
# 使用官方nginx镜像作为基础镜像 
FROM nginx:latest 
# 将dist目录中的文件复制到nginx的默认站点目录 
COPY dist/ /usr/share/nginx/html/ # 可选：如果你的Vue应用使用了history模式的路由，你可能需要一个配置来重定向所有的请求到index.html 
COPY nginx.conf /etc/nginx/conf.d/default.conf
# 构建镜像
docker build -t vue_demo .
# 运行镜像
docker run -d -p 80:80 vue_demo
```

### ast笔记

```
# 01-ast学习

## 什么是AST？

AST（Abstract Syntax Tree，抽象语法树）是源代码的结构化表示，是编译器、解释器、代码分析和重构工具的核心。

- **作用**：将源代码转换为树状结构，便于分析、修改和生成代码。
- **常见应用**：代码检查、自动重构、代码格式化、代码生成、静态分析等。

## AST的基本结构

- **节点（Node）**：每个节点代表代码中的一种结构（如变量、函数、表达式等）。
- **树形结构**：节点之间有父子关系，根节点代表整个程序。

## Python中的AST模块

Python内置`ast`模块可用于解析、分析和修改Python代码。

### 基本用法

```python
import ast

code = """
def add(a, b):
    return a + b
"""
tree = ast.parse(code)
print(ast.dump(tree, indent=4))
```

### 遍历AST

```python
import ast

class MyVisitor(ast.NodeVisitor):
    def visit_FunctionDef(self, node):
        print(f"函数名: {node.name}")
        self.generic_visit(node)

code = """
def add(a, b):
    return a + b
"""
tree = ast.parse(code)
MyVisitor().visit(tree)
```

### 修改AST

```python
import ast

class RenameFunction(ast.NodeTransformer):
    def visit_FunctionDef(self, node):
        node.name = "new_" + node.name
        return node

code = """
def add(a, b):
    return a + b
"""
tree = ast.parse(code)
new_tree = RenameFunction().visit(tree)
print(ast.unparse(new_tree))
```

## JavaScript中的AST工具

- **recast**：支持解析、修改和生成JS代码。
- **babel**：现代JS工具链的核心，支持AST转换。

### 安装recast

```bash
npm i recast -S
```

### 基本用法（recast）

```js
const recast = require("recast");
const code = `function add(a, b) { return a + b; }`;
const ast = recast.parse(code);

recast.visit(ast, {
  visitFunctionDeclaration(path) {
    path.node.id.name = "new_" + path.node.id.name;
    this.traverse(path);
  }
});

const output = recast.print(ast).code;
console.log(output); // function new_add(a, b) { return a + b; }
```

## AST实战案例

### 1. 统计Python文件中所有函数名

```python
import ast

class FuncLister(ast.NodeVisitor):
    def visit_FunctionDef(self, node):
        print(node.name)
        self.generic_visit(node)

with open('your_file.py', 'r', encoding='utf-8') as f:
    tree = ast.parse(f.read())
FuncLister().visit(tree)
```

### 2. 自动重命名变量

```python
import ast

class RenameVar(ast.NodeTransformer):
    def visit_Name(self, node):
        if node.id == 'a':
            node.id = 'x'
        return node

code = "a = 1\nprint(a)"
tree = ast.parse(code)
new_tree = RenameVar().visit(tree)
print(ast.unparse(new_tree))
```

## 进阶技巧

- **自定义NodeVisitor和NodeTransformer**：实现复杂的代码分析和重构。
- **结合ast和codegen/unparse**：实现代码的自动生成。
- **与类型注解、静态分析工具结合**：如mypy、pylint等。
- **跨语言AST**：如Babel（JS）、libclang（C/C++）、ANTLR（多语言）。

## 推荐学习资源

- [Python官方ast文档](https://docs.python.org/zh-cn/3/library/ast.html)
- [AST Explorer](https://astexplorer.net/)（可在线查看多语言AST）
- [recast文档](https://github.com/benjamn/recast)
- [Babel Handbook](https://github.com/jamiebuilds/babel-handbook)

---

通过系统学习和实践AST，你可以实现自动化代码分析、重构、生成等高级功能，是提升编程能力的重要工具。
```

### python常见的加解密

```
---
title: python常见的加解密
aes
- python
category:
- python
---

## urlencode加密

```python
# urlencode加密
import urllib.parse

text = "我爱吃鸡腿"
s = urllib.parse.quote(text)
print(s) # %E6%88%91%E7%88%B1%E5%90%83%E9%B8%A1%E8%85%BF
u = urllib.parse.unquote(s)
print(u) #我爱吃鸡腿
````

## unicode加密

```python
str1 = "你好"
# 编码
enStr1 = str1.encode('unicode-escape').decode()
print(enStr1) # \u4f60\u597d

# 解码
deStr1 = enStr1.encode().decode('unicode-escape')
print(deStr1) # 你好
```

## Base64加密

```python
import base64

def base64_encode(text):
    encode_data = base64.b64encode(text.encode())
    return encode_data

def base64_decode(encode_data):
    decode_data = base64.b64decode(encode_data)
    return decode_data

if __name__ == '__main__':
    text = 'I love Python!'
    encode_data = base64_encode(text)
    decode_data = base64_decode(encode_data)
    print('Base64 编码：', encode_data)
    print('Base64 解码：', decode_data)

    # Base64 编码： b'SSBsb3ZlIFB5dGhvbiE='
# Base64 解码： b'I love Python!'
```

## MD5

```python
import hashlib

def md5_test1():
    md5 = hashlib.new('md5', 'I love python!'.encode('utf-8'))
    print(md5.hexdigest())

def md5_test2():
    md5 = hashlib.md5()
    md5.update('I love '.encode('utf-8'))
    md5.update('python!'.encode('utf-8'))
    print(md5.hexdigest())

if __name__ == '__main__':
    md5_test1()  # 21169ee3acd4a24e1fcb4322cfd9a2b8
    md5_test2()  # 21169ee3acd4a24e1fcb4322cfd9a2b8
```

## PBKDF2
简介：英文名称：Password-Based Key Derivation Function 2，
PBKDF2 是 RSA 实验室的公钥加密标准（PKCS）系列的一部分，
2017 年发布的 RFC 8018 （PKCS #5 v2.1）推荐使用 PBKDF2 进行密码散列。
PBKDF2 将伪随机函数（例如 HMAC），
把明文和一个盐值（salt）作为输入参数，然后进行重复运算，并最终产生密钥，
如果重复的次数足够大，破解的成本就会变得很高。

```python
import binascii
from Cryptodome.Hash import SHA1
from Cryptodome.Protocol.KDF import PBKDF2

text = 'I love Python!'
salt = b'43215678'
result = PBKDF2(text,  salt, count=10, hmac_hash_module=SHA1)
result = binascii.hexlify(result)
print(result)
```

## SHA

简介：全称安全哈希算法（英文名称：Secure Hash Algorithm），
由美国国家安全局（NSA）所设计，主要适用于数字签名标准
（Digital Signature Standard DSS）里面定义的数字签名算法（
Digital Signature Algorithm DSA），SHA 通常指 SHA 家族的五个算法，
分别是 SHA-1、SHA-224、SHA-256、SHA-384、SHA-512，
后四者有时并称为 SHA-2，SHA 是比 MD5 更安全一点的摘要算法，
MD5 的密文是 32 位，而 SHA-1 是 40 位，
版本越强，密文越长，代价是速度越慢。

```python
import hashlib

def sha1_test1():
    sha1 = hashlib.new('sha1', 'I love python!'.encode('utf-8'))
    print(sha1.hexdigest())

def sha1_test2():
    sha1 = hashlib.sha1()
    sha1.update('I love python!'.encode('utf-8'))
    print(sha1.hexdigest())

if __name__ == '__main__':
    sha1_test1()  # 23c02b203bd2e2ca19da911f1d270a06d86719fb
    sha1_test2()  # 23c02b203bd2e2ca19da911f1d270a06d86719fb
```

## HMAC

简介：全称散列消息认证码、密钥相关的哈希运算消息认证码
（英文名称：Hash-based Message Authentication Code 或者 Keyed-hash Message Authentication Code），
于 1996 年提出，1997 年作为 RFC 2104 被公布，HMAC 加密算法是一种安全的基于加密 Hash
函数和共享密钥的消息认证协议，它要求通信双方共享密钥 key、约定算法、
对报文进行 Hash 运算，形成固定长度的认证码。通信双方
通过认证码的校验来确定报文的合法性。

```python
import hmac

def hmac_test1():
    message = b'I love python!'
    key = b'secret'
    md5 = hmac.new(key, message, digestmod='MD5')
    print(md5.hexdigest())

def hmac_test2():
    key = 'secret'.encode('utf8')
    sha1 = hmac.new(key, digestmod='sha1')
    sha1.update('I love '.encode('utf8'))
    sha1.update('Python!'.encode('utf8'))
    print(sha1.hexdigest())

if __name__ == '__main__':
    hmac_test1()  # 9c503a1f852edcc3526ea56976c38edf
    hmac_test2()  # 2d8449a4292d4bbeed99ce9ea570880d6e19b61a
```

## DES

简介：全称数据加密标准（英文名称：Data Encryption Standard），加密与解密使用同一密钥，
属于对称加密算法，1977 年被美国联邦政府的国家标准局确定为联邦资料处理标准（FIPS），
DES 是一个分组加密算法，使用 56 位的密钥（一般认为密钥是 64 位，
但是密钥的每个第 8 位设置为奇偶校验位，所以实际上有效位只有 56 位），
由于 56 位密钥长度相对较短，所以 DES 是不安全的，现在基本上已被更高级的加密标准 AES 取代。

mode 支持：CBC，CFB，CTR，CTRGladman，ECB，OFB 等。

padding 支持：ZeroPadding，NoPadding，AnsiX923，Iso10126，Iso97971，Pkcs7 等。

```python
import binascii
# 加密模式 CBC，填充方式 PAD_PKCS5
from pyDes import des, CBC, PAD_PKCS5

def des_encrypt(key, text, iv):
    k = des(key, CBC, iv, pad=None, padmode=PAD_PKCS5)
    en = k.encrypt(text, padmode=PAD_PKCS5)
    return binascii.b2a_hex(en)

def des_decrypt(key, text, iv):
    k = des(key, CBC, iv, pad=None, padmode=PAD_PKCS5)
    de = k.decrypt(binascii.a2b_hex(text), padmode=PAD_PKCS5)
    return de

if __name__ == '__main__':
    secret_key = '12345678'   # 密钥
    text = 'I love Python!'   # 加密对象
    iv = secret_key           # 偏移量
    secret_str = des_encrypt(secret_key, text, iv)
    print('加密字符串：', secret_str)
    clear_str = des_decrypt(secret_key, secret_str, iv)
    print('解密字符串：', clear_str)

    # 加密字符串： b'302d3abf2421169239f829b38a9545f1'
    # 解密字符串： b'I love Python!'
```

## 3DES

简介：全称三重数据加密算法（英文名称：Triple Data Encryption Standard、
Triple Data Encryption Algorithm、TDES、TDEA），是对称加密算法中的一种。
70 年代初由 IBM 研发，后 1977 年被美国国家标准局采纳为数据加密标准，
它相当于是对每个数据块应用三次 DES 加密算法。由于计算机运算能力的增强，
原版 DES 密码的密钥长度变得容易被暴力破解；3DES 即是设计用来提供一种相对简单的方法，
即通过增加 DES 的密钥长度来避免破解，所以严格来说 3DES 不是设计一种全新的块密码算法。

mode 支持：CBC，CFB，CTR，CTRGladman，ECB，OFB 等。

padding 支持：ZeroPadding，NoPadding，AnsiX923，Iso10126，Iso97971，Pkcs7 等。

```python
from Cryptodome.Cipher import DES3
from Cryptodome import Random

# 需要补位，str不是16的倍数那就补足为16的倍数
def add_to_16(value):
    while len(value) % 16 != 0:
        value += '\0'
    return str.encode(value)

def des_encrypt(key, text, iv):
    # 加密模式 OFB
    cipher_encrypt = DES3.new(add_to_16(key), DES3.MODE_OFB, iv)
    encrypted_text = cipher_encrypt.encrypt(text.encode("utf-8"))
    return encrypted_text

def des_decrypt(key, text, iv):
    # 加密模式 OFB
    cipher_decrypt = DES3.new(add_to_16(key), DES3.MODE_OFB, iv)
    decrypted_text = cipher_decrypt.decrypt(text)
    return decrypted_text

if __name__ == '__main__':
    key = '12345678'            # 密钥，16 位
    text = 'I love Python!'     # 加密对象
    iv = Random.new().read(DES3.block_size)  # DES3.block_size == 8
    secret_str = des_encrypt(key, text, iv)
    print('加密字符串：', secret_str)
    clear_str = des_decrypt(key, secret_str, iv)
    print('解密字符串：', clear_str)

# 加密字符串： b'\xa5\x8a\xd4R\x99\x16j\xba?vg\xf2\xb6\xa9'
# 解密字符串： b'I love Python!'
```

## AES

简介：全称高级加密标准（英文名称：Advanced Encryption Standard），
在密码学中又称 Rijndael 加密法，由美国国家标准与技术研究院 （NIST）于 2001 年发布，
并在 2002 年成为有效的标准，是美国联邦政府采用的一种区块加密标准。
这个标准用来替代原先的 DES，已经被多方分析且广为全世界所使用，
它本身只有一个密钥，即用来实现加密，也用于解密。

mode 支持：CBC，CFB，CTR，CTRGladman，ECB，OFB 等。

padding 支持：ZeroPadding，NoPadding，AnsiX923，Iso10126，Iso97971，Pkcs7 等。

```python
import base64
from Cryptodome.Cipher import AES

# 需要补位，str不是16的倍数那就补足为16的倍数
def add_to_16(value):
    while len(value) % 16 != 0:
        value += '\0'
    return str.encode(value)

# 加密方法
def aes_encrypt(key, t, iv):
    aes = AES.new(add_to_16(key), AES.MODE_CBC, add_to_16(iv))  # 初始化加密器
    encrypt_aes = aes.encrypt(add_to_16(t)) # 先进行 aes 加密
    # 执行加密并转码返回 bytes
    encrypted_text = str(base64.encodebytes(encrypt_aes), encoding='utf-8')  
    return encrypted_text

# 解密方法
def aes_decrypt(key, t, iv):
    # 初始化加密器
    aes = AES.new(add_to_16(key), AES.MODE_CBC, add_to_16(iv))     
    # 优先逆向解密 base64 成 bytes   
    base64_decrypted = base64.decodebytes(t.encode(encoding='utf-8')) 
    # 执行解密密并转码返回str 
    decrypted_text = str(aes.decrypt(base64_decrypted), encoding='utf-8').replace('\0', '')  
    return decrypted_text

if __name__ == '__main__':
    secret_key = '12345678'   # 密钥
    text = 'I love Python!'   # 加密对象
    iv = secret_key           # 初始向量
    encrypted_str = aes_encrypt(secret_key, text, iv)
    print('加密字符串：', encrypted_str)
    decrypted_str = aes_decrypt(secret_key, encrypted_str, iv)
    print('解密字符串：', decrypted_str)

# 加密字符串： lAVKvkQh+GtdNpoKf4/mHA==
# 解密字符串： I love Python!
```

### AES ECB PKC7 模式

```python
from Cryptodome.Cipher import AES
from Cryptodome.Util.Padding import pad

def aes_cipher(key, aes_str):
    # 使用key,选择加密方式
    aes = AES.new(key.encode('utf-8'), AES.MODE_ECB)
    pad_pkcs7 = pad(aes_str.encode('utf-8'), AES.block_size, style='pkcs7')  # 选择pkcs7补全
    encrypt_aes = aes.encrypt(pad_pkcs7)
    # 加密结果
    encrypted_text = str(base64.encodebytes(encrypt_aes), encoding='utf-8')  # 解码
    encrypted_text_str = encrypted_text.replace("\n", "")
    # 此处我的输出结果老有换行符，所以用了临时方法将它剔除
    return encrypted_text_str
```

## RC4

简介：英文名称：Rivest Cipher 4，也称为 ARC4 或 ARCFOUR，是一种流加密算法，
密钥长度可变。它加解密使用相同的密钥，因此也属于对称加密算法。
RC4 是有线等效加密（WEP）中采用的加密算法，也曾经是 TLS 可采用的算法之一，
该算法的速度可以达到 DES 加密的 10 倍左右，且具有很高级别的非线性，
虽然它在软件方面的简单性和速度非常出色，但在 RC4 中发现了多个漏洞，
它特别容易受到攻击，RC4 作为一种老旧的验证和加密算法易于受到黑客攻击，
现在逐渐不推荐使用了。

```python
import base64
from Cryptodome.Cipher import ARC4

def rc4_encrypt(key, t):
    enc = ARC4.new(key.encode('utf8'))
    res = enc.encrypt(t.encode('utf-8'))
    res = base64.b64encode(res)
    return res

def rc4_decrypt(key, t):
    data = base64.b64decode(t)
    enc = ARC4.new(key.encode('utf8'))
    res = enc.decrypt(data)
    return res

if __name__ == "__main__":
    secret_key = '12345678'   # 密钥
    text = 'I love Python!'   # 加密对象
    encrypted_str = rc4_encrypt(secret_key, text)
    print('加密字符串：', encrypted_str)
    decrypted_str = rc4_decrypt(secret_key, encrypted_str)
    print('解密字符串：', decrypted_str)

# 加密字符串： b'8tNVu3/U/veJR2KgyBw='
# 解密字符串： b'I love Python!'
```

## Rabbit

简介：Rabbit 加密算法是一个高性能的流密码加密方式，
2003 年首次被提出，它从 128 位密钥和 64 位初始向量（iv）创建一个密钥流。

目前没有找到有第三方库可以直接实现 Rabbit 算法，
在 Python 中实现可以 [参考](https://asecuritysite.com/encryption/rabbit2)

## RSA

简介：英文名称：Rivest-Shamir-Adleman，是 1977 年由罗纳德·李维斯特（Ron Rivest）、
阿迪·萨莫尔（Adi Shamir）和伦纳德·阿德曼（Leonard Adleman）一起提出的，
RSA 就是他们三人姓氏开头字母拼在一起组成的，RSA 加密算法是一种非对称加密算法。
在公开密钥加密和电子商业中RSA被广泛使用。它被普遍认为是目前比较优秀的公钥方案之一。
RSA是第一个能同时用于加密和数字签名的算法，它能够抵抗到目前为止已知的所有密码攻击。

```python
import rsa

def rsa_encrypt(pu_key, t):
    # 公钥加密
    rsa = rsa.encrypt(t.encode("utf-8"), pu_key)
    return rsa

def rsa_decrypt(pr_key, t):
    # 私钥解密
    rsa = rsa.decrypt(t, pr_key).decode("utf-8")
    return rsa

if __name__ == "__main__":
    public_key, private_key = rsa.newkeys(512)   # 生成公钥、私钥
    print('公钥：', public_key)
    print('私钥：', private_key)
    text = 'I love Python!'  # 加密对象
    encrypted_str = rsa_encrypt(public_key, text)
    print('加密字符串：', encrypted_str)
    decrypted_str = rsa_decrypt(private_key, encrypted_str)
    print('解密字符串：', decrypted_str)

'''
公钥： PublicKey(7636479066127060956100056267701318377455704072072698049978592945665550579944731953431504993757594103617537700972424661030900303472123028864161050235168613, 65537)
私钥： PrivateKey(7636479066127060956100056267701318377455704072072698049978592945665550579944731953431504993757594103617537700972424661030900303472123028864161050235168613, 65537, 3850457767980968449796700480128630632818465005441846698224554128042451115530564586537997896922067523638756079019054611200173122138274839877369624069360253, 4713180694194659323798858305046043997526301456820208338158979730140812744181638767, 1620238976946735819854194349514460863335347861649166352709029254680140139)
加密字符串： b"\x1aaeps\xa0c}\xb6\xcf\xa3\xb0\xbb\xedA\x7f}\x03\xdc\xd5\x1c\x9b\xdb\xda\xf9q\x80[=\xf5\x91\r\xd0'f\xce\x1f\x01\xef\xa5\xdb3\x96\t0qIxF\xbd\x11\xd6\xb25\xc5\xe1pM\xb4M\xc2\xd4\x03\xa6"
解密字符串： I love Python!
'''
```

## 模块 Cryptodome

```python
import base64
from Cryptodome.PublicKey import RSA
from Cryptodome.Cipher import PKCS1_v1_5

data = "cKK8B2rWwfwWeXhz"
public_key = "MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAM1xhOWaThSMpfxFsjV5YaWOFHt+6RvS+zH2Pa47VVr8PkZYnRaaKKy2MYBuEh7mZfM/R1dUXTgu0gp6VTNeNQkCAwEAAQ=="
rsa_key = RSA.import_key(base64.b64decode(public_key))  # 导入读取到的公钥
cipher = PKCS1_v1_5.new(rsa_key)                        # 生成对象
cipher_text = base64.b64encode(cipher.encrypt(data.encode(encoding="utf-8")))
print(cipher_text)
```

出处 [Python常见的各种加密解密算法_吾爱破解论坛](https://www.52pojie.cn/thread-1829215-1-1.html)
```

### 使用cv检测图片中是否有人物

```
import os  
import shutil  
# 解决中文路径的问题  
import sys  

import cv2  

# 获取当前文件路径  
cur_path = os.path.abspath(__file__)  
# 获取当前文件的父目录  
father_path = os.path.abspath(os.path.dirname(cur_path) + os.path.sep + ".")  
# 将父目录添加到系统路径中  
sys.path.append(father_path)  


# 使用opencv检测图片中是否有人物  
def detect_person(image_path):  
    # 读取图片  
    img = cv2.imread(image_path)  
    if img is None:  
        print(f"Error: Unable to load image at {image_path}")  
        return  # 或者适当的错误处理  
    # 转换为灰度图  
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)  
    # 加载人脸检测器  
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')  
    # 检测人脸  
    # faces = face_cascade.detectMultiScale(gray, 1.3, 5)  
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5)  
    # 如果检测到人脸，则返回True，否则返回False  
    if len(faces) > 0:  
        return True  
    else:  
        return False  


# 测试  
if __name__ == '__main__':  
    _dir = r"F:\upload\others\ios\img\chat"  
    pho = r"F:\upload\others\ios\img\photo"  
    for item in os.listdir(_dir):  
        t = os.path.join(_dir, item)  
        if detect_person(t):  
            _dst = os.path.join(pho, item)  
            shutil.move(t, _dst)  
            print(f"{item} 已移动到 {_dst}")  
        else:  
            print(f"{item} 无人脸")
```

### 解决读取文件编码问题

```
import chardet
def get_file_encode(file_path):
    with open(file_path, 'rb') as f:
        return chardet.detect(f.read())['encoding']
```

### 随机图

```
https://www.dmoe.cc/
https://www.dmoe.cc/random.php
https://blog.csdn.net/SectSnow/article/details/115835711
# 5217福利社
https://www.5217fls.com/
# Dubnitskiy David - professional photographer
https://35photo.pro/davidfotographer
# 每日妹子图 – 每天分享好看的小姐姐 高清无水印
https://meizi5.com/
# 妹子图
https://meizi.in/
# Moonsi Morfin 
https://www.youtube.com/@Moonsidryvswet
YTboob
https://ytboob.com/
# AV女優
https://av-wiki.net/
```

### bt种子链接搜索

```
https://anybt.eth.link/#/
https://cilisousuo.com/
https://ciliku.net/
https://tt2.ttcl.cc/
https://clxf.me/
```

### elastic\_kibana看板常用操作

```
# 获取全部的index
GET _cat/indices?v
# 统计index
GET _cat/count/car_taipingyang_info/?v
# 查看集群健康状态
GET _cat/health
# 查看集群健康状态,详细信息
GET _cat/health?v
# 查看节点信息及详细信息
GET _cat/nodes
GET _cat/nodes?v
# 查看es的index信息及详细信息
GET _cat/indices
GET _cat/indices?v
# 创建index及type
POST /car_test_info_post/car_deatil
{
  "properties" : {
    "id" : {"type" : "long"},
    "username" : {"type" : "text"},
    "password" : {"type" : "text"},
    "age" : {"type" : "integer"}
  }
}
# 查询type类型
GET /car_test_info_post/_mapping
# 在type中添加数据
PUT /car_test_info_post/car_deatil/1
{
  "id": 22,
  "username": "zhangsan",
  "password": "666",
  "age": 1
}
POST /car_test_info_post/car_deatil
{
  
    "id" : 220,
    "username" :"zhangsan02" ,
    "password" : "6669999",
    "age" : 100
}
# 查看数据
GET /car_test_info_post/car_taipingyang_info
# 删除数据
DELETE /car_test_info_post/car_deatil/10
```

### ffmpeg推流直播

```
# 安装ffmpeg
# ubuntu
sudo apt update
sudo apt install ffmpeg
ffmpeg -version  # 查看版本 我的是4.x
centos
yum -y install wget
wget --no-check-certificate https://www.johnvansickle.com/ffmpeg/old-releases/ffmpeg-4.0.3-64bit-static.tar.xz
tar -xJf ffmpeg-4.0.3-64bit-static.tar.xz
cd ffmpeg-4.0.3-64bit-static
mv ffmpeg /usr/bin && mv ffprobe /usr/bin && mv qt-faststart /usr/bin && mv ffmpeg-10bit /usr/bin
windows
下载ffmpeg构建好的文件
https://github.com/BtbN/FFmpeg-Builds/releases
添加环境变量路径 ffmpeg/bin
# B站
1.登录
2.个人中心
3.我的直播
4.我的直播间
5.选择直播分类
6.点击开始直播
7.复制服务器地址 rtmp://live-push.bilivideo.com/live-bvc/
8.复制串流密钥 ?streamname=xxx
9.组成一个链接之后要用 rtmp://live-push.bilivideo.com/live-bvc/?streamname=xxx
# 开始推流
找到一个视频文件随便命名(尽量几个字母)我的是demo.mp4
通过ffmpeg推流示例
ffmpeg -re -stream_loop -1 -i "./demo.mp4" -c copy -f flv "rtmp://live-push.bilivideo.com/live-bvc/?streamname=xxx"
```

### matplotlib无法显示中文解决办法

```
import os
# import matplotlib.pyplot as plt
from matplotlib import pyplot as plt
import matplotlib as mpl
from matplotlib.font_manager import FontProperties
#from pylab import mpl

#mpl.rcParams[u'font.sans-serif'] =  ['simabs']  # 指定默认字体
#mpl.rcParams['axes.unicode_minus'] = False  # 解决保存图像是负号'-'显示为方块的问题
font=FontProperties(fname=r'/data/env_env/python/lib/python3.8/site-packages/matplotlib/mpl-data/fonts/ttf/simabs.ttf')
def create_image(save_path, text):
    fig = plt.figure(figsize=(10, 1.25))
    fig.text(0.5, 0.5, u'{}'.format(text),
             horizontalalignment='center', verticalalignment='center', fontsize=15,fontproperties=font)
    plt.savefig(save_path)
    plt.close()
```

### mysql主从同步集群

```
# 主服务器配置
## 1.创建并启动mysql主服务器
```
docker run -d -p 3306:3306 -v /home/yuluo/shardingsphere-env/master/conf:/etc/mysql/conf.d -v /home/yuluo/shardingsphere-env/master/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 --name yuluo-mysql-master mysql:8.0.29
eg:
docker run -d -p 3306:3306 -v F:\db\mysql\conf:/etc/mysql/conf.d -v F:\db\mysql\data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 --name mysql-master mysql:8.0.29
```
## 2.创建mysql主服务器配置文件
my.cnf
```
[mysqld]
# 服务器唯一id，默认值1
server-id=1
# 设置日志格式，默认值ROW
binlog_format=STATEMENT
# 二进制日志名，默认binlog
# log-bin=binlog
# 设置需要复制的数据库，默认复制全部数据库
#binlog-do-db=mytestdb
# 设置不需要复制的数据库
#binlog-ignore-db=mysql
#binlog-ignore-db=infomation_schema
```
## 3.测试连接
```
#进入容器：env LANG=C.UTF-8 避免容器中显示中文乱码
docker exec -it mysql-master env LANG=C.UTF-8 /bin/bash
#进入容器内的mysql命令行
mysql -uroot -p123456
#修改默认密码校验方式
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '123456';
```
## 4.主节点创建slave用户
```
create user 'lds_slave'@'%';
# 设置密码
alter user 'lds_slave'@'%' identified with mysql_native_password by '123456';
# 授予复制权限
grant replication slave on *.* to 'lds_slave'@'%';
# 刷新权限
flush privileges;
```
## 5.在主机中查询master的状态
```
记录File和Position的值
 File          | Position | Binlog_Do_DB | Binlog_Ignore_DB | Executed_Gtid_Set |
+---------------+----------+--------------+------------------+-------------------+
| binlog.000002 |     1345 |              |                  |                   |
+---------------+----------+--------------+------------------+-------------------+
```
# 从服务器配置
## 1.启动从服务器
```
docker run -d -p 3306:3306 -v /home/yuluo/shardingsphere-env/master/conf:/etc/mysql/conf.d -v /home/yuluo/shardingsphere-env/master/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 --name yuluo-mysql-master mysql:8.0.29
eg:
docker run -d -p 3307:3306 -v F:\db\mysql_slave\conf:/etc/mysql/conf.d -v F:\db\mysql_slave\data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 --name mysql-slave1 mysql:8.0.29
```
## 2.从服务器配置
```
[mysqld]
# 服务器唯一id，每台服务器的id必须不同，如果配置其他从机，注意修改id
server-id=2
# 中继日志名，默认xxxxxxxxxxxx-relay-bin
#relay-log=relay-bin
```
## 3.测试连接
```
#进入容器：env LANG=C.UTF-8 避免容器中显示中文乱码
docker exec -it mysql-slave1 env LANG=C.UTF-8 /bin/bash
#进入容器内的mysql命令行
mysql -uroot -p123456
#修改默认密码校验方式
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '123456';
```
## 4.在从机中配置主从关系
```
change master to master_host='192.168.28.23',master_user='lds_slave',master_password='123456',master_port=3306,master_log_file='binlog.000002',master_log_pos=1345;
```
## 5.启动从机的复制功能
```
start slave
# 查看状态(不需要分号)
show slave status\G
slave_io_running

下边两个都是Yes搭建成功
Slave_IO_Running: Yes
Slave_SQL_Running: Yes
```
# 从服务器配置2
## 1.创建并启动从服务器2
```
docker run -d -p 3306:3306 -v /home/yuluo/shardingsphere-env/master/conf:/etc/mysql/conf.d -v /home/yuluo/shardingsphere-env/master/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 --name yuluo-mysql-master mysql:8.0.29
eg:
docker run -d -p 3308:3306 -v F:\db\mysql_slave2\conf:/etc/mysql/conf.d -v F:\db\mysql_slave2\data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 --name mysql-slave2 mysql:8.0.29
```
## 2.配置文件
```
[mysqld]
# 服务器唯一id，每台服务器的id必须不同，如果配置其他从机，注意修改id
server-id=3
# 中继日志名，默认xxxxxxxxxxxx-relay-bin
#relay-log=relay-bin
```
## 3.配置主从关系
```
change master to master_host='192.168.28.23',master_user='lds_slave',master_password='123456',master_port=3306,master_log_file='binlog.000002',master_log_pos=1345;
```
## 4.启动从机的复制功能
```
start slave
# 查看状态(不需要分号)
show slave status\G
slave_io_running

下边两个都是Yes搭建成功
Slave_IO_Running: Yes
Slave_SQL_Running: Yes
```
## 5.同步测试
```
master中
CREATE DATABASE db_user;

USE db_user;

CREATE TABLE t_user (
 id BIGINT AUTO_INCREMENT,
 uname VARCHAR(30),
 PRIMARY KEY (id)
);

INSERT INTO t_user(uname) VALUES('zhang3');
INSERT INTO t_user(uname) VALUES(@@hostname);
# 在从机中查看
```
# 停止和重置
```
-- 在从机上执行。功能说明：停止I/O 线程和SQL线程的操作。
stop slave; 

-- 在从机上执行。功能说明：用于删除SLAVE数据库的relaylog日志文件，并重新启用新的relaylog文件。
reset slave;

-- 在主机上执行。功能说明：删除所有的binglog日志文件，并将日志索引文件清空，重新开始所有新的日志文件。
-- 用于第一次进行搭建主从库时，进行主库binlog初始化工作；
reset master;
```
# 常见问题错误解决
```
-- 在从机停止slave
stop slave; 

-- 在主机查看mater状态
SHOW MASTER STATUS;
-- 在主机刷新日志
FLUSH LOGS;
-- 再次在主机查看mater状态（会发现File和Position发生了变化）
SHOW MASTER STATUS;
-- 修改从机连接主机的SQL，并重新连接即可

-- 查看server_id 
show variables like 'server_id';

-- 如果为1 查看配置文件是否映射进去

重启容器问题解决
启动docker容器后提示 WARNING: IPv4 forwarding is disabled. Networking will not work.
C:\Users\administrator>mysql -h 192.168.100.201 -P 3306 -u root -p
#修改配置文件：
vim /usr/lib/sysctl.d/00-system.conf
#追加
net.ipv4.ip_forward=1
#接着重启网络
systemctl restart network
```
```

### ppt\_to\_pdf

```
```python
import win32com.client
import os
def ppt2pdf(filename, output_filename):
    """
    PPT文件导出为pdf格式
    :param filename: PPT文件的名称
    :param output_filename: 导出的pdf文件的名称
    :return:
    """
    ppt_app = win32com.client.Dispatch('PowerPoint.Application')
    # ppt_app.Visible = True  # 程序操作应用程序的过程是否可视化
    ppt = ppt_app.Presentations.Open(filename)
    # 17数字是ppt转图片，32数字是ppt转pdf
    ppt.SaveAs(output_filename, 32)
    print("导出成pdf格式成功!!!")
    # 退出PPT程序
    ppt_app.Quit()


# 要处理的目录名称
dirname = r''
filenames = os.listdir(dirname)
for filename in filenames:
    if filename.endswith('ppt') or filename.endswith('pptx'):
        base, ext = filename.split('.')
        new_name = base + '.pdf'
        filename =os.path.join(dirname,filename)
        output_filename =os.path.join(dirname,new_name)
        ppt2pdf(filename, output_filename)
```
```

### ffmpeg转换音频文件

```
# m4a文件转为16bit,单声道,采样率为48kHz
for i in *.m4a; do ffmpeg -i "$i" -acodec pcm_s16le -ac 1 -ar 48000 "${i%}.wav"; done
-acodec pcm_s16le:16bit
-ac 1:单声道
-ar 48000:48kHZ
```

### 多张图片合成

```
import cv2 as cv
import numpy as np
# 读入图片
src = cv.imread('test.jpg')
# 调用cv.putText()添加文字
text = "Your are so beautiful!"
AddText = src.copy()
cv.putText(AddText, text, (200, 100), cv.FONT_HERSHEY_COMPLEX, 2.0, (100, 200, 200), 5)
# 将原图片和添加文字后的图片拼接起来
res = np.hstack([src, AddText])
# 显示拼接后的图片
cv.imshow('text', res)
cv.waitKey()
cv.destroyAllWindows()
```

### docker容器自动重启

```
## 容器未创建时
```
docker run -d --restart=always --name 设置容器名 使用的镜像
--restart具体参数值详细信息：
    no　　　　　　　 // 默认策略,容器退出时不重启容器；
    on-failure　　  // 在容器非正常退出时（退出状态非0）才重新启动容器；
    on-failure:3    // 在容器非正常退出时重启容器，最多重启3次；
    always　　　　  // 无论退出状态是如何，都重启容器；
    unless-stopped  // 在容器退出时总是重启容器，但是不考虑在 Docker 守护进程启动时就已经停止了的容器。
```

## 容器已经创建
```
docker update --restart=always 容器ID(或者容器名)
```
```

### multipass构建一个新系统

```
multipass launch jammy --name acc --cpus 2 --disk 40G --memory 4G
```

### flask实现api接口

```
from flask import Flask, jsonify, request  
from loguru import logger  
  
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
        f.save(f.filename)  
        try:  
            result = ocr_image(f.filename)  
            return jsonify({'code': 200, 'msg': '识别成功', 'data': result})  
        except Exception as e:  
            logger.error(e)  
            return jsonify({'code': 500, 'msg': '识别失败', 'data': str(e)})  
    else:  
        return jsonify({'code': 400, 'msg': '请求方式错误'})  
  
  
if __name__ == '__main__':  
    app.run(host='0.0.0.0', port=8080, debug=True)
```

### to watch

```
- 《地球脉动2》 9.9分
- 《肖申克的救赎》 9.6分
- 《控方证人》 9.6分
- 《天才：总决赛》 9.6分
- 《玛莎和熊》 9.6分
- 《宇宙时空之旅》 9.6分
- 《我们的父辈》 9.6分
- 《霸王别姬》 9.6分
- 《宾波的魔桶》 9.5分
- 《里赫特：谜》 9.5分
- 《美丽人生》 9.5分
- 《百乐门现场》 9.5分
- 《可爱的动物》 9.5分
- 《辛德勒的名单》 9.5分
- 《Eminem：E》 9.4分
- 《王者之路》 9.4分
- 《这个杀手不太冷》 9.4分
- 《阿甘正传》 9.4分
- 《被遗的时光》 9.4分
- 《野鸟世界》 9.4分
- 《谍影熊心》 9.4分
- 《牡丹亭》 9.4分
- 《天鹅湖》 9.4分
- 《机器人总动员》 9.3分
- 《长板女孩》 9.3分
- 《十二怒汉》 9.3分
- 《海豚湾》 9.3分
- 《灿烂人生》 9.3分
- 《美丽中国》 9.3分
- 《盗梦空间》 9.3分
- 《千与千寻》 9.3分
- 《泰坦尼克号》 9.3分
- 《忠犬八公的故事》 9.3分
- 《熔炉》 9.3分
- 《洞》 9.2分
- 《摩登时代》 9.2分
- 《东京物语》 9.2分
- 《忠犬八公的故事》 9.2分
- 《城市之光》 9.2分
- 《海上钢琴师》 9.2分
- 《放牛班的春天》 9.2分
- 《疯狂动物城》 9.2分
- 《萨勒姆的女巫》 9.2分
- 《小鞋子》 9.2分
- 《大闹天宫》 9.2分
- 《生活多美好》 9.2分
- 《切腹》 9.2分
- 《教父1》 9.2分
- 《乱世佳人》 9.2分
- 《三傻大闹宝莱坞》 9.2分
- 《大话西游之大圣娶亲》 9.2分
- 《星际穿越》 9.2分
- 《首次登顶》 9.2分
- 《触不可及》 9.2分
- 《鬼子来了》 9.2分
- 《素媛》 9.1分
- 《大话西游》 9.1分
- 《天堂回信》 9.1分
- 《龙猫》 9.1分
- 《我的父亲，我的儿子》 9.1分
- 《鳄鱼波鞋走天涯》 9.1分
- 《天堂电影院》 9.1分
- 《迁徙的鸟》 9.1分
- 《黄金三镖客》 91分
- 《辩护人》 9.1分
- 《窃听风暴》 9.1分
- 《教父2》 9.1分
- 《美国往事》 9.1分
- 《摔跤吧！爸爸》 9.1分
- 《指环王3:王者无敌》 9.1分
- 《无间道1》 9.1分
- 《蝙蝠侠：黑暗骑士》 9.1分
- 《天空之城》 9.1分
- 《天堂电影院》 91分
- 《两杆大烟枪》 9.1分
- 《飞越疯人院》 91分
- 《钢琴家》 9.0分
- 《怦然心动》 9.0分
- 《楚门的世界》 9.0分
- 《爱·回家》 9.0分
- 《活着》 9.0分
- 《海洋》 9.0分
- 《日本国古屋敷村》 9.0分
- 《沉静如海》 9.0分
- 《饮食男女》 90分
- 《狩猎》 9.0分
- 《完美的世界》 9.0分
- 《追随》 9.0分
- 《我爱你》 9.0分
- 《搏击俱乐部》 9.0分
- 《我不是药神》 9.0分
- 《当幸福来敲门》 9.0分
- 《卡比利亚之夜》 9.0分
- 《寻梦环游记》 9.0分
- 《罗马假日》 9.0分
- 《哈尔的移动城堡》 9.0分
- 《闻香识女人》 9.0分
- 《少年派的奇幻漂流》 9.0分
- 《死亡诗社》 9.0分
- 《指环王2:双塔奇兵》 9.0分 
```

### totoread

```
开源项目推荐：reFlutter——一款针对Flutter应用逆向工程的利器
https://blog.csdn.net/gitblog_00443/article/details/141208035
最新商家端Anti-Content参数逆向分析（0as）（需要订阅专栏99）
https://blog.csdn.net/qiulin_wu/article/details/137346226
推荐文章：深入探索Android逆向的利器 —— Super JADX
https://blog.csdn.net/gitblog_01026/article/details/141486240
逆向学习系列（二）抓包软件的使用以Charles为例（真机）
https://blog.csdn.net/kxltsuperr/article/details/142092968
安卓逆向基础流程（纯小白教程）
https://blog.csdn.net/liKeQing1027520/article/details/138134138
App逆向安全（一）抓包与脱壳
https://mp.weixin.qq.com/s/9SSpVnA68R1FapGzccBVkg
【JS逆向百例】酷某音乐 wasm 逆向
https://www.freebuf.com/articles/web/409490.html
APP逆向百例五-Flutter逆向案例----某次元（AES+RSA）
https://blog.csdn.net/A_fanyifan/article/details/141462500
安卓逆向工具汇总
https://github.com/WuFengXue/android-reverse
```