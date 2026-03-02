## 查看主机支持的cuda版本

### 控制面板

查看支持的最大版本 ![控制面板.png](https://i-blog.csdnimg.cn/img_convert/f8eeeaa0373ba8510fe391e77af4e1ef.png)

## 下载支持的cuda版本

### 11.8这个版本比较稳定

[cuda各个版本下载](https://developer.nvidia.com/cuda-toolkit-archive) 一路默认安装即可 ![cuda.png](https://i-blog.csdnimg.cn/img_convert/86c47b16e304eb55e0a91747b1f6c3b8.png)

## 下载对应cuda版本的cudnn版本

[各个cudnn版本](https://developer.nvidia.com/cuda-toolkit-archive) 一路默认安装即可 ![cudnn.png](https://i-blog.csdnimg.cn/img_convert/c74c1a7d85d940deead0992fa98fdef9.png)

## 下载对应cuda的torch版本

[torch版本](https://pytorch.org/get-started/locally/)

```bash
pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
```

![torch.png](https://i-blog.csdnimg.cn/img_convert/121fd91e024454a713d304cb2b212b7a.png)

## 测试炼丹的环境安装是否安装成功

```python
import torch
torch.__version__
torch.cuda.is_available()
```

![torch_check.png](https://i-blog.csdnimg.cn/img_convert/d5ce80ef7bbfddebdd41fa5d9ebc95e7.png)