require('dotenv').config();

module.exports = {
    sql_server: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        server: process.env.DB_HOST,
        database: process.env.DB_NAME,
        pool: {
            max: 10,
            min: 0,
            idleTimeoutMillis: 5000
        },
        options: {
            trustServerCertificate: true // change to true for local dev / self-signed certs
        }
    }
}