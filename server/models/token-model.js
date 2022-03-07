import { postgres, DataTypes } from '../utils'

const { TEXT, INTEGER } = DataTypes

export default postgres.define('tokens', {
    user_id: {
        type: INTEGER,
    },
    refresh_token: {
        type: TEXT,
        allowNull: false
    }
}, {
    tableName: 'tokens',
    timestamps: false
})