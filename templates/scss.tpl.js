// scss文件模版
const echoScssTpl = (pathname) => {
  return `@import "../../styles/mixin";

.${pathname}-page {
  @include wh(100%, 100%);
}
`;
} 

module.exports = echoScssTpl