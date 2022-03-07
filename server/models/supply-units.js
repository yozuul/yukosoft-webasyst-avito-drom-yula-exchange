import { postgres, DataTypes } from '../utils'

const { STRING, INTEGER, BOOLEAN } = DataTypes

export default postgres.define('supply_units', {
    supply_id: {
        type: STRING,
        allowNull: false
    },
    imtId: {
        type: INTEGER,
        allowNull: false
    },
    barcode: {
        type: STRING,
        allowNull: false
    },
    user_id: {
        type: INTEGER,
    },
    status: {
        type: BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'supply_units',
    timestamps: false
})