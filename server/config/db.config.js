const env = process.env
// Postgres config
export const pg_config = {
    host: env.PG_HOST,
    port: env.PG_PORT,
    user: env.PG_USER,
    password: env.PG_PASS,
    database: env.PG_DB
}
export const mssql_config = {
    host: env.DB_MsSQL_HOST,
    user: env.DB_MsSQL_USER,
    password: env.DB_MsSQL_PASS,
    database: env.DB_MsSQL_NAME
}