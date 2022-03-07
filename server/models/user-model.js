import { postgres, DataTypes } from '../utils'
import { HashPassword } from '../utils/database'

const { STRING, TEXT, INTEGER, BOOLEAN } = DataTypes

export default postgres.define('users', {
    name: {
        type: STRING,
        allowNull: true,
        defaultValue: null
    },
    login: {
        type: STRING,
        allowNull: true,
        unique: true
    },
    email: {
        type: STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: { msg: 'Неверный формат Email' },
        }
    },
    password: {
        type: STRING,
        allowNull: false,
        validate: {
            isLength(hash) {
                const enHash =  HashPassword.decrypt(hash)
                if(!(enHash.length > 2) || !(enHash.length < 32)) {
                    throw new Error('Пароль должен быть длиной от 3 до 32 символов')
                }
            }
        }
    },
    apiKey: {
        type: TEXT,
        defaultValue: 'Создаётся в личном кабинете продавца'
    },
    apiToken: {
        type: TEXT,
        defaultValue: 'Создаётся в личном кабинете продавца'
    },
    role_id: {
        type: INTEGER,
        allowNull: false
    },
    activation_link: {
        type: STRING,
        allowNull: false,
        defaultValue: false
    },
    email_activated: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    status: {
        type: BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'users',
    timestamps: false
})

