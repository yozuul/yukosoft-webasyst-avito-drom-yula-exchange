import { postgres, DataTypes } from '../utils'

const { TEXT, BOOLEAN } = DataTypes

export default postgres.define('products', {
    avito: {
        type: BOOLEAN,
        defaultValue: true
    },
    drom: {
        type: BOOLEAN,
        defaultValue: true
    },
    yula: {
        type: BOOLEAN,
        defaultValue: true
    },
    text: {
        type: TEXT,
        allowNull: true,
        defaultValue: null
    },
}, {
    tableName: 'products',
    timestamps: false
})

