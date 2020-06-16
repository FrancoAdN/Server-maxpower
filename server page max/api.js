require('dotenv').config()
const graphqlHTTP = require('express-graphql')
const socket = require('socket.io')
const express = require('express')
const schema = require('./schema')
const nodemailer = require('nodemailer')
const bodyParser = require('body-parser')
const cors = require('cors')

const PORT = process.env.PORT || 5000

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

const app = express()

app.use(cors())

app.use(bodyParser.json({ limit: '50mb', extended: true }))

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

app.use(express.static('public'))

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))



app.post('/contact', (req, resp) => {

    const { name, email, tel, emp, body } = req.body
    const mailOptions = {
        from: process.env.EMAIL,
        to: process.env.RECEIVER,
        subject: 'Contacto página web',
        text: `
        Nombre: ${name}
        Emprea: ${emp}
        Email: ${email}
        Teléfono: ${tel}
        \n
        ${body}`
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
        subject: 'Pedido de cotización web',
        text: `
        Nombre: ${name}
        Emprea: ${emp}
        Email: ${email}
        Teléfono: ${tel}
        \n
        ${body}`
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
        subject: 'Subscripción newsletter',
        text: `Email: ${newsletter}`
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
    })

    socket.on('client_conn', (data) => {

        console.log(`New client connection ${socket.id}`)
        data['socket_id'] = socket.id
        data['messages'] = [{ from: 0, msg: 'Bienvenido al chat!' }]
        conn_clients.push(socket.id)
        sendToServer('new_client_conn', data)

    })

    socket.on('client_message', ({ msg }) => {
        const client_msg = { from: socket.id, msg }
        sendToServer('client_message', client_msg)
    })


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

