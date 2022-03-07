import { MySQL, DataTypes } from '../../utils';

const { INTEGER } = DataTypes

const ShopProductFeautures = MySQL.define('shop_product_features', {
   id: {
      type: INTEGER,
      autoincrement: true,
      primaryKey: true,
      allowNull: true
   },
   product_id: {
      type: INTEGER,
      allowNull: false,
   },
   sku_id: {
      type: INTEGER,
      allowNull: true,
      defaultValue: null
   },
   feature_id: {
      type: INTEGER,
      allowNull: false,
   },
   feature_value_id: {
      type: INTEGER,
      allowNull: false,
   },
}, {
   tableName: 'shop_product_features',
   timestamps: false
});

export { ShopProductFeautures }