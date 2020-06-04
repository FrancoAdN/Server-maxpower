import React, { createContext, useState, useRef, useEffect } from 'react'
import io from 'socket.io-client'

export const SockContext = createContext()



export default function ChatProv(props) {

    const socket = useRef()

    const d_chats = [
        {
            socket_id: 'sock-1',
            name: 'Franco',
            messages: [
                { from: 0, msg: 'Bienvenido al chat de maxpower Franco' },
                { from: 1, msg: 'Bienvenido al chat de maxpower Franco' },
                { from: 0, msg: 'test Franco' }
            ]
        },
        {
            socket_id: 'sock-2',
            name: 'Tomas',
            messages: [
                { from: 0, msg: 'Bienvenido al chat de maxpower Tomas' },
                { from: 1, msg: 'Hola server' },
                { from: 1, msg: 'pedido de cotizacion' }
            ]
        },
        {
            socket_id: 'sock-3',
            name: 'Leonel',
            messages: [
                { from: 0, msg: 'Bienvenido al chat de maxpower Leonel' },
                { from: 1, msg: 'Hola maxpa' },
                { from: 1, msg: 'como va?' }
            ]
        },
    ]
    const [chats, setChats] = useState([])

    useEffect(() => {
        socket.current = io("http://localhost:5000")

        //socket.current.emit('client')
        socket.current.emit('server_conn')

        socket.current.on('new_client_conn', (new_chat) => {
            setChats(chats => [...chats, new_chat])
        })


        /*socket.current.on("server_resp", (data) => {
            console.log("resp", data);
        });*/

        return () => {
            socket.current.disconnect()
        }
    }, [])


    const sendMessageServer = (data) => {

        const new_msg = { from: 0, msg: data.text }
        let old = chats.slice()
        for (let c of old) {
            if (c.socket_id === data.to) {
                c.messages = [...c.messages, new_msg]
                break
            }
        }
        setChats(chats => old)
        socket.current.emit('server_message', data)


        /*setMessages(messages => [...messages, data])
        socket.current.emit("client_message", data)*/
    };

    return (
        <SockContext.Provider value={{ chats, sendMessageServer }}>
            {props.children}
        </SockContext.Provider>
    )
}