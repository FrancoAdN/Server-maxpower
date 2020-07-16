require('dotenv').config()
const graphqlHTTP = require('express-graphql')
const socket = require('socket.io')
const express = require('express')
const schema = require('./schema')
const nodemailer = require('nodemailer')
const bodyParser = require('body-parser')
const hbs = require('nodemailer-express-handlebars')
const cors = require('cors')
const system_query = require('./db-system')

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
    graphiql: false
}))

app.get('/login', (req, resp) => {
    const { usr, pwd } = req.query
    const sql = `SELECT 1 FROM Empleados WHERE usuario LIKE '${usr}' AND pwd = '${pwd}'`
    if (system_query(sql).length == 1) resp.send(true)
    else resp.send(false)

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


const server = app.listen(PORT, () => console.log(`Server running port: ${PORT}`))

const io = socket(server)

let conn_server = []
let conn_clients = []

io.sockets.on('connection', (socket) => {

    console.log('new connection ' + socket.id)

    socket.on('server_conn', () => {
        conn_server.push(socket.id)
        console.log(`New server connection ${socket.id}`)
        if (conn_clients.length != 0) {
            for (const c of conn_clients)
                io.to(c).emit('existing_conv')

        }
    })

    socket.on('client_conn', (data) => {

        console.log(`New client connection ${socket.id}`)
        sendNewConnection(data);
        if (conn_server.length != 0 || checkVirtualServer()) {
            data['socket_id'] = socket.id
            data['messages'] = [{ from: 0, msg: 'Bienvenido al chat!', time: new Date().getTime() }]
            conn_clients.push(socket.id)
            sendToServer('new_client_conn', data)
        } else
            io.to(socket.id).emit('server_disconnected')

    })

    socket.on('client_message', ({ msg }) => {
        const client_msg = { from: socket.id, msg }
        sendToServer('client_message', client_msg)
    })

    socket.on('client_existing_conv', (data) => {
        data['socket_id'] = socket.id
        sendToServer('new_client_conn', data)
    })

    socket.on('client_conversation', (data) => sendConversationEmail(data))

    socket.on('server_message', (data) => {
        const message = { from: 0, msg: data.text }
        io.to(data.to).emit('server_message', message)
    })


    socket.on('disconnect', () => {
        let found = false

        for (let [i, sock] of conn_clients.entries()) {
            if (sock == socket.id) {
                conn_clients.splice(i, 1)
                found = true
                sendToServer('client_disconnected', socket.id)
                break
            }
        }

        if (!found) {
            for (let [i, sock] of conn_server.entries()) {
                if (sock == socket.id) {
                    conn_server.splice(i, 1)
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
        to: process.env.EMAIL,
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
        to: process.env.EMAIL,
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