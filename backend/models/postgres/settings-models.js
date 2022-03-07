import DataTypes from 'sequelize';
import { Postgres } from '../../utils';

const { STRING, INTEGER, BOOLEAN, DATE } = DataTypes

export const Settings = Postgres.define('settings', {
    avito_min_price: {
        type: INTEGER
    },
    company_adress: {
        type: STRING
    },
    company_phone: {
        type: STRING
    },
    default_text: {
        type: STRING
    },
    latest_update_check_time: {
        type: DATE
    },
    total_products_exported: {
        type: INTEGER
    },
    avito_products_exported: {
        type: INTEGER
    },
    drom_products_exported: {
        type: INTEGER
    },
    latest_full_export_update: {
        type: DATE
    },
    latest_change_export_update: {
        type: DATE
    },
    products_settings_changed: {
        type: STRING,
        allowNull: true
    },
    global_settings_changed: {
        type: BOOLEAN
    },
    latest_change_added_products: {
        type: INTEGER
    },
    latest_change_deleted_products: {
        type: INTEGER
    },
    latest_change_edit_products: {
        type: INTEGER
    },
}, {
    tableName: 'settings',
    timestamps: false
})