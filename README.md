# taro-file-template

## Introduction

taro-template，基于nodejs的fs模块实现命令行快速创建taro文件模板

### Installation

```shell
yarn add taro-template -D
```

### Config

在 `package.json` 中添加如下的script

```json
{
  "scripts": {
    "template": "node node_modules/taro-template/template.js"
  }
}
```

### Usage

- 创建页面(同步创建scss和interface)

```bash
yarn template p directoryPath fileName fileDesc
```

- 创建model

```bash
yarn template m directoryPath fileName fileDesc
```

- 创建service

```bash
yarn template s directoryPath fileName fileDesc
```

- 创建component

```bash
yarn template s directoryPath fileName fileDesc
```

### Command Params

|参数|描述|默认值|参数说明|
|---|---|---|---|
|fileType|文件类型|无，必传|string p-page-页面 m-model-数据model s-service-服务类 c-component-组件|
|directoryPath|文件夹路径|无，必传|string|
|fileName|文件名|无，必传|string|
|fileDesc|文件描述|'文件描述'|string|
