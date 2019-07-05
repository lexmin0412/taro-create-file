// 页面模版
const echoPageTemplate = (pathname) => {
  return `import Taro, { Component, Config } from '@tarojs/taro';
import { View } from '@tarojs/components';
// tslint:disable-next-line:no-implicit-dependencies
import { ComponentClass } from 'react';
import { IPageState, IProps, IPageOwnProps } from './${pathname}.itf'
import './${pathname}.scss';

interface Index {
  props: IProps;
  // this的属性可以在这里定义
}

/**
 * 界面
 */
class Index extends Component {
  config: Config = {
    navigationBarTitleText: ''
  };

  state: IPageState = {};

  /**
   * 在微信/百度/字节跳动/支付宝小程序中这一生命周期方法对应 app 的 onLaunch，在 componentWillMount 后执行
   */
  componentDidMount() {}

  /**
   * 页面显示/切入前台时触发
   */
  componentDidShow() {}

  /**
   * render 函数
   */
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