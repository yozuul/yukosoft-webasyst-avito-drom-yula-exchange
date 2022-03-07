import pgSync from '../utils/database/db-sync'

import UserModel from './user-model'
import ProductModel from './product-model'
import TokenModel from './token-model'
import RoleModel from './role-model'
import SettingsModel from './settings-model'

import { Items } from './mssql/items-model'

UserModel.hasOne(TokenModel, {
    foreignKey: 'user_id',
    onDelete: 'cascade'
})
UserModel.belongsTo(RoleModel, {
    foreignKey: 'role_id',
    onDelete: 'cascade'
})

TokenModel.removeAttribute('id')

pgSync({
    RoleModel: RoleModel,
    UserModel: UserModel,
    SettingsModel: SettingsModel
})

export { UserModel, TokenModel, RoleModel, ProductModel, Items, SettingsModel }