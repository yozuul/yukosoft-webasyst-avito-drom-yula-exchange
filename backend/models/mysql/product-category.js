import { MySQL, DataTypes } from '../../utils';

const { INTEGER } = DataTypes

const ShopProductCategory = MySQL.define('shop_category_products', {
   product_id: {
      type: INTEGER,
      primaryKey: true,
      allowNull: false,
   },
   category_id: {
      type: INTEGER,
      primaryKey: true,
      allowNull: false,
   },
   sort: {
      type: INTEGER,
      defaultValue: 0
   },
}, {
   tableName: 'shop_category_products',
   timestamps: false
});

export { ShopProductCategory }