import DataTypes from 'sequelize';
import { MsSQL } from '../../utils';

const { INTEGER, STRING } = DataTypes

const ItemType = MsSQL.define('ItemType', {
   ID: {
      type: INTEGER,
      autoincrement: true,
      primaryKey: true,
      allowNull: true
   },
   TypeName: {
      type: STRING,
      allowNull: false
   }
}, {
   tableName: 'ItemType',
   timestamps: false
});

export { ItemType }