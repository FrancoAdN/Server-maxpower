// require('dotenv').config()
// const dbsys = require('mysql2-promise')()

// const config_sys = {
//     host: 'localhost',
//     user: process.env.DB_USER,
//     password: process.env.DB_PWD,
//     database: process.env.DBSYS
// }

// dbsys.configure(config_sys)

// async function system_query(sql) {
//     const result = await dbsys.execute(sql).spread(res => res);
//     return result
// }

// module.exports = system_query