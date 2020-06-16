import React, { useState } from 'react'
import Modal from 'react-modal'
import axios from 'axios'
import './styles/popup.css'

export default function Popup({ cotizacion, setCotizacion }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [emp, setEmp] = useState('')
    const [tel, setTel] = useState('')
    const [body, setBody] = useState('')


    const handleOnSubmit = (e) => {
        e.preventDefault()
        const cot = { name, email, tel, emp, body }
        axios.post('http://api.maxpower-ar.com/cotizacion', cot)
        setName('')
        setEmail('')
        setTel('')
        setBody('')
        setEmp('')

    }

    return (
        <Modal
            isOpen={cotizacion}
            onRequestClose={() => setCotizacion(false)}
            className={"popup-modal"}
        // style={{
        //     content: {
        //         position: 'absolute',
        //         margin: 'auto',
        //         width: '520px',
        //         height: '90%'
        //     }
        // }}
        >
            <div className="main_grid_contact">
                <form onSubmit={(e) => handleOnSubmit(e)}>
                    <h4 className="mb-4 sec-title-w3 let-spa text-bl"> SOLICITUD DE COTIZACIÓN: </h4>
                    <p className="one-popup">Los datos ingresados deben ser reales para su posterior contacto.</p>
                    <div className="row">
                        <div className="col-sm-6 form-group pr-sm-1">
                            <input className="form-control" type="text" name="Name" placeholder="Nombre" value={name} required onChange={e => setName(e.target.value)} />
                        </div>
                        <div className="col-sm-6 form-group pl-sm-1">
                            <input className="form-control" type="email" name="Email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="text" name="Empreas" placeholder="Empresa" value={emp} onChange={e => setEmp(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="text" name="Phone Number" placeholder="Teléfono" value={tel} onChange={e => setTel(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <textarea name="message" placeholder="Descripcion" required value={body} onChange={e => setBody(e.target.value)}></textarea>
                    </div>
                    <p className="desc-popup">Al realizar su pedido de cotización, debe tener en cuenta que, <br></br>el monto mínimo de compra debe ser igual o superior a 100 usd.</p>
                    {/* <p className="desc-popup2"> El monto minimo de compra debe ser de 100 usd.</p> */}
                    <div className="input-group1 text-center">
                        <button className="btn" type="submit">Enviar</button>
                    </div>
                </form>

            </div>

        </Modal>

    )
}
