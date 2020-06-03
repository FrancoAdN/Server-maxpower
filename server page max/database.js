const db = require('mysql2-promise')()
const config = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'maxpower_page'
}

db.configure(config)

async function querysql(sql) {
    const result = await db.execute(sql).spread(res => res);
    return result
}

module.exports = querysql