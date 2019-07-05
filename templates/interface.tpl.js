// interface模板
const echoInterfaceTpl = () => {
  return `
/**
* IPageStateProps
*/
interface IPageStateProps {
  
}

/**
* 定义dispatch
*/
interface IPageDispatchProps {
 dispatch: (arg0: any) => any;
}

/**
* 界面属性定义
*/
export interface IPageOwnProps {}


/**
* 组件需要的Props定义
*/
export interface IPageState {

}
/**
* IProps
*/
export type IProps = IPageStateProps & IPageDispatchProps & IPageOwnProps;`
} 

module.exports = echoInterfaceTpl