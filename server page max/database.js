require('dotenv').config()
const db = require('mysql2-promise')()

const config = {
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB
}

db.configure(config)

async function querysql(sql) {
    const result = await db.execute(sql).spread(res => res);
    return result
}


async function test() {
    const sql = 'SELECT token FROM Devices'
    const res = await querysql(sql)
    const response = []
    for (let tok of res) {
        response.push(tok.token)
    }
    console.log(response)

}

test()

module.exports = querysql