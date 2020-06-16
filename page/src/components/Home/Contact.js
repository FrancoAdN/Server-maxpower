import React, { useState, useContext } from 'react'
import axios from 'axios'
import './css/style.css'
import './css/style2.css'
import './css/font-awesome.css'
import { refProv } from '../../_useRefHook'

export default function Contact() {

    const { contactRef } = useContext(refProv)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [emp, setEmp] = useState('')
    const [tel, setTel] = useState('')
    const [body, setBody] = useState('')


    const handleOnSubmit = (e) => {
        e.preventDefault()
        const contact = { name, email, tel, emp, body }
        axios.post('http://api.maxpower-ar.com/contact', contact)
        setName('')
        setEmail('')
        setTel('')
        setBody('')
        setEmp('')
    }

    return (
        <div ref={contactRef} data-aos="slide-right" data-aos-duration="3000">
            <section className="contact py-5 animate__animated animate__fadeIn" id="contact">
                <div className="container">
                    <h3 className="title-w3ls text-center text-bl mb-5">Contacto</h3>
                    <div className="row mx-sm-0 mx-2">
                        {/* <!-- map --> */}
                        <div className="col-lg-6 map">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13130.002933335736!2d-58.5668047!3d-34.6420551!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x433c634d34888c11!2sMAXPOWER%20INDUSTRIAL%20AUTOMATION!5e0!3m2!1ses-419!2sar!4v1590715803135!5m2!1ses-419!2sar" width="600" height="450" frameBorder="0" style={{ border: '0' }} allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
                        </div>
                        {/* <!-- //map --> */}
                        {/* <!-- contact form --> */}
                        <div className="col-lg-6 main_grid_contact">
                            <div className="form-w3ls p-md-5 p-4">
                                <h4 className="mb-4 sec-title-w3 let-spa text-bl"> Completa con tus datos: </h4>
                                <form onSubmit={(e) => handleOnSubmit(e)}>
                                    <div className="row">
                                        <div className="col-sm-6 form-group pr-sm-1">
                                            <input className="form-control" type="text" value={name} name="Name" placeholder="Nombre" required onChange={e => setName(e.target.value)} />
                                        </div>
                                        <div className="col-sm-6 form-group pl-sm-1">
                                            <input className="form-control" type="email" name="Email" placeholder="Email" value={email} required onChange={e => setEmail(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control" type="text" name="Phone Number" placeholder="Empresa" value={emp} required onChange={e => setEmp(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control" type="text" name="Phone Number" placeholder="Teléfono" value={tel} required onChange={e => setTel(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <textarea name="message" placeholder="Descripcion" required value={body} onChange={e => setBody(e.target.value)}></textarea>
                                    </div>
                                    <div className="input-group1 text-center">
                                        <button className="btn" type="submit">Enviar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {/* <!-- //contact form --> */}
                    </div>
                </div>
            </section>
        </div>
    )
}
