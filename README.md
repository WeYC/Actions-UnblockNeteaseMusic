# Actions-UnblockNeteaseMusic

上游 `UnblockNeteaseMusic/server` 的自动构建器：手动触发，合并指定 PR，编译 Windows 可执行文件并发布。

- 上游官方仓库：https://github.com/UnblockNeteaseMusic/server
- 上游 PR（构建时自动合并）：https://github.com/UnblockNeteaseMusic/server/pull/1754

## 做了什么

- 拉取上游 `enhanced` 分支，合并 `PR #1754`（新客户端 `xeapi` 加密适配 + 本地 VIP 图标补全）
- 打启动补丁（`patches/config-ini.patch`）：`exe` 首次启动时在同目录自动生成 `config.ini`
- `yarn build`（webpack）→ `pkg --compress Brotli -t node18-win-x64` 编译
- 产物上传 `Artifact`，填了版本号就同时发到 `Release`

## 用法

1. 打开 `Actions` → `Build Actions-UnblockNeteaseMusic` → `Run workflow`
2. `tag` 输入框：版本号，默认 `0.28.1`，留空则只传 `Artifact` 不发版
3. 下载 `exe` 双击运行，同目录会自动生成 `config.ini`，记事本直接改，改完重启生效

## config.ini

```ini
[source]
order = kugou bodian kuwo bilibili bilivideo pyncmd

[cookie]
qq =
migu =
joox =
```

- 默认只开免 cookie、大陆可用的 6 路；`migu/qq/joox` 要 cookie 的自己填
- 命令行 `-o` 优先于文件；`pyncmd` 已实测可用
- `youtube` 系（`youtube/youtubedl/ytdlp`）要非大陆 IP，大陆机器不要开

## 说明

- 当前只编 `win-x64`
- `Action` 版本跟随上游写法（`checkout/setup-node/upload-artifact v7` 等）
