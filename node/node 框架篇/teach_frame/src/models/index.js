import Sequelize from "sequelize";
import initModels from './init-models';
import { development } from '../db/config.json';

const {host, username, password, database, dialect} = development;
const sequelize = new Sequelize(database, username, password, { host, dialect, define: { timestamps: false } })

export default initModels(sequelize);
