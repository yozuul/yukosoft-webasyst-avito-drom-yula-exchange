import { postgres, mssql, Op } from './db-connect'
import { HashPassword } from './crypt-password'
import { darkGray, red } from 'ansicolor'
import { Items } from '../../models/mssql/items-model'

const pgSync = async (models) => {
    try {
        const { RoleModel, UserModel, SettingsModel } = models
        await postgres.sync()

        await (async () => {
            const hashPass = HashPassword.encrypt('admin')
            const defaultUser = {
                name: 'admin',
                login: 'admin',
                email: 'admin@admin.ru',
                password: hashPass,
                apiKey: 'Создаётся в личном кабинете продавца',
                apiToken: 'Создаётся в личном кабинете продавца',
                role_id: 1,
                email_activated: true,
                status: true
            }

            const existRole = await RoleModel.findAll()

            if(existRole.length === 0) {
                for(let role of ['admin', 'user']) {
                    await RoleModel.create({ name: role })
                }
            }

            const existUser = await UserModel.findOne({
                where: { login: 'admin'}
            })

            if(!existUser) {
                UserModel.create(defaultUser)
            }

            const defaultSettings = {
                id: 1,
                avito_min_price: 3000,
                company_phone: '79182785505',
                company_adress: 'Россия, Краснодарский край, Крымский район, станица Троицкой',
                default_text: `<p>В наличии много других запчастей на данный автомобиль - звоните!<br /><br />Гарантия!<br /><br />Мы поможем установить приобретённую у нас запчасть.<br /><br />Доставка в регионы!</p>`,
                latest_update_check_time: null,
                total_products_exported: null,
                avito_products_exported: null,
                drom_products_exported: null,
                latest_full_export_update: null,
                latest_change_export_update: null,
                products_settings_changed: '',
                global_settings_changed: true,
                latest_change_added_products: null,
                latest_change_deleted_products: null,
                latest_change_edit_products: null,
            }

            const existSettings = await SettingsModel.findOne({
                where: { id: 1}
            })

            if(!existSettings) {
                SettingsModel.create(defaultSettings)
            }

        })()

    } catch (err) {
        console.log(err)
        console.log(('Ошибка синхронизации таблиц').red)
    }
}

export default pgSync