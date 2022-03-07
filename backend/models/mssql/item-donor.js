import DataTypes from 'sequelize';
import { MsSQL } from '../../utils';

const { INTEGER, STRING, BOOLEAN } = DataTypes

const ItemDonorCar = MsSQL.define('Cars', {
   ID: {
      type: INTEGER,
      autoincrement: true,
      primaryKey: true,
      allowNull: true
   },
   CarStatus: {
      type: INTEGER,
      allowNull: false
   },
   MarkModelID: {
      type: INTEGER,
      allowNull: false
   },
   CarMarkModel: {
      type: STRING,
      allowNull: false
   },
   BodyType: {
      type: STRING,
      allowNull: false
   },
   Engine: {
      type: STRING,
      allowNull: false
   },
   ProductionYear: {
      type: INTEGER,
      allowNull: false
   },
   CarColor: {
      type: STRING,
      allowNull: false
   },
   VIN: {
      type: STRING,
      allowNull: true
   },
   CarRun: {
      type: STRING,
      allowNull: true
   },
   CarDrive: {
      type: STRING,
      allowNull: false
   },
   CarBodyNumber: {
      type: STRING,
      allowNull: false
   },
   EngineNumber: {
      type: STRING,
      allowNull: true
   },
   CarFullName: {
      type: STRING,
      allowNull: false
   },
   Transmission: {
      type: STRING,
      allowNull: false
   },
   RightWheel: {
      type: BOOLEAN,
      allowNull: false
   },
   Descr: {
      type: STRING,
      allowNull: true
   },
   Photo: {
      type: STRING,
      allowNull: true
   },
   InternalCode: {
      type: STRING,
      allowNull: true
   },
}, {
   tableName: 'Cars',
   timestamps: false
});

export { ItemDonorCar }