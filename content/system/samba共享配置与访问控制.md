---
title: Samba 共享配置与访问控制
description: "在 Ubuntu 上安装 Samba、配置共享目录并按用户组限制访问，同时启用 full_audit 审计、recycle 回收站与 rsyslog 日志。"
date: 2024-01-01
tags:
  - 基础与环境
  - Samba
  - Linux
  - 权限控制
---
## 安装 samba

```bash
sudo apt update
sudo apt upgrade
sudo apt install samba -y
```

## 创建共享文件夹

```bash
cd /home/ubuntu
mkdir sharefolder
```

## 创建用户并分配不同用户组

```bash
# 创建用户组
groupadd person
useradd -s /sbin/nologin -M -g person user1
useradd -s /sbin/nologin -M -g person user2
# 创建管理员用户组
groupadd personadmin
useradd -s /sbin/nologin -M -g personadmin useradmin1
useradd -s /sbin/nologin -M -g personadmin useradmin2
# 设置密码
smbpasswd -a XXXX
smbpasswd -a user1
smbpasswd -a user2
smbpasswd -a useradmin1
smbpasswd -a useradmin2
```

## 修改 samba 配置

### 在这个位置

![](https://lideshan.cn/zb_users/upload/2022/05/202205271057358974598.png)

### 添加以下信息

```text
[spider]  # 共享的名字
   comment = sambaadmin dm # 共享的简介
   path = /home/ubuntu/sharefolder   # 共享路径
   public = yes   # 是否开放
   writeable = yes   # 是否可写
   read only = no   # 是否只读
   valid users = @person, @personadmin # 允许访问的用户组,用户直接dm1,d1
   create mask = 0777 # 创建文件给予的权限
   force create mask = 0777  # 强制文件的权限
   directory mask = 0777   # 创建文件夹给予的权限
   force directory mask = 0777 # 强制文件夹的权限
   force user = ubuntu   # 强制归属于ubuntu用户
   browseable = yes   # 允许打开
   available = yes
```

`public = yes` 等价于同时打开 `guest ok` 和 `guest only`，任何人都能匿名访问这个共享，和下面的 `valid users` 是冲突的。要按用户组限制访问时，去掉 `public = yes`，只保留 `valid users`；确实需要放开匿名访问时，再去掉 `valid users`。参数含义见 Samba 官方手册的 `smb.conf.5`。

`writeable`、`browseable`、`force create mask` 都是官方手册认可的写法，`writeable` 与 `writable`、`browseable` 与 `browsable` 等价。

## 重启 samba 服务

<font color=Red>注意：重启服务的时候一定要把正在操作的文件给关闭掉，不然可能会出问题</font>

```bash
sudo /etc/init.d/smbd restart
```

## 账号不能使用问题

```bash
# 删除samba账号
sudo smbpasswd -d lds
# 删除用户
sudo userdel -r lds
# 创建没有文件夹的账号
sudo useradd -s /sbin/nologin -M -g dmai lds
# 设置samba账号密码
sudo smbpasswd -a lds
```

## 启用审计与回收站

在 `/etc/samba/smb.conf` 里给共享段追加下面的配置。`full_audit` 会把每次文件操作记进系统日志，`recycle` 则把删除的文件挪到回收站目录而不是直接删掉。

```text
log file = /data/samba_log/log.%I
vfs object = full_audit
full_audit:prefix = %u|%I|%m|%S
full_audit:success = connect disconnect opendir mkdir rmdir closedir open close fchmod chown fchown chdir rename unlink pwrite write create delete
full_audit:failure = none
full_audit:facility = LOCAL5
full_audit:priority = notice
vfs object = recycle
recycle:repository = /data/deleted/%U
recycle:keeptree = Yes
recycle:versions = Yes
recycle:maxsize = 0
recycle:exclude = *.tmp ,*.TMP
```

`log file` 指向的目录要先建好并给 Samba 进程写权限，否则服务起不来。`recycle:repository` 指向的目录同理。

## 输出日志到文件

审计模块用的是 `local5` 这个 facility，在 `/etc/rsyslog.conf` 里加一条规则就能把日志落到文件：

```text
local5.* /data/log/samba/info.log
```

改完 rsyslog 配置后重启 rsyslog 服务生效：

```bash
sudo systemctl restart rsyslog
```

## 相关笔记

- [Linux 代理配置](./linux代理配置.md)：同一台 Ubuntu 服务器上的网络代理配置。
