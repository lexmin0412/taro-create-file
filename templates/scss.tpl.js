/**
 * scss文件模版
 * @param {string} pathname 文件名
 */
const echoScssTpl = (pathname) => {
  return `.${pathname}-page {
  width: 100vw;
}
`;
} 

module.exports = echoScssTpl