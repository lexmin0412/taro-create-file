/**
 * pages模版快速生成脚本,执行命令 yarn template p `文件名`
 * models模版快速生成脚本,执行命令 yarn template m `文件名`
 * services模版快速生成脚本,执行命令 yarn template s `文件名`
 */

const fs = require('fs');
const echoServiceTpl = require('./templates/service.tpl')
const echoInterfaceTpl = require('./templates/interface.tpl')
const echoPageTemplate = require('./templates/page.tpl')
const echoScssTpl = require('./templates/scss.tpl')
const echoModelTpl = require('./templates/model.tpl')
const addRouteInEntry = require('./addline/app')

const typeArray = ['m', 's', 'p'];

const type = process.argv[2];
const pathname = process.argv[3];
const filename = process.argv[4]
const fileDesc = process.argv[5]  // 文件描述
console.log(process.argv);

// 根据传入的文件路径和文件名称生成模板字符串
const serviceTep = echoServiceTpl(filename)   // service模板
const itfTpl = echoInterfaceTpl(filename)     // interface模板
const indexTep = echoPageTemplate(filename, fileDesc)   // page模板
const scssTep = echoScssTpl(filename)         // scss模板
const modelTep = echoModelTpl(filename)       // model模板

// 当命令输入错误时弹出的tips
function exampleTips() {
	console.log('命令使用例子：');
	console.log('示例1：yarn template p test');
	console.log('示例2：yarn template m test');
	console.log('示例3：yarn template s test');
}

// 判断文件类型
if (!type || typeArray.indexOf(type) < 0) {
	console.log("操作类型只能是：['m', 's', 'p']");
	exampleTips();
	process.exit(0);
}

// 验证文件夹名称
if (!pathname) {
	console.log('文件夹名称不能为空！');
	exampleTips();
	process.exit(0);
}

const pathnameParentDivider = pathname.slice(0, pathname.indexOf('/')+1)
console.log('剪切后的父文件夹名称', pathname)

// 定义文件夹路径
const pageDirectoryPath = `./src/pages/${pathname}`;
const modelDirectoryPath = `./src/models/${pathname}`;
const serviceDirectoryPath = `./src/services/${pathname}`;

// 根据传入的参数创建文件
switch (type) {
	case 'p':
		const isDirectoryExsited = fs.existsSync(pageDirectoryPath)   // 文件夹是否存在
		const isFileExisted = fs.existsSync(`${pageDirectoryPath}/${filename}.tsx`);  // 文件是否存在
		// 验证文件是否已经存在
		if (isFileExisted) {
			console.log('该文件已经存在！！');
			process.exit(0);
		}
		// 如果文件夹不存在则创建文件夹
		if ( !isDirectoryExsited ) {
			// 如果存在嵌套 先创建父文件夹
			if ( pathname.includes('/') ) {
				fs.mkdirSync(`./src/pages/${pathnameParentDivider}`)
			}
			fs.mkdirSync(`${pageDirectoryPath}`);
		}

		// 在app.tsx中添加路由
		addRouteInEntry('', `pages/${pathname}/${filename}`, pathname)
		
		// 创建文件
		fs.writeFileSync(`${pageDirectoryPath}/${filename}.tsx`, indexTep);
		fs.writeFileSync(`${pageDirectoryPath}/${filename}.scss`, scssTep);
		fs.writeFileSync(`${pageDirectoryPath}/${filename}.itf.ts`, itfTpl);
		break;
	case 's':
		const isServiceDirectoryExisted = fs.existsSync(serviceDirectoryPath)
		const isServiceFileExisted = fs.existsSync(`${serviceDirectoryPath}/${filename}.service.ts`);
		if (isServiceFileExisted) {
			console.log('该文件已经存在！！');
			process.exit(0);
		}
		if ( !isServiceDirectoryExisted ) {
			fs.mkdirSync(serviceDirectoryPath)
		}
		fs.writeFileSync(`${serviceDirectoryPath}/${filename}.service.ts`, serviceTep);
		break;
	case 'm':
		const isModelDirectoryExisted = fs.existsSync(`${modelDirectoryPath}/${filename}.ts`)
		const isModelFileExisted = fs.existsSync(modelDirectoryPath);
		if (isModelFileExisted) {
			console.log('该文件已经存在！！');
			process.exit(0);
		}
		if ( !isModelDirectoryExisted ) {
			fs.mkdirSync(modelDirectoryPath)
		}
		fs.writeFileSync(`${modelDirectoryPath}${filename}.ts`, modelTep);
		break;
}
console.log('文件创建成功！！！');
process.exit(0);
