import React from 'react'
import './css/slider.css'
import './css/style.css'
import './css/style2.css'
import './css/font-awesome.css'

export default function Features({ feat }) {
    return (
        <div ref={feat}>
            <div className="welcome py-5 animate__animated animate__slideInUp" id="features">
                <div className="container py-xl-5 py-lg-3">
                    <div className="row">
                        <div className="col-lg-5 welcome-left">
                            <p>¿Por qué elegirnos?</p>
                            <h3 className="tittle-wthree mt-2 mb-3">
                                Nuestros servicios a su comodidad
							</h3>

                            <p className="mt-4 pr-lg-5">
                                Estos son algunos de nuestros servicios en los cuales nos especializamos.
                                Brindamos un excelente desempeño y un trabajo profesional en nuestras
                                tareas, dando seguridad y confianza a nuestros clientes.
							</p>
                        </div>
                        <div className="col-lg-7 welcome-right text-center mt-lg-0 mt-5">
                            <div className="row">
                                <div className="col-sm-4 service-1-w3ls serve-gd2">
                                    <div className="serve-grid mt-3">
                                        <span className="fa fa-wrench s2"></span>
                                        <p className="mt-2">Reparaciones</p>
                                    </div>
                                    <div className="serve-grid mt-4">
                                        <span className="fa fa-briefcase s3"></span>
                                        <p className="mt-2">Mantenimiento</p>
                                    </div>
                                </div>
                                <div className="col-sm-4 service-1-w3ls serve-gd3">
                                    <div className="serve-grid mt-4">
                                        <span className="fa fa-tachometer s4"></span>
                                        <p className="mt-2">Diagnóstico</p>
                                    </div>
                                    <div className="serve-grid mt-4">
                                        <span className="fa fa-address-card-o s5"></span>
                                        <p className="text-li mt-2">Capacitaciones</p>
                                    </div>
                                    <div className="serve-grid mt-4">
                                        <span className="fa fa-spinner s6"></span>
                                        <p className="mt-2">Armónicos</p>
                                    </div>
                                </div>
                                <div className="col-sm-4 service-1-w3ls serve-gd2">
                                    <div className="serve-grid mt-4">
                                        <span className="fa fa-podcast s1"></span>
                                        <p className="mt-2">Termografía</p>
                                    </div>
                                    <div className="serve-grid mt-4">
                                        <span className="fa fa-handshake-o s7"></span>
                                        <p className="mt-2">Atención</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
