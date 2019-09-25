const wtils = require('wtils')


/**
 * taro页面模版
 * @param {string} filename 文件名
 * @param {string} desc 文件描述
 */
const echoPageTemplate = (filename, desc) => {
  return `/**
 * ${desc||'页面描述'}
 */
  
import Taro, { Component, Config } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { ComponentClass } from 'react';
import { View } from '@tarojs/components';

import { IPageState, IProps, IPageOwnProps } from './${filename}.itf'

import './${filename}.scss';

/**
 * 类的属性
 */
interface ${wtils.transFirstLetterToUpper(filename)} {
  props: IProps;
  // this的属性可以在这里定义
}

@connect(({}) => {
	return {};
})

class ${wtils.transFirstLetterToUpper(filename)} extends Component {
  config: Config = {
    navigationBarTitleText: '${desc}'
  };

  state: IPageState = {};

  componentDidMount() {}

  componentDidShow() {}

  render() {
    return (
      <View className='${filename}-page'>
        <View>${desc||'页面描述'}</View>
      </View>
    );
  }
}
export default ${wtils.transFirstLetterToUpper(filename)} as ComponentClass<IPageOwnProps, IPageState>;

`;
} 

module.exports = echoPageTemplate