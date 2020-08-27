const admin = require('firebase-admin')
const serviceAccount = require('./firebase-key.json')
const querysql = require('./database')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})


async function sendMessage({ title, body }) {
    const tokens = []
    const sql = 'SELECT token FROM Devices'
    const res = await querysql(sql)
    for (let t of res)
        tokens.push(t.token)



    const payload = {
        notification: {
            title, body
        },
        data: {},
        tokens

    }

    admin.messaging().sendMulticast(payload)
        .then(() => { })
        .catch((err) => console.log("Error sending", err))

}


module.exports = { sendMessage }