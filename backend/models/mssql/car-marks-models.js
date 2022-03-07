import DataTypes from 'sequelize';
import { MsSQL } from '../../utils';

const { INTEGER, STRING } = DataTypes

const CarMarksModels = MsSQL.define('CarMarksModels', {
   'ID': {
      type: INTEGER,
      autoincrement: true,
      primaryKey: true,
      allowNull: true
   },
   'Mark': {
      type: STRING,
      allowNull: false
   },
   'Model': {
      type: STRING,
      allowNull: false
   },
   'Generation': {
      type: STRING,
      allowNull: false
   },
   'Descr': {
      type: STRING,
      allowNull: false
   },
}, {
   tableName: 'CarMarksModels',
   timestamps: false
});

export { CarMarksModels }