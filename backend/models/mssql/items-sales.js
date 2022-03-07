import DataTypes from 'sequelize';
import { MsSQL } from '../../utils';

const { INTEGER, STRING } = DataTypes

const Sales = MsSQL.define('ItemsSales', {
   ID: {
      type: INTEGER,
      autoincrement: true,
      primaryKey: true,
      allowNull: true
   },
   Descr: {
      type: STRING,
      allowNull: false
   },
   ItemsCount: {
      type: INTEGER,
      allowNull: false
   },
}, {
   tableName: 'ItemsSales',
   timestamps: false
});

export { Sales }