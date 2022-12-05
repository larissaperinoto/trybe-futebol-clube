import 'dotenv/config';
import { Options } from 'sequelize';

const config: Options = {
  username: process.env.DBUSER || 'root',
  password: process.env.DBPASS || '123456',
  database: 'TRYBE_FUTEBOL_CLUBE',
  host: process.env.DBHOST || 'localhost',
  port: Number(process.env.DBPORT) || 3002,
  dialect: 'mysql',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: false,
}

module.exports = config;
