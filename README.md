# UnblockNeteaseMusic
解锁网易云音乐客户端变灰歌曲

- 上游官方仓库：https://github.com/UnblockNeteaseMusic/server
- 上游 PR（构建时自动合并）：https://github.com/UnblockNeteaseMusic/server/pull/1754

## 特性

- 紧跟上游：基于官方 `enhanced` 分支，含 `PR #1754` 的新客户端 `xeapi` 适配
- 首次运行自动生成 `config.ini` 并自动读取
- 默认开启免 `cookie` 的音源

## config.ini

```ini
[source]
order = kugou bodian kuwo bilibili bilivideo

[cookie]
qq =
migu =
joox =

[env]
ENABLE_FLAC =
ENABLE_LOCAL_VIP =
MIN_BR =
LOG_LEVEL =
;其余见自动生成的 config.ini
```

- 默认只开免 cookie 的 音源
- 命令行 `-o` 优先于文件；`[env]` 对应上游环境变量表，真实环境变量优先于文件

## Docker

```sh
docker pull ghcr.io/weyc/unblockneteasemusic:0.28.1
docker pull weycovo/unblockneteasemusic:0.28.1
docker run -d -p 8080:8080 -p 8081:8081 weycovo/unblockneteasemusic:0.28.1
```

## 说明

- **自用** 不保证稳定性
- 可执行文件当前只编 `win-x64`，镜像覆盖 4 架构
