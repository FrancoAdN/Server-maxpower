import React, { useState, useContext } from 'react'
import './Chat.css'
import { SockContext } from '../../_useChat'


export default function Chat() {
    const { chats, sendMessageServer } = useContext(SockContext)


    const [currentChat, setCurrentChat] = useState({})


    return (
        <div className="container main-chat">
            <div className="row h-100">
                <div className="col-3 h-100">

                    <div className="row toprow">
                        <h4 className="mx-auto my-auto">Maxpower Chat</h4>
                    </div>

                    <div className="row mainrow d-flex flex-column">
                        {
                            chats.map(chat => (
                                <ChatClient
                                    key={chat.socket_id}
                                    client={chat}
                                    change={setCurrentChat}
                                />
                            ))
                        }
                    </div>
                </div>

                <div className="col h-100">

                    <ClientContent client={currentChat} emitMsg={sendMessageServer} />
                </div>



            </div>
        </div>
    )
}


function ChatClient({ client, change }) {
    return (
        <div className="d-flex flex-column w-100"
            style={{ height: '60px', borderBottom: '1px solid black' }}
            onClick={() => change(client)}>
            <span className="mx-auto" style={{ fontSize: '20px' }}>{client.name}</span>
            <span className="mx-auto" style={{ fontSize: '12px' }}>{client.messages[client.messages.length - 1].msg}</span>
        </div>
    )
}

function ClientContent({ client, emitMsg }) {
    const [text, setText] = useState('')

    const sendMessage = () => {

        const message = {
            to: client.socket_id,
            text
        }

        emitMsg(message)
        setText('')
    }

    if (client.messages) {
        return (
            <div className="row h-100">
                <div className="w-100 toprow" align="center">
                    <h4 className="mx-auto my-auto">{client.name}</h4>
                </div>

                <div className="w-100 mainrow">
                    <div className="content d-flex flex-column overflow-auto">
                        {/* MESSAGES HERE */

                            client.messages.map((message, i) => (
                                <p key={i}>{message.msg}</p>
                            ))
                        }
                    </div>
                    <div className="send-div">
                        <div className="in-msg d-flex justify-content-around">
                            <input
                                type="text"
                                value={text}
                                onChange={e => setText(e.target.value)}
                                onKeyDown={e => {
                                    if (e.key === "Enter") {
                                        e.preventDefault()
                                        sendMessage()
                                    }
                                }}
                            />
                            <span className="text-primary" onClick={sendMessage}>Send</span>
                        </div>
                    </div>
                </div>



            </div>

        )
    }
    return (
        <div className="row h-100">
            <div className="w-100 toprow" align="center">

            </div>

            <div className="w-100 mainrow">
                <div className="send-div">
                    <div className="in-msg d-flex justify-content-around">
                        <input
                            type="text"
                        />
                        <span className="text-primary" onClick={sendMessage}>Send</span>
                    </div>
                </div>
            </div>



        </div>
    )

}