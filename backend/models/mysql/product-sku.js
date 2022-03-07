import { MySQL, DataTypes } from '../../utils';

const { INTEGER, STRING, DECIMAL, TINYINT, TEXT } = DataTypes

const ShopSKU = MySQL.define('shop_product_skus', {
   id: {
      type: INTEGER,
      autoincrement: true,
      primaryKey: true,
   },
   product_id: {
      type: INTEGER,
      allowNull: true,
   },
   sku: {
      type: STRING,
      allowNull: true,
   },
   sort: {
      type: INTEGER,
      allowNull: true,
      defaultValue: 0
   },
   name: {
      type: STRING,
      allowNull: true,
   },
   image_id: {
      type: INTEGER,
      allowNull: true,
      defaultValue: null
   },
   price: {
      type: DECIMAL,
      allowNull: false,
      defaultValue: 0.0000
   },
   primary_price: {
      type: DECIMAL,
      allowNull: true,
      defaultValue: 0.0000
   },
   purchase_price: {
      type: DECIMAL,
      allowNull: true,
      defaultValue: 0.0000
   },
   compare_price: {
      type: DECIMAL,
      allowNull: true,
      defaultValue: 0.0000
   },
   count: {
      type: INTEGER,
      allowNull: true,
      defaultValue: 1
   },
   available: {
      type: TINYINT,
      allowNull: true,
      defaultValue: 1
   },
   status: {
      type: TINYINT,
      allowNull: true,
      defaultValue: 1
   },
   dimension_id: {
      type: INTEGER,
      allowNull: true,
      defaultValue: null
   },
   file_name: {
      type: STRING,
      allowNull: true,
   },
   file_size: {
      type: STRING,
      allowNull: true,
      defaultValue: 0
   },
   file_description: {
      type: TEXT,
      allowNull: true,
      defaultValue: null
   },
   virtual: {
      type: TINYINT,
      allowNull: true,
      defaultValue: 0
   },
}, {
   tableName: 'shop_product_skus',
   timestamps: false
});

export { ShopSKU }