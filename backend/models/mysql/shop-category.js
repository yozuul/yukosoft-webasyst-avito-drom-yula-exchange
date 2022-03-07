import { MySQL, DataTypes } from '../../utils';

const { INTEGER, STRING, TEXT, DATE } = DataTypes

const ShopCategory = MySQL.define('shop_category', {
   id: {
      type: INTEGER,
      autoincrement: true,
      primaryKey: true,
      allowNull: true
   },
   left_key: {
      type: INTEGER,
      allowNull: true,
      defaultValue: null
   },
   right_key: {
      type: INTEGER,
      allowNull: true,
      defaultValue: null
   },
   depth: {
      type: INTEGER,
      allowNull: true,
      defaultValue: 0
   },
   parent_id: {
      type: INTEGER,
      allowNull: true,
      defaultValue: 0
   },
   name: {
      type: STRING,
      allowNull: false
   },
   meta_title: {
      type: STRING,
      allowNull: true,
      defaultValue: null
   },
   meta_title: {
      type: STRING,
      allowNull: true,
      defaultValue: null
   },
   meta_keywords: {
      type: STRING,
      allowNull: true,
      defaultValue: null
   },
   meta_description: {
      type: STRING,
      allowNull: true,
      defaultValue: null
   },
   type: {
      type: STRING,
      allowNull: true,
      defaultValue: 0
   },
   url: {
      type: STRING,
      allowNull: true,
   },
   full_url: {
      type: STRING,
      allowNull: false,
   },
   count: {
      type: INTEGER,
      allowNull: true,
      defaultValue: 0
   },
   description: {
      type: TEXT,
      allowNull: true,
      defaultValue: null
   },
   conditions: {
      type: TEXT,
      allowNull: true,
      defaultValue: null
   },
   create_datetime: {
      type: DATE,
      allowNull: false,
      defaultValue: new Date()
   },
   edit_datetime: {
      type: DATE,
      allowNull: true,
      defaultValue: null
   },
   filter: {
      type: TEXT,
      allowNull: true,
      defaultValue: null
   },
   sort_products: {
      type: STRING,
      allowNull: true,
      defaultValue: null
   },
   include_sub_categories: {
      type: INTEGER,
      allowNull: true,
      defaultValue: 1
   },
   status: {
      type: INTEGER,
      allowNull: true,
      defaultValue: 1
   },
}, {
   tableName: 'shop_category',
   timestamps: false
});

export { ShopCategory }