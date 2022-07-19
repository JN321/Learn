const SequelizeAuto = require('sequelize-auto');
const { username, password, database, host, dialect } = require('./config.json').development;
const path = require('path');

// https://www.npmjs.com/package/sequelize-auto
// mysql://127.0.0.1@username/password
const auto = new SequelizeAuto(database, username, password, {
    host, dialect,
    directory: path.resolve(__dirname, '../models'),
    port: 3306,
    lang: 'esm', // 让结果是esm 的，默认可选。
    additional: {
        timestamps: false
    },
    // tables: ['roles']
});

auto.run(err => {
    if(err) throw err;
});
