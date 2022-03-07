import DataTypes from 'sequelize';
import { MsSQL } from '../../utils';

const { INTEGER } = DataTypes

const ItemsArrivals = MsSQL.define('ItemsArrivals', {
   'ID': {
      type: INTEGER,
      autoincrement: true,
      primaryKey: true,
      allowNull: true
   },
   'DocTypeID': {
      type: INTEGER,
      allowNull: true
   },
   'MarkModelID': {
      type: INTEGER,
      allowNull: false
   },
   'CarID': {
      type: INTEGER,
      allowNull: false
   },
   'ItemsCount': {
      type: INTEGER,
      allowNull: false
   },
   'OrderSumm': {
      type: INTEGER,
      allowNull: false
   },
   'ItemsSumm': {
      type: INTEGER,
      allowNull: false
   },
   'PaymentSumm': {
      type: INTEGER,
      allowNull: false
   },
   'PaymentsAmountLeft': {
      type: INTEGER,
      allowNull: false
   }
}, {
   tableName: 'ItemsArrivals',
   timestamps: false
});

export { ItemsArrivals }