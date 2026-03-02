
# mongodb

## 拉镜像
```
docker pull mongo:4.4-rc
```
## 启动

```
windows指定数据存放路径
docker run --rm --name mongo -d -p 27017:27017 -v D:\Mongodb\master\data:/data/db mongo:4.4-rc
```


# 安装Docker
```
https://www.docker.com/get-started
下载安装即可
```
# 拉取mongo镜像
```
docker pull mongo:latest
# 视网络情况,快的话几秒就可以拉取慢的话几分钟
```
# 创建数据卷
```
docker volume create --name mongodata
# 删除的命令是
docker volume rm XXX
```
# 创建容器
```
docker run -p 27017:27017 --name=mongodb -v mongodata:/data/db -d mongo
```
# others
之后容器被误删,数据卷都还在的，使用上面的命令创建容器,数据还在