/**
 * taro组件模版
 * @param {string} fileName 文件名
 * @param {string} desc 文件描述
 */

const echoCompTpl = (fileName, desc) => {
  return `import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import './${fileName}.scss'

/**
 * props属性
 */
interface IProps {
  
}

/**
 * 组件内部属性
 */
interface IState {
  
}

export default class ${fileName.slice(0,1).toUpperCase()}${fileName.slice(1)} extends Component<IProps, IState> {

  render () {
    return (
      <View>${desc}</View>
    )
  }
}
`
}

module.exports = echoCompTpl
