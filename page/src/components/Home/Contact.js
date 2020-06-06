import React from 'react'
import './css/slider.css'
import './css/style.css'
import './css/style2.css'
import './css/font-awesome.css'

export default function Contact() {
    return (
        <div>
            <section className="contact py-5 animate__animated animate__fadeIn" id="contact">
                <div className="container">
                    <h3 className="title-w3ls text-center text-bl mb-5">Contacto</h3>
                    <div className="row mx-sm-0 mx-2">
                        {/* <!-- map --> */}
                        <div className="col-lg-6 map">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13130.002933335736!2d-58.5668047!3d-34.6420551!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x433c634d34888c11!2sMAXPOWER%20INDUSTRIAL%20AUTOMATION!5e0!3m2!1ses-419!2sar!4v1590715803135!5m2!1ses-419!2sar" width="600" height="450" frameborder="0" style={{ border: '0' }} allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
                        </div>
                        {/* <!-- //map --> */}
                        {/* <!-- contact form --> */}
                        <div className="col-lg-6 main_grid_contact">
                            <div className="form-w3ls p-md-5 p-4">
                                <h4 className="mb-4 sec-title-w3 let-spa text-bl"> - </h4>
                                <form action="#" method="post">
                                    <div className="row">
                                        <div className="col-sm-6 form-group pr-sm-1">
                                            <input className="form-control" type="text" name="Name" placeholder="Nombre" required="" />
                                        </div>
                                        <div className="col-sm-6 form-group pl-sm-1">
                                            <input className="form-control" type="email" name="Email" placeholder="Email"
                                                required="" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control" type="text" name="Subject" placeholder="Tema"
                                            required="" />
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control" type="text" name="Phone Number" placeholder="Telefono"
                                            required="" />
                                    </div>
                                    <div className="form-group">
                                        <textarea name="message" placeholder="Descripcion" required=""></textarea>
                                    </div>
                                    <div className="input-group1 text-right">
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
