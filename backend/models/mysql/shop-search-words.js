import { MySQL, DataTypes } from '../../utils';

const { INTEGER, STRING } = DataTypes

export const SearchWord = MySQL.define('shop_search_word', {
   id: {
      type: INTEGER,
      autoincrement: true,
      primaryKey: true,
   },
   name: {
      type: STRING,
      allowNull: false,
   },
}, {
   tableName: 'shop_search_word',
   timestamps: false
});
