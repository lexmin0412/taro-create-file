# taro-create-file

## Introduction

taro-create-file，基于nodejs的fs模块实现命令行快速创建taro文件模板

### Installation

```shell
yarn add taro-create-file -D
```

### Config

在 `package.json` 中添加如下的script

```json
{
  "scripts": {
    "template": "node node_modules/taro-create-file/template.js"
  }
}
```

### Usage

- 创建页面(同步创建scss和interface)

```bash
yarn template p directoryPath fileName fileDesc
```

- 创建model

```shell
yarn template m directoryPath fileName fileDesc
```

- 创建service

```shell
yarn template s directoryPath fileName fileDesc
```

- 创建component

```shell
yarn template s directoryPath fileName fileDesc
```

### demo

```shell
yarn template p flowpool noticeTplList 通知模版列表 noticeTplList
```

### Command Params

|参数|描述|默认值|参数说明|
|---|---|---|---|
|fileType|文件类型|无，必传|string p-page-页面 m-model-数据model s-service-服务类 c-component-组件|
|directoryPath|文件夹路径|无，必传|string|
|fileName|文件名|无，必传|string|
|fileDesc|文件描述|'文件描述'|string|

### 更新日志

[点此前往](./CHANGELOG.md)
