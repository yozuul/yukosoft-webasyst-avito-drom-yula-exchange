import DataTypes from 'sequelize';
import { MsSQL } from '../../utils';

const { INTEGER, STRING } = DataTypes

const ItemImages = MsSQL.define('Sys_Files', {
   FILE_ID: {
      type: INTEGER,
      autoincrement: true,
      primaryKey: true,
      allowNull: true
   },
   FORM_NAME: {
      type: INTEGER,
      allowNull: false
   },
   ITEM_ID: {
      type: INTEGER,
      allowNull: false
   },
   FILE_TYPE: {
      type: INTEGER,
      allowNull: false
   },
   FILE_NAME: {
      type: STRING,
      allowNull: false
   },
   FILE_DATA: {
      type: STRING,
      allowNull: false
   },
   FILE_SMALL_IMAGE_DATA: {
      type: STRING,
      allowNull: false
   },
}, {
   tableName: 'Sys_Files',
   timestamps: false
});

export { ItemImages }