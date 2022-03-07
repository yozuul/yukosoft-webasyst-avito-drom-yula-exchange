import { postgres, DataTypes } from '../utils'

const { STRING } = DataTypes

export default postgres.define('roles', {
    name: {
        type: STRING,
        allowNull: false
    }
}, {
    tableName: 'roles',
    timestamps: false
})