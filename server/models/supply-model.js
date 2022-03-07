import { postgres, DataTypes } from '../utils'

const { STRING, DATE, INTEGER, BOOLEAN } = DataTypes

export default postgres.define('supply', {
    name: {
        type: STRING,
        allowNull: false
    },
    date: {
        type: DATE,
        allowNull: false,
        defaultValue: new Date()
    },
    user_id: {
        type: INTEGER,
    },
    status: {
        type: BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'supply',
    timestamps: false
})