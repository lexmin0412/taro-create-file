/**
 * 命令逻辑处理文件
 */

const fs = require('fs');
const echoServiceTpl = require('./templates/service.tpl')
const echoInterfaceTpl = require('./templates/interface.tpl')
const echoPageTemplate = require('./templates/page.tpl')
const echoScssTpl = require('./templates/scss.tpl')
const echoModelTpl = require('./templates/model.tpl')
const echoCompTpl = require('./templates/component.tpl')
const addRouteInEntry = require('./addline/app')

const typeArray = ['m', 's', 'p', 'c'];

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
const compTep = echoCompTpl(filename, fileDesc)  // component模版

// 当命令输入错误时弹出的tips
function exampleTips() {
	console.log('命令使用例子：');
	console.log('创建页面：yarn template p directoryPath fileName fileDesc');
	console.log('创建model：yarn template m directoryPath fileName fileDesc');
	console.log('创建service：yarn template s directoryPath fileName fileDesc');
	console.log('创建component：yarn template c directoryPath fileName fileDesc');
}

// 判断文件类型
if (!type || typeArray.indexOf(type) < 0) {
	console.log("操作类型只能是：['m', 's', 'p', 'c']");
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

// 先判断 如果没有相应的容器文件夹 则先创建一个
if ( !fs.existsSync('./src/pages') && type === 'p' ) {
	fs.mkdirSync('./src/pages')
}
if ( !fs.existsSync('./src/models') && type === 'm' ) {
	fs.mkdirSync('./src/models')
} 
if ( !fs.existsSync('./src/services') && type === 's' ) {
	fs.mkdirSync('./src/services')
}
console.log(!fs.existsSync('./src/components'), type === 'c');

if ( !fs.existsSync('./src/components') && type === 'c' ) {
	fs.mkdirSync('./src/components')
}

// 定义文件夹路径
const pageDirectoryPath = `./src/pages/${pathname}`;
const modelDirectoryPath = `./src/models/${pathname}`;
const serviceDirectoryPath = `./src/services/${pathname}`;
const componentDirectoryPath = `./src/components/${pathname}`

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
		// addRouteInEntry('', `pages/${pathname}/${filename}`, pathname)
		
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
		fs.writeFileSync(`${modelDirectoryPath}/${filename}.ts`, modelTep);
		break;
	case 'c': 
		const isComponentDirectoryExisted = fs.existsSync(`${componentDirectoryPath}/${filename}.ts`)
		const isComponentFileExisted = fs.existsSync(componentDirectoryPath);
		if (isComponentDirectoryExisted) {
			console.log('该文件已经存在！！');
			process.exit(0);
		}
		if ( !isComponentFileExisted ) {
			fs.mkdirSync(componentDirectoryPath)
		}
		fs.writeFileSync(`${componentDirectoryPath}/${filename}.tsx`, compTep);
		fs.writeFileSync(`${componentDirectoryPath}/${filename}.scss`, scssTep);
		break;
}
console.log('文件创建成功！！！');
process.exit(0);
