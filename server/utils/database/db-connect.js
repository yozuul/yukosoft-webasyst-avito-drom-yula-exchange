import { Sequelize } from 'sequelize'
import DataTypes from 'sequelize'

import { darkGray, red } from 'ansicolor'
// Конфигурация подключения
import { pg_config, mssql_config } from '../../config'
// Postgres
export const postgres = new Sequelize(
    pg_config.database,
    pg_config.user,
    pg_config.password, {
    host: pg_config.host,
    port: pg_config.port,
    dialect: 'postgres',
    logging: false
  }
)
// MsSQL
export const mssql = new Sequelize(
    mssql_config.database,
    mssql_config.user,
    mssql_config.password, {
    host: mssql_config.host,
    port: mssql_config.port,
    dialect: 'mssql',
    logging: false
  }
)
// Подключение postgres
try {
    await postgres.authenticate();
    console.log(('\nПодключение к Postgres установлено').darkGray);
} catch (err) {
    console.log(err)
    console.error(('Ошибка подключения Postgres').red);
}
// Подключение mssql
try {
    await mssql.authenticate();
    console.log(('Подключение к MsSQL установлено').darkGray);
} catch (err) {
    console.log(err)
    console.error(('Ошибка подключения Postgres').red);
}

export const Op = Sequelize.Op
export { DataTypes }