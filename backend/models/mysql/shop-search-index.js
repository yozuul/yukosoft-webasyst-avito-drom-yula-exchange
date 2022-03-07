import { MySQL, DataTypes } from '../../utils';

const { INTEGER, } = DataTypes

export const SearchIndex = MySQL.define('shop_search_index', {
   word_id: {
      type: INTEGER,
      primaryKey: true,
   },
   product_id: {
      type: INTEGER,
   },
   weight: {
      type: INTEGER,
      allowNull: false,
   },
}, {
   tableName: 'shop_search_index',
   timestamps: false
})