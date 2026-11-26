# 内容提取说明

从原 `docs/` 提取 88 篇文章，按功能重新组织到 9 个目录。

## 目录结构

- `life/` —— 生活随笔（5 篇）
- `resources/` —— 资源与链接（10 篇）
- `system/` —— 系统与运维（14 篇）
- `docker/` —— 容器与中间件（4 篇）
- `web/` —— 网络服务与接口（9 篇）
- `scripts/` —— 脚本集合（20 篇）
- `ai/` —— AI 与模型（8 篇）
- `reverse/` —— 爬虫与逆向（9 篇）
- `tools/` —— 工具与效率（9 篇）

根目录另有 `index.md`（原首页）、`navigation.md`（常用导航）、`about.md`、`donate.md`（原赞助页）。

## 已做的内容修复

- 文件名去掉 `YYYYMMDD_NN_` 日期序号前缀，只留主题名
- frontmatter 统一为 `title / description / date / tags`，移除 `category / order / layout / icon` 等主题相关字段
- 移除依赖现有主题的 Vue 组件标签：`<Hitokoto />`、`<AdCarousel />`、`<SponsorInfo />`
- `navigation.md` 由原 `<Navigation />` 组件改为依据 `.vitepress/data/1.json` 展开的真实链接清单（522 条）
- 文内相对链接全部改写为新路径，旧文锚点保留
- 补齐文件末尾换行，压缩多余空行

## 注意事项

- 图片均为外部图床（img.lideshan.top / i-blog.csdnimg.cn / cdn.nlark.com 等），未本地化；重建后建议逐张确认可用性
- 原文中的 VitePress 特有写法（如图片 `#pic_center` 后缀、`order` 排序）已去掉或不生效，重建时自行设置导航顺序
- 原 `docs/` 目录保持不动，可直接对照

## 重建站点建议

- 把 `content/` 直接作为新工程的文档根目录，9 个分组目录对应 9 个侧边栏分组
- 每篇笔记已有 `title / description / date / tags`；如需排序可自行补 `order`
- 根目录的 `index.md`（首页）、`navigation.md`、`about.md`、`donate.md` 与分组目录平级
- Vue 组件标签已全部移除，不再依赖主题自定义组件

## 旧路径 -> 新路径

| 旧路径 | 新路径 |
| --- | --- |
| `docs/about.md` | `content/about.md` |
| `docs/04工具与配置/20251212_01_基于yolo11自产自训验证码识别模型.md` | `content/ai/基于yolo11自产自训验证码识别模型.md` |
| `docs/06AI与算法/20260302_01_利用龙猫ai实现解析数据.md` | `content/ai/利用龙猫ai实现解析数据.md` |
| `docs/06AI与算法/20250101_03_炼丹环境pytorch.md` | `content/ai/炼丹环境pytorch.md` |
| `docs/06AI与算法/20260302_02_逆向激进prompt.md` | `content/ai/逆向激进prompt.md` |
| `docs/03代码与脚本/20240725_01_验证码数据集.md` | `content/ai/验证码数据集.md` |
| `docs/06AI与算法/20250101_02_音频数据集.md` | `content/ai/音频数据集.md` |
| `docs/06AI与算法/20240101_01_tts语音合成.md` | `content/ai/tts语音合成.md` |
| `docs/04工具与配置/20251212_02_yolo11基于coco8格式的数据集训练检测代码.md` | `content/ai/yolo11基于coco8格式的数据集训练检测代码.md` |
| `docs/02基础与环境/20250101_04_docker安装elasticsearch和kibana.md` | `content/docker/docker安装elasticsearch和kibana.md` |
| `docs/02基础与环境/20250101_05_docker安装hadoop.md` | `content/docker/docker安装hadoop.md` |
| `docs/02基础与环境/20250101_06_docker部署常用服务.md` | `content/docker/docker部署常用服务.md` |
| `docs/02基础与环境/20250101_09_docker一些demo.md` | `content/docker/docker一些demo.md` |
| `docs/givemefive.md` | `content/donate.md` |
| `docs/index.md` | `content/index.md` |
| `docs/01杂记/20240613_01_出去玩谐音梗.md` | `content/life/出去玩谐音梗.md` |
| `docs/01杂记/20240101_02_路漫漫.md` | `content/life/路漫漫.md` |
| `docs/01杂记/20240101_03_生活不止眼前的苟且.md` | `content/life/生活不止眼前的苟且.md` |
| `docs/01杂记/20240514_01_苏州攻略.md` | `content/life/苏州攻略.md` |
| `docs/01杂记/20240101_04_阅读单.md` | `content/life/阅读单.md` |
| `docs/00navigation.md` | `content/navigation.md` |
| `docs/01杂记/20240101_07_福利站点收藏.md` | `content/resources/福利站点收藏.md` |
| `docs/02基础与环境/20240513_01_搞个小游戏.md` | `content/resources/搞个小游戏.md` |
| `docs/01杂记/20240911_01_逆向文章记录.md` | `content/resources/逆向文章记录.md` |
| `docs/03代码与脚本/20230101_03_前端ui库.md` | `content/resources/前端ui库.md` |
| `docs/01杂记/20240101_05_随机图api.md` | `content/resources/随机图api.md` |
| `docs/03代码与脚本/20220101_01_学习资源地址.md` | `content/resources/学习资源地址.md` |
| `docs/04工具与配置/20240101_06_一些镜像站.md` | `content/resources/一些镜像站.md` |
| `docs/01杂记/20240101_06_种子搜索地址.md` | `content/resources/种子搜索地址.md` |
| `docs/01杂记/20240101_01_aff推广链接收藏.md` | `content/resources/aff推广链接收藏.md` |
| `docs/03代码与脚本/20250101_07_github项目收藏.md` | `content/resources/github项目收藏.md` |
| `docs/05爬虫与逆向/20260302_04_补环境完全指南.md` | `content/reverse/补环境完全指南.md` |
| `docs/05爬虫与逆向/20260302_03_反爬虫与风控.md` | `content/reverse/反爬虫与风控.md` |
| `docs/05爬虫与逆向/20251101_01_爬虫本地部署使用dnsresolver.md` | `content/reverse/爬虫本地部署使用dnsresolver.md` |
| `docs/05爬虫与逆向/20260302_07_爬虫管理系统开发.md` | `content/reverse/爬虫管理系统开发.md` |
| `docs/05爬虫与逆向/20251101_02_爬虫逆向工程师.md` | `content/reverse/爬虫逆向工程师.md` |
| `docs/05爬虫与逆向/20260302_06_原型链学习计划.md` | `content/reverse/原型链学习计划.md` |
| `docs/05爬虫与逆向/20260302_05_ast解混淆学习计划.md` | `content/reverse/ast解混淆学习计划.md` |
| `docs/05爬虫与逆向/20260302_08_ios逆向开发.md` | `content/reverse/ios逆向开发.md` |
| `docs/05爬虫与逆向/20260302_02_web逆向零基础学习计划.md` | `content/reverse/web逆向零基础学习计划.md` |
| `docs/03代码与脚本/20220101_02_按文件类型批量分类文件夹.md` | `content/scripts/按文件类型批量分类文件夹.md` |
| `docs/03代码与脚本/20250101_01_常用的js代码片段.md` | `content/scripts/常用的js代码片段.md` |
| `docs/03代码与脚本/20230101_12_对比两个txt获取共同的字.md` | `content/scripts/对比两个txt获取共同的字.md` |
| `docs/04工具与配置/20240101_05_高版本labelme格式转换为低版本格式.md` | `content/scripts/高版本labelme格式转换为低版本格式.md` |
| `docs/03代码与脚本/20230101_02_获取json中最深处的一个value.md` | `content/scripts/获取json中最深处的一个value.md` |
| `docs/02基础与环境/20240101_04_筛选文件大小是0的.md` | `content/scripts/筛选文件大小是0的.md` |
| `docs/02基础与环境/20240101_05_生成docx文件.md` | `content/scripts/生成docx文件.md` |
| `docs/03代码与脚本/20231117_01_使用chatgpt将普通话转为粤语.md` | `content/scripts/使用chatgpt将普通话转为粤语.md` |
| `docs/03代码与脚本/20240528_01_使用opencv检测图片中是否有人物.md` | `content/scripts/使用opencv检测图片中是否有人物.md` |
| `docs/03代码与脚本/20260302_01_数据提取.md` | `content/scripts/数据提取.md` |
| `docs/03代码与脚本/20240101_01_相对时间变时间戳.md` | `content/scripts/相对时间变时间戳.md` |
| `docs/03代码与脚本/20230101_06_音频处理.md` | `content/scripts/音频处理.md` |
| `docs/03代码与脚本/20240101_03_优酷视频.md` | `content/scripts/优酷视频.md` |
| `docs/03代码与脚本/20240101_02_ffmpeg推流直播.md` | `content/scripts/ffmpeg推流直播.md` |
| `docs/03代码与脚本/20230101_01_opencv与pillow图片处理.md` | `content/scripts/opencv与pillow图片处理.md` |
| `docs/03代码与脚本/20250101_05_ppt转pdf.md` | `content/scripts/ppt转pdf.md` |
| `docs/03代码与脚本/20250101_06_python常见的加解密.md` | `content/scripts/python常见的加解密.md` |
| `docs/03代码与脚本/20220101_04_python相见恨晚的库.md` | `content/scripts/python相见恨晚的库.md` |
| `docs/03代码与脚本/20220101_03_sql速查.md` | `content/scripts/sql速查.md` |
| `docs/03代码与脚本/20240808_01_useragent处理.md` | `content/scripts/useragent处理.md` |
| `docs/02基础与环境/20250801_01_并发测试网站.md` | `content/system/并发测试网站.md` |
| `docs/04工具与配置/20220101_03_服务器安装jupyterlab.md` | `content/system/服务器安装jupyterlab.md` |
| `docs/04工具与配置/20220101_02_服务器安装node.md` | `content/system/服务器安装node.md` |
| `docs/02基础与环境/20250801_02_使用域名白嫖cf大善人.md` | `content/system/使用域名白嫖cf大善人.md` |
| `docs/04工具与配置/20240101_07_用multipass快速构建ubuntu环境.md` | `content/system/用multipass快速构建ubuntu环境.md` |
| `docs/02基础与环境/20240812_01_远程工具连接ubuntu一直100不动.md` | `content/system/远程工具连接ubuntu一直100不动.md` |
| `docs/04工具与配置/20230101_01_重装系统需要安装的软件.md` | `content/system/重装系统需要安装的软件.md` |
| `docs/02基础与环境/20250101_01_conda环境.md` | `content/system/conda环境.md` |
| `docs/02基础与环境/20251211_01_go环境安装.md` | `content/system/go环境安装.md` |
| `docs/02基础与环境/20250801_04_linux代理配置.md` | `content/system/linux代理配置.md` |
| `docs/02基础与环境/20220101_01_matplotlib无法显示中文解决方法.md` | `content/system/matplotlib无法显示中文解决方法.md` |
| `docs/02基础与环境/20240101_01_samba共享配置与访问控制.md` | `content/system/samba共享配置与访问控制.md` |
| `docs/04工具与配置/20220101_04_shell配置.md` | `content/system/shell配置.md` |
| `docs/02基础与环境/20220101_02_ubuntu安装nodejs版本过低.md` | `content/system/ubuntu安装nodejs版本过低.md` |
| `docs/04工具与配置/20240101_04_服务器上安装vscode远程写代码.md` | `content/tools/服务器上安装vscode远程写代码.md` |
| `docs/04工具与配置/20250101_02_开发工具清单.md` | `content/tools/开发工具清单.md` |
| `docs/04工具与配置/20261125_01_综合工具使用与推荐指南.md` | `content/tools/综合工具使用与推荐指南.md` |
| `docs/03代码与脚本/20250101_03_drissionpage挂载代理.md` | `content/tools/drissionpage挂载代理.md` |
| `docs/04工具与配置/20250101_02_es看板操作.md` | `content/tools/es看板操作.md` |
| `docs/04工具与配置/20260302_01_openclaw安装与skills配置教程.md` | `content/tools/openclaw安装与skills配置教程.md` |
| `docs/04工具与配置/20220101_05_picgo-lsky图床.md` | `content/tools/picgo-lsky图床.md` |
| `docs/04工具与配置/20240101_03_pm2定时推送git并执行mongo备份.md` | `content/tools/pm2定时推送git并执行mongo备份.md` |
| `docs/04工具与配置/20260213_01_windows好用的工具.md` | `content/tools/windows好用的工具.md` |
| `docs/04工具与配置/20240101_02_部署项目到vercel.md` | `content/web/部署项目到vercel.md` |
| `docs/02基础与环境/20240101_02_逛github收藏项目.md` | `content/web/逛github收藏项目.md` |
| `docs/04工具与配置/20250101_03_爬虫限速问题解决方案.md` | `content/web/爬虫限速问题解决方案.md` |
| `docs/04工具与配置/20250101_04_通用远程执行js代码.md` | `content/web/通用远程执行js代码.md` |
| `docs/04工具与配置/20250101_01_apiqps限流服务.md` | `content/web/apiqps限流服务.md` |
| `docs/03代码与脚本/20240813_01_flask实现模型识别接口mock.md` | `content/web/flask实现模型识别接口mock.md` |
| `docs/03代码与脚本/20250101_02_flask实现请求限速.md` | `content/web/flask实现请求限速.md` |
| `docs/03代码与脚本/20260507_01_mysql主从同步集群搭建.md` | `content/web/mysql主从同步集群搭建.md` |
| `docs/04工具与配置/20240101_01_redis布隆过滤器.md` | `content/web/redis布隆过滤器.md` |
