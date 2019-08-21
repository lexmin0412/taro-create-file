// 页面模版
const echoPageTemplate = (pathname) => {
  return `import Taro, { Component, Config } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { ComponentClass } from 'react';
import { View } from '@tarojs/components';
import { IPageState, IProps, IPageOwnProps } from './${pathname}.itf'
import './${pathname}.scss';

interface Index {
  props: IProps;
  // this的属性可以在这里定义
}

@connect(({}) => {
	return {};
})

class Index extends Component {
  config: Config = {
    navigationBarTitleText: ''
  };

  state: IPageState = {};

  componentDidMount() {}

  componentDidShow() {}

  render() {
    return (
      <View className='${pathname}-page'>
        <view>page</view>
      </View>
    );
  }
}
export default Index as ComponentClass<IPageOwnProps, IPageState>;

`;
} 

module.exports = echoPageTemplate