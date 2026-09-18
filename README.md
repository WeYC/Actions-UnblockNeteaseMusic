# Actions-UnblockNeteaseMusic

上游 `UnblockNeteaseMusic/server` 的自动构建器：手动触发，合并指定 PR，编译 Windows 可执行文件和多架构 Docker 镜像并发布。

- 上游官方仓库：https://github.com/UnblockNeteaseMusic/server
- 上游 PR（构建时自动合并）：https://github.com/UnblockNeteaseMusic/server/pull/1754

## 特性

- 开箱即用：单个 `win-x64` 可执行文件，不依赖 `Node.js`
- 紧跟上游：基于官方 `enhanced` 分支，含 `PR #1754` 的新客户端 `xeapi` 适配
- 零配置启动：首次运行自动生成`config.ini`配置文件，运行自动读取。
- 默认开启免 `cookie` 的音源
- 多架构镜像：`amd64/arm64/armv6/armv7` 推到 `GHCR`，`latest` 加版本号双标签

## 用法

1. 打开 `Actions` → `Build Actions-UnblockNeteaseMusic` → `Run workflow`
2. `tag` 输入框：版本号，默认 `0.28.1`，留空则只传 `Artifact` 不发版
3. 下载 `exe` 双击运行，同目录会自动生成 `config.ini`，记事本直接改，改完重启生效

## config.ini

```ini
[source]
order = kugou bodian kuwo bilibili bilivideo

[cookie]
qq =
migu =
joox =
```

- 默认只开免 cookie 的 5 路；`migu/qq/joox` 要 cookie 的自己填
- 命令行 `-o` 优先于文件；`pyncmd` 实测可用但默认关闭（跟随官方，避免给第三方服务器添压），需要自己加到 `order` 里
- `youtube` 系（`youtube/youtubedl/ytdlp`）要非大陆 IP，大陆机器不要开

## Docker

```sh
docker pull ghcr.io/weyc/unblockneteasemusic:0.28.1
docker run -d -p 8080:8080 -p 8081:8081 ghcr.io/weyc/unblockneteasemusic:0.28.1
```

## 说明

- **自用** 不保证稳定性
- 可执行文件当前只编 `win-x64`，镜像覆盖 4 架构
