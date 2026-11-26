---
title: Shell 配置
description: "Shell 环境配置记录：安装 zsh、oh-my-zsh 与常用插件的步骤。"
date: 2022-01-01
tags:
  - 工具与配置
  - Git
---
## 安装 zsh 并设置
```bash
sudo apt install zsh -y
# 设置为默认shell
sudo chsh -s $(which zsh)
```
## 安装 oh-my-zsh
```bash
sh -c "$(wget https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh -O -)"
```
## 设置主题
```bash
vim ~/.zshrc
# 将 ZSH_THEME="robbyrussell" 修改为 ZSH_THEME="ys"
# 重新加载配置
source ~/.zshrc
```
## 安装配置 oh-my-zsh 插件
- autosuggestion 插件
	- 根据历史命名进行填充
	- `git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions`
	- 编辑 zshrc 添加插件
	- `vim ~/.zshrc`  ![image.png](http://doc.lideshan.top/media/202405/2024-05-31_105016_5585980.6764067161679452.png)
	- 重新加载配置 `source ~/.zshrc`
	- 修改配置字体改亮
	- `cd ~/.oh-my-zsh/custom/plugins/zsh-autosuggestions`
	- `vim zsh-autosuggestions.zsh`
	- `ZSH_AUTOSUGGEST_HIGHLIGHT_STYLE='fg=10'`
- 语法高亮插件
	- `sudo apt install zsh-syntax-highlighting`
	- `echo "source /usr/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh" >> ~/.zshrc`
	- `source ~/.zshrc`
