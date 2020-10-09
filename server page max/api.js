require('dotenv').config()
const graphqlHTTP = require('express-graphql')
const socket = require('socket.io')
const express = require('express')
const schema = require('./schema')
const nodemailer = require('nodemailer')
const bodyParser = require('body-parser')
const hbs = require('nodemailer-express-handlebars')
const cors = require('cors')
const query_third_db = require('./third_db')
const query_system = require('./db_system')
const querysql = require('./database')
const Notification = require('./notification')

const PORT = process.env.PORT || 5000

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

transporter.use('compile', hbs({
    viewEngine: {
        extname: '.handlebars',
        defaultLayout: ''
    },
    viewPath: './views/',
    defaultLayout: ''
}))

const app = express()

app.use(cors())

app.use(bodyParser.json({ limit: '50mb', extended: true }))

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

app.use(express.static('public'))

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.get('/login', async (req, resp) => {
    const { usr, pwd } = req.query
    const sql = `SELECT * FROM empleados WHERE usuario LIKE '${usr}' AND pwd = '${pwd}'`
    try {
        const re = await query_system(sql)
        if (re.length === 1) resp.send(true)
        else resp.send(false)

    } catch (error) {
        console.log('error')
    }


})


app.post('/contact', (req, resp) => {

    const { name, email, tel, emp, body } = req.body
    const mailOptions = {
        from: process.env.EMAIL,
        to: process.env.RECEIVER,
        subject: 'Contacto página web - Maxpower page',
        template: 'contact',
        context: {
            title: 'Contacto página web',
            name, email, tel, emp, body
        }
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) resp.sendStatus(400)
        else resp.sendStatus(200)
    })

})

app.post('/cotizacion', (req, resp) => {

    const { name, email, tel, emp, body } = req.body

    const mailOptions = {
        from: process.env.EMAIL,
        to: process.env.RECEIVER,
        subject: 'Pedido de cotización - Maxpower page',
        template: 'contact',
        context: {
            title: 'Pedido de cotización',
            name, email, tel, emp, body
        }
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) resp.sendStatus(400)
        else resp.sendStatus(200)
    })
})

app.post('/newsletter', (req, resp) => {
    const { newsletter } = req.body

    const mailOptions = {
        from: process.env.EMAIL,
        to: process.env.RECEIVER,
        subject: 'Newsletter - Maxpower page',
        template: 'newsletter',
        context: { newsletter }
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) resp.sendStatus(400)
        else resp.sendStatus(200)
    })
})

app.post('/device', async (req, resp) => {
    const { token } = req.body
    const sql = `INSERT INTO Devices(token) VALUES ("${token}")`
    try {
        const re = await querysql(sql)
    } catch (error) { }

})

app.post('/login_contact', async (req, resp) => {
    const { email, password } = req.body
    const sql = `SELECT id_contacto, id_empresa, posicion_contacto FROM Contactos_empresa WHERE email_contacto='${email}' AND pass_contacto='${password}'`
    const user = await query_third_db(sql)
    if (user.length === 1)
        resp.send(user[0])
    else
        resp.send(false)

})

app.get('/ticket', (req, resp) => {
    const sql = 'select * from Ticket t, Respuesta_ticket rt WHERE t.Id_ticket = rt.Id_ticket and t.Id_empresa = 1'
    resp.send(await query_third_db(sql))
})


const server = app.listen(PORT, () => console.log(`Server running port: ${PORT}`))

const io = socket(server)

let conn_server = []
let conn_clients = []

let currentClientsConnected = []

//192.168.0.11
io.sockets.on('connection', (socket) => {


    socket.on('server_conn', () => {
        conn_server.push(socket.id)
        console.log(`New server connection ${socket.id}`)
        io.to(socket.id).emit('existing_clients', currentClientsConnected)
    })


    socket.on('client_conn', (data) => {

        console.log(`New client connection ${socket.id}`)
        sendNewConnection(data);
        if (conn_server.length != 0 || checkVirtualServer()) {
            data['socket_id'] = socket.id
            data['messages'] = [{ from: 0, msg: 'Bienvenido al chat!', time: new Date().getTime() }]
            currentClientsConnected.push(data)
            conn_clients.push(socket.id)
            sendToServer('new_client_conn', data)
            const notify = {
                title: 'Maxpower Chat',
                body: `${data.name} se ha conectado al chat`
            }
            SendNotificiationToDevices(notify)
        } else
            io.to(socket.id).emit('server_disconnected')

    })

    socket.on('client_message', ({ msg }) => {
        const client_msg = { from: socket.id, msg }
        sendToServer('client_message', client_msg)
        const message = {
            from: 1, msg, time: new Date().getTime()
        }
        addMessageToClient(message, socket.id)

    })

    socket.on('client_existing_conv', (data) => {
        data['socket_id'] = socket.id
        sendToServer('new_client_conn', data)
    })

    //socket.on('client_conversation', (data) => sendConversationEmail(data))

    socket.on('server_message', (data) => {
        const message = { from: 0, msg: data.text }
        io.to(data.to).emit('server_message', message)
        message['time'] = new Date().getTime()
        addMessageToClient(message, data.to)
    })


    socket.on('disconnect', () => {
        let found = false

        for (let [i, sock] of conn_clients.entries()) {
            if (sock == socket.id) {
                conn_clients.splice(i, 1)
                found = true
                console.log('Client disconnected ' + socket.id)
                sendToServer('client_disconnected', socket.id)
                sendConversationEmail(currentClientsConnected[i])
                currentClientsConnected.splice(i, 1)
                break
            }
        }

        if (!found) {
            for (let [i, sock] of conn_server.entries()) {
                if (sock == socket.id) {
                    conn_server.splice(i, 1)
                    console.log('Server disconnected ' + sock)
                    break
                }
            }
        }

    })




})


const sendToServer = (event, data) => {
    for (let sock of conn_server)
        io.to(sock).emit(event, data)
}

const sendNewConnection = ({ name, email, tel, emp }) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: process.env.RECEIVER,
        subject: 'Nueva conexión al chat! - Maxpower page',
        template: 'connect',
        context: { name, emp, tel, email }
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) console.log("Error al enviar email")
        //else resp.sendStatus(200)
    })
}

const sendConversationEmail = ({ name, email, tel, messages, emp }) => {

    const mailOptions = {
        from: process.env.EMAIL,
        to: process.env.RECEIVER,
        subject: `Conversación entre Maxpower y ${name} - Maxpower page`,
        template: 'chat',
        context: {
            name, email, tel, messages, emp
        }

    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) console.log("Error al enviar email")
        //else resp.sendStatus(200)
    })
}

function checkVirtualServer() {
    const day = new Date().getDay()
    const hours = new Date().getHours()

    if ((day >= 1 && day < 6) && (hours >= 9 && hours < 17))
        return true
    return false

}

const SendNotificiationToDevices = (notify) => {
    Notification.sendMessage(notify)
}

const addMessageToClient = (message, id) => {

    for (let client of currentClientsConnected) {
        if (client.socket_id === id) {
            client.messages.push(message)
            if (message.from) {
                const notify = {
                    title: 'Maxpower chat',
                    body: `${client.name}: ${message.msg}`
                }
                SendNotificiationToDevices(notify)
            }
            break
        }
    }
}

