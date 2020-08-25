const admin = require('firebase-admin')
const serviceAccount = require('./firebase-key.json')
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const tokenId = "dbSruR0xSMeaPlwnGwEQgx:APA91bE5OASUiMjwKGq2p7Wh3DwB6Zra8M06mvTFQBm1RuoDyQHzjxGyiPv63tfxStTK9J7BdgP8tEzqZrPapU5gIpOl5IS95KonDseB_Mq_Q14At-zxuCrhtUSmdKia165EUQ-ZDg1n"

function sendMessage({ title, body }) {
    const payload = {
        notification: {
            title, body
        },
        data: {}
    }
    const options = {
        priority: 'high'
    }
    admin.messaging().sendToDevice(tokenId, payload, options)
        .then((resp) => {
            //console.log('Success ', resp)
        })
        .catch((err) => {
            console.log('Error sending', err)
        })
}


module.exports = { sendMessage }