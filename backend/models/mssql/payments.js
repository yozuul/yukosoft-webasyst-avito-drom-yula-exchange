import DataTypes from 'sequelize';
import { MsSQL } from '../../utils';

const { INTEGER } = DataTypes

const Payments = MsSQL.define('Payments', {
   'ID': {
      type: INTEGER,
      autoincrement: true,
      primaryKey: true,
      allowNull: true
   },
   'PaymentCategory': {
      type: INTEGER,
      allowNull: false
   }
}, {
   tableName: 'Payments',
   timestamps: false
});

export { Payments }