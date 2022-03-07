import DataTypes from 'sequelize';
import { MsSQL } from '../../utils';

const { INTEGER, STRING } = DataTypes

const ItemCategory = MsSQL.define('ItemCategory', {
   ID: {
      type: INTEGER,
      autoincrement: true,
      primaryKey: true,
      allowNull: true
   },
   CategoryName: {
      type: STRING,
      allowNull: false
   }
}, {
   tableName: 'ItemCategory',
   timestamps: false
});

export { ItemCategory }