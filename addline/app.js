const fs = require('fs')

/**
 * filePath 插入的文件路径
 * lineStr 插入行字符串
 * directoryPath 创建文件的存放路径
 */
module.exports = ( filePath, lineStr, directoryPath ) => {
  // 设置入口文件路径 未传则使用src下的app.tsx文件
  const entryName = filePath || "src/app.tsx"

  // 读取文件 用换行符切割为字符串数组
  let fileStrArr = fs.readFileSync(entryName).toString().split("\n")

  console.log('切割完成的文件',fileStrArr)

  // 寻找page属性开始的行
  const pageAttrStartIndex = fileStrArr.findIndex((item, index) => {
    return item.includes('pages: [')
  })
  // 寻找page属性结束的行
  const pageAttrEndIndex = fileStrArr.findIndex((item,index)=>{
    return item.includes('],') && index > pageAttrStartIndex
  })
  console.log('开始行', pageAttrStartIndex, '结束行', pageAttrEndIndex)

  // 寻找合适插入的行(已经存在相似路径的路由)
  console.log('查找路由', directoryPath)
  let similarRouteLine = fileStrArr.findIndex((item,index)=>{
    if ( item.includes(directoryPath) && index > pageAttrStartIndex && index < pageAttrEndIndex ) {
      if ( !fileStrArr[index + 1].includes(directoryPath) ) {
        return true
      }
    }
  })
  similarRouteLine = similarRouteLine > -1 ? similarRouteLine : pageAttrEndIndex-1
  console.log('同路径路由行数', similarRouteLine)

  // 创建新数组 插入路由声明代码
  // TODO: 这里需要优化插入规则 找到相似的路由后在其后插入新页面
  let newArray = []
  newArray[similarRouteLine + 1] = `\t\t\t'${lineStr}',`
  fileStrArr.forEach((item, index) => {
    if (index <= similarRouteLine) {
      newArray[index] = item
    }
    else {
      newArray[index + 1] = fileStrArr[index]
    }
  })
  console.log('newArray', newArray)

  fs.writeFileSync(entryName, newArray.join('\n'))
}