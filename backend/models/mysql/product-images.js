import { MySQL, DataTypes } from '../../utils';

const { INTEGER, STRING, DATE, TEXT } = DataTypes

const ShopProductImages = MySQL.define('shop_product_images', {
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
   upload_datetime: {
      type: DATE,
      allowNull: false,
      defaultValue: new Date()
   },
   edit_datetime: {
      type: DATE,
      allowNull: true,
      defaultValue: null
   },
   description: {
      type: STRING,
      allowNull: true,
      defaultValue: null
   },
   sort: {
      type: INTEGER,
      allowNull: true,
      defaultValue: 0
   },
   width: {
      type: INTEGER,
      allowNull: true,
   },
   height: {
      type: INTEGER,
      allowNull: true,
   },
   size: {
      type: INTEGER,
      allowNull: true,
      defaultValue: null
   },
   filename: {
      type: STRING,
      allowNull: true,
   },
   original_filename: {
      type: STRING,
      allowNull: false,
   },
   ext: {
      type: STRING,
      allowNull: false,
   },
   badge_type: {
      type: INTEGER,
      allowNull: true,
      defaultValue: null
   },
   badge_code: {
      type: TEXT,
      allowNull: true,
      defaultValue: null
   },
}, {
   tableName: 'shop_product_images',
   timestamps: false
});

export { ShopProductImages }