import React, { createContext, useState, useRef, useEffect } from 'react'
import io from 'socket.io-client'
import { colors } from '@material-ui/core'

export const SockContext = createContext()



export default function ChatProv(props) {

    const socket = useRef()

    const [chats, setChats] = useState([])
    const chatRef = useRef()

    useEffect(() => {
        socket.current = io("http://localhost:5000")

        //socket.current.emit('client')
        socket.current.emit('server_conn')

        socket.current.on('client_message', (data) => {
            console.log(data)
            const new_msg = { from: 1, msg: data.msg }
            addMessageToChat(data.from, new_msg)
        })

        socket.current.on('new_client_conn', (new_chat) => {
            setChats(chats => [...chats, new_chat])
        })

        return () => {
            socket.current.disconnect()
        }
    }, [])

    useEffect(() => {
        chatRef.current = [...chats]
    }, [chats])

    const sendMessageServer = (data) => {
        const new_msg = { from: 0, msg: data.text }
        addMessageToChat(data.to, new_msg)
        socket.current.emit('server_message', data)
    }

    const addMessageToChat = (to, message) => {

        let old = chatRef.current
        console.log(old, message)
        for (let c of old) {
            if (c.socket_id === to) {
                c.messages = [...c.messages, message]
                break
            }
        }
        setChats(chats => old)
    }

    return (
        <SockContext.Provider value={{ chats, sendMessageServer }}>
            {props.children}
        </SockContext.Provider>
    )
}