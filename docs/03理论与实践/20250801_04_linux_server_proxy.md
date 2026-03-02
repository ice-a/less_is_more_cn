# 在无 GUI Linux 系统中通过 Web UI 管理代理

在无图形界面的 Linux 服务器环境中，管理和配置网络代理通常需要通过命令行操作，将介绍如何使用 yilee01/mihomo-yacd:latest 镜像，通过 Docker 容器同时启动 Mihomo（Clash 的增强版）和 Yacd Web UI，实现在 Web 端轻松管理代理和订阅

## Docker Compose 配置

创建 `docker-compose.yml` 文件：

```yaml
version: "3.3"
services:
  mihomo:
    container_name: mihomo
    image: yilee01/mihomo-yacd:latest
    ports:
      - 7890:7890
      - 9090:9090
    volumes:
      - ./config:/root/.config/mihomo
    restart: on-failure:3
```

## 基础配置 (config.yaml)

`./config/config.yaml`

### code

```yaml
mixed-port: 7890
allow-lan: true
external-controller: 0.0.0.0:9090

mode: rule
log-level: info
ipv6: false
unified-delay: true

geo-update-interval: 24
geox-url:
  geoip: https://gh-proxy.com/https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geoip-lite.dat
  geosite: https://gh-proxy.com/https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geosite.dat
  mmdb: https://gh-proxy.com/https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geoip.metadb
  asn: https://gh-proxy.com/https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/GeoLite2-ASN.mmdb

tun:
  enable: false
  stack: system
  auto-route: true
  auto-detect-interface: true

# URL 延迟检测 通用配置
my-url-test: &my-url-test # 延迟检测 URL
  health-check:
    enable: true
    url: https://cp.cloudflare.com
    # 节点连通性检测时间，单位为秒
    interval: 300
    # 节点超时延迟，单位为毫秒
    timeout: 1000
    # 节点自动切换差值，单位为毫秒
    tolerance: 100

proxy-groups:
  - name: "第三方跳板1"
    type: select
    use:
      - "iKuuu_V2"

proxy-providers:
  "iKuuu_V2":
    type: http
    url: "xxxxxxxx"
    path: /root/.config/mihomo/test.yaml
    # 自动更新订阅时间，单位为秒
    interval: 3600 # 一小时
    # URL 延迟检测逻辑
    <<: *my-url-test
rules:
  #- PROCESS-PATH,/usr/bin/xray,DIRECT
  - PROCESS-NAME,ddns-go,DIRECT
  - PROCESS-NAME,xray,DIRECT
  - PROCESS-NAME,qbittorrent-nox,DIRECT
  - MATCH,第三方跳板1
```

## 启动服务

```bash
docker compose up -d
```

## 访问管理界面

在浏览器中访问：http://服务器 IP:9090 即可打开 Yacd 管理界面。

端口说明
7890: 代理端口（SOCKS5/HTTP）
9090: Yacd Web 管理界面端口

## 验证代理是否工作

```bash
curl --socks5 127.0.0.1:7890 https://ifconfig.me/ip
```

如果返回的 IP 地址与您的服务器 IP 不同，说明代理已成功工作。
