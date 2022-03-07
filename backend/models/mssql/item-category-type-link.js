import DataTypes from 'sequelize';
import { MsSQL } from '../../utils';

const { INTEGER, STRING } = DataTypes

const ItemCategoryTypeLink = MsSQL.define('ItemCategoryTypeLink', {
   ID: {
      type: INTEGER,
      autoincrement: true,
      primaryKey: true,
      allowNull: true
   },
   ItemCategoryID: {
      type: STRING,
      allowNull: false
   },
   ItemTypeID: {
      type: STRING,
      allowNull: false
   },
   AvitoCategory: {
      type: STRING,
      allowNull: false
   },
}, {
   tableName: 'ItemCategoryTypeLink',
   timestamps: false
});

export { ItemCategoryTypeLink }