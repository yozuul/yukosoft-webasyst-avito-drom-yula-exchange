import DataTypes from 'sequelize';
import { MsSQL } from '../../utils';

const { INTEGER, STRING, BOOLEAN, DATE } = DataTypes

const Items = MsSQL.define('Items', {
   ID: {
      type: INTEGER,
      autoincrement: true,
      primaryKey: true,
      allowNull: true
   },
   CategoryID: {
      type: INTEGER,
      allowNull: false
   },
   LocationID: {
      type: INTEGER,
      allowNull: false
   },
   ItemName: {
      type: STRING,
      allowNull: false
   },
   Manufacturer: {
      type: STRING,
      allowNull: true
   },
   Original: {
      type: BOOLEAN,
      allowNull: true
   },
   OEM: {
      type: BOOLEAN,
      allowNull: true
   },
   Price: {
      type: INTEGER,
      allowNull: false
   },
   Descr: {
      type: STRING,
      allowNull: true
   },
   CarID: {
      type: INTEGER,
      allowNull: true
   },
   NeedVerification: {
      type: BOOLEAN,
      allowNull: true
   },
   VerificationComment: {
      type: STRING,
      allowNull: true
   },
   ItemArrivalID: {
      type: INTEGER,
      allowNull: true
   },
   ItemSaleID: {
      type: INTEGER,
      allowNull: true
   },
   MarkModelID: {
      type: INTEGER,
      allowNull: true
   },
   Defect: {
      type: STRING,
      allowNull: true
   },
   CreateUser: {
      type: STRING,
      allowNull: true
   },
   CreateDate: {
      type: DATE,
      allowNull: true,
      defaultValue: new Date()
   },
   OriginalNo: {
      type: STRING,
      allowNull: true
   },
   ApplicabilityMarkModelID: {
      type: STRING,
      allowNull: true
   },
   ItemDescr: {
      type: STRING,
      allowNull: true
   },
   TypeID: {
      type: INTEGER,
      allowNull: true
   },
   Discarded: {
      type: BOOLEAN,
      allowNull: true
   },
   DiscardReason: {
      type: STRING,
      allowNull: true
   },
   Quantity: {
      type: STRING,
      allowNull: false
   },
}, {
   tableName: 'Items',
   timestamps: false
});

export { Items }