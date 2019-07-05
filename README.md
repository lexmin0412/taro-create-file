### Introduction
taro-template，基于fs实现命令行快速创建taro文件模板

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
```
yarn template p directoryName fileName
```
- 创建model
```
yarn template m directoryName fileName
```
- 创建service
```
yarn template s directoryName fileName
```