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
    console.log(req.body)

})

app.post('/cotizacion', (req, resp) => {
    console.log(req.body)
    const mailOptions = {
        from: process.env.EMAIL,
        to: process.env.RECEIVER,
        subject: 'Contacto página web',
        text: ''
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


    socket.on('server_conn', () => {
        conn_server.push(socket.id)
        console.log(`New server connection ${socket.id}`)
    })

    socket.on('client_conn', (data) => {

        const new_client = { socket_id: socket.id, name: data.name, messages: [] }
        conn_clients.push(socket.id)
        sendToServer('new_client_conn', new_client)
        console.log(`New client connection ${socket.id}`)

    })

    socket.on('disconnect', () => {
        //console.log(`Server-client disconnected ${socket.id}`)
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

    /*socket.on('client_message', (data) => {
        console.log(data)
    })

    socket.on('server_message', (data) => {
        console.log(data)
        socket.emit('server_resp', data)
    })*/

})


const sendToServer = (event, data) => {
    for (let sock of conn_server)
        io.to(sock).emit(event, data)
}