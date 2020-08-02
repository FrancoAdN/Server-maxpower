require('dotenv').config()
const db2 = require('mysql2-promise')('second-db')

const config = {
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB2
}

db2.configure(config)

async function query_system(sql) {
    const result = await db2.execute(sql).spread(res => res);
    return result
}

module.exports = query_system