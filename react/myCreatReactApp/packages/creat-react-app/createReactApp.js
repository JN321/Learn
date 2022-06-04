const {
  Command
} = require('commander');
const chalk = require('chalk');
const packageJSON = require('./package.json');
const fs = require('fs-extra') // 加强版本的fs模块，可以增删改目录
const path = require('path')

async function init() {
  let projectName;
  new Command(packageJSON.name)
    .version(packageJSON.version)
    .arguments('<project-directory>') // 可以理解为形参，接收appnamme
    .usage(`${chalk.green('<project-directory>')}`) // 在控制台打印绿色文字。
    .action((name) => {
      // 通过控制台输入的命令获取appname
      // 控制台通过 npm run creat-react-app -- [这里是入参，appname]
      projectName = name
    }).parse(process.argv) // process.argv 的值为 [node完整路径，当前node脚本的路径，...其他参数]
  console.log("projectName", projectName);
  await creatApp(projectName)
}
async function creatApp(appname) {
  let root = path.resolve(appname) // 生成appname的结对路径

  // 创建的文件夹
  fs.ensureDirSync(appname)

  console.log(`creating a new app ( ${chalk.green(appname)} ) in ${chalk.green(root)}`);
  const packageJSON = {
    name: appname,
    version: '0.1.0',
    private: true
  }

  // 创建文件
  fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify(packageJSON, null, 2))

  const originalDirectory = process.cwd(); // 原始的工作目录
  process.chdir(root) // change dir 改变工作目录

  console.log('root', root);
  console.log('originalDirectory', originalDirectory);

  await run(root, appname, originalDirectory)
}

function run(root, appname, originalDirectory) {
  let scriptName = 'react-scripts'; // 
  let templateName = 'cra-template';
  const allDependencies = ['react', 'react-dom'];
}

module.exports = {
  init
}