import { MySQL, DataTypes } from '../../utils';

const { INTEGER, STRING } = DataTypes

const ShopFeauturesValue = MySQL.define('shop_feature_values_varchar', {
   id: {
      type: INTEGER,
      autoincrement: true,
      primaryKey: true,
      allowNull: true
   },
   feature_id: {
      type: INTEGER,
      allowNull: true,
   },
   sort: {
      type: INTEGER,
      allowNull: true,
   },
   value: {
      type: STRING,
      allowNull: true,
   },
}, {
   tableName: 'shop_feature_values_varchar',
   timestamps: false
});

export { ShopFeauturesValue }