import { MySQL, DataTypes } from '../../utils';

const { INTEGER, STRING, DECIMAL, TEXT, TINYINT, DATE } = DataTypes

const ShopProduct = MySQL.define('shop_product', {
   id: {
      type: INTEGER,
      autoincrement: true,
      primaryKey: true,
      allowNull: true
   },
   name: {
      type: STRING,
      allowNull: true,
      defaultValue: null
   },
   summary: {
      type: STRING,
      allowNull: true,
      defaultValue: null
   },
   meta_title: {
      type: STRING,
      allowNull: true,
      defaultValue: null
   },
   meta_description: {
      type: STRING,
      allowNull: true,
      defaultValue: null
   },
   meta_keywords: {
      type: STRING,
      allowNull: true,
      defaultValue: null
   },
   description: {
      type: STRING,
      allowNull: true,
      defaultValue: null
   },
   contact_id: {
      type: INTEGER,
      allowNull: true,
      defaultValue: 1
   },
   create_datetime: {
      type: DATE,
      allowNull: true,
      defaultValue: new Date()
   },
   edit_datetime: {
      type: DATE,
      allowNull: true,
      defaultValue: new Date()
   },
   status: {
      type: INTEGER,
      allowNull: true,
      defaultValue: 1
   },
   type_id: {
      type: INTEGER,
      allowNull: true,
      defaultValue: null
   },
   image_id: {
      type: INTEGER,
      allowNull: true,
      defaultValue: null,
   },
   image_filename: {
      type: STRING,
      allowNull: true
   },
   video_url: {
      type: STRING,
      allowNull: true,
      defaultValue: null,
   },
   sku_id: {
      type: INTEGER,
      allowNull: true,
      defaultValue: null,
   },
   ext: {
      type: STRING,
      allowNull: true,
      defaultValue: null,
   },
   url: {
      type: STRING,
      allowNull: true,
      defaultValue: null
   },
   rating: {
      type: DECIMAL,
      allowNull: true,
      defaultValue: 	0.00
   },
   price: {
      type: DECIMAL,
      allowNull: true,
      defaultValue: 	0.0000
   },
   compare_price: {
      type: DECIMAL,
      allowNull: true,
      defaultValue: 	0.0000
   },
   currency: {
      type: STRING,
      allowNull: true,
      defaultValue: 'RUB'
   },
   min_price: {
      type: DECIMAL,
      allowNull: true,
      defaultValue: 	0.0000
   },
   max_price: {
      type: DECIMAL,
      allowNull: true,
      defaultValue: 	0.0000
   },
   tax_id: {
      type: INTEGER,
      allowNull: true,
      defaultValue: 	null
   },
   count: {
      type: INTEGER,
      allowNull: true,
      defaultValue: 	1
   },
   cross_selling: {
      type: INTEGER,
      allowNull: true,
      defaultValue: 	null
   },
   upselling: {
      type: INTEGER,
      allowNull: true,
      defaultValue: 	null
   },
   rating_count: {
      type: INTEGER,
      allowNull: true,
      defaultValue: 	0
   },
   total_sales: {
      type: DECIMAL(15,4),
      allowNull: false,
      defaultValue: 	0
   },
   category_id: {
      type: INTEGER(11),
      allowNull: false,
      defaultValue: null
   },
   badge: {
      type: TEXT,
      defaultValue: 	null,
      allowNull: true
   },
   sku_type: {
      type: TINYINT(1),
      allowNull: true,
      defaultValue: 	0
   },
   base_price_selectable: {
      type: DECIMAL(15,4),
      allowNull: false,
      defaultValue: 	0.0000
   },
   compare_price_selectable: {
      type: DECIMAL(15,4),
      allowNull: false,
      defaultValue: 	0.0000
   },
   purchase_price_selectable: {
      type: DECIMAL(15,4),
      allowNull: true,
      defaultValue: 	0.0000
   },
   sku_count: {
      type: INTEGER,
      allowNull: true,
      defaultValue: 	1
   },
}, {
   tableName: 'shop_product',
   timestamps: false
});

export { ShopProduct }