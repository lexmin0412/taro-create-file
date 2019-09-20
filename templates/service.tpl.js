/**
 * service文件模版
 * @param {string} pathname 文件名
 */

const echoServiceTpl = (pathname) => {
	return `
import BaseRequest from '../utils/request';

class ${pathname}Service extends BaseRequest {
	constructor() {
		super({ 
			hostKey: '' 
		});
	}
	public getData(data): Promise<any> {
		return this.post('url', data);
	}
}

export default new ${pathname}Service();
`
}

module.exports = echoServiceTpl