import { Sequelize } from 'sequelize';
import DataTypes from 'sequelize'

import { red, darkGray } from 'ansicolor'
import { db } from '../config/config.default'

const Op = Sequelize.Op

const mssqlDBconnect = [db.mssql.database, db.mssql.user, db.mssql.password]
const mysqlDBconnect = [db.mysql.database, db.mysql.user, db.mysql.password]
const postgresDBconnect = [db.pg.database, db.pg.user, db.pg.password]

// Подключение БД Webassyst
const MySQL = new Sequelize(...mysqlDBconnect, {
  host: db.mysql.host,
  dialect: db.mysql.dialect,
  logging: false,
  dialectOptions: {
    connectTimeout: 240000
  },
  pool: {
    max: 6,
    min: 0,
    acquire: 240000,
    idle: 240000
  }
})

try {
  await MySQL.authenticate();
  console.log(('MySQL connected').darkGray);
} catch (error) {
  console.error(('MySQL connecting error:', error).red);
}

// Подключение БД YuKoSoft
const MsSQL = new Sequelize(...mssqlDBconnect, {
  host: db.mssql.host,
  dialect: db.mssql.dialect,
  logging: false,
  dialectOptions: {
    connectTimeout: 240000
  },
  pool: {
    max: 6,
    min: 0,
    acquire: 240000,
    idle: 240000
  }
})

try {
  await MsSQL.authenticate();
  console.log(('MsSQL connected').darkGray);
} catch (error) {
  console.error(('MsSQL connecting error:', error).red);
}

// Подключение серверу админки
const Postgres = new Sequelize(...postgresDBconnect, {
  host: db.pg.host,
  dialect: db.pg.dialect,
  logging: false,
  dialectOptions: {
    connectTimeout: 240000
  },
  pool: {
    max: 6,
    min: 0,
    acquire: 240000,
    idle: 240000
  }
})

try {
  await Postgres.authenticate();
  console.log(('Postgres connected').darkGray);
} catch (error) {
  console.error(('Postgres connecting error:', error).red);
}

export { MsSQL, MySQL, Postgres, DataTypes, Op }
