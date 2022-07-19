根目录下新建 .sequelizerc 文件，复制下述代码

use strict';
const path = require('path');

module.exports = {
  config: path.join(__dirname, 'database/config.json'),
  'migrations-path': path.join(__dirname, 'database/migrations'),
  'seeders-path': path.join(__dirname, 'database/seeders'),
  'models-path': path.join(__dirname, 'app/model'),
};
执行下述命令后会生成 database/config.json 文件和 database/migrations 目录

npx sequelize init:config
npx sequelize init:migrations
修改一下 database/config.json 中的内容，将其改成项目中使用的数据库配置：

{
  "development": {
    "username": "root", // 之前安装的 mysql 的用户名密码
    "password": "123456",
    "database": "devops_dev", // 新建数据库名
    "host": "127.0.0.1", // mysql 的地址
    "dialect": "mysql"
  },
}
再通过 npx sequelize migration:generate --name=init-users 来创建用户表

module.exports = { // 为了减少工作量，权限直接使用 gitlab 的，所以只需要落库以下字段
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('users', {
      id: { type: INTEGER, primaryKey: true, },
      name: STRING(30),
      username: STRING(30),
      email: STRING(100),
      avatar_url: STRING(200),
      web_url: STRING(200),
      created_at: DATE,
      updated_at: DATE,
    });
  },
  down: async queryInterface => {
    await queryInterface.dropTable('users');
  },
};
最后执行 migrate 进行数据库变更，将表推送到数据库中

# 升级数据库
npx sequelize db:migrate
# 如果有问题需要回滚，可以通过 `db:migrate:undo` 回退一个变更
# npx sequelize db:migrate:undo
# 可以通过 `db:migrate:undo:all` 回退到初始状态
# npx sequelize db:migrate:undo:all