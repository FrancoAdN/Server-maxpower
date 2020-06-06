import React from 'react'
import onepng from './images/1.png'
import './css/slider.css'
import './css/style.css'
import './css/style2.css'
import './css/font-awesome.css'

export default function Footer() {
    return (
        <div>
            <footer className="py-5">
                <div className="container py-xl-4">
                    <div className="row footer-top">
                        <div className="col-lg-4 footer-grid_section_1its footer-text">
                            {/* <!-- logo --> */}
                            <h2>
                                <a className="logo text-wh" href="index.html">
                                    <img src={onepng} alt="" className="img-fluid" />
                                </a>
                            </h2>
                            {/* <!-- //logo --> */}
                            <p className="mt-lg-4 mt-3 mb-lg-5 mb-4">Ofrecemos asesoramiento especilizado en las diferentes áreas de las empresas anticipándonos
                            a sus necesidades actuales y futuras, mejorando el funcionamiento de los procesos continuos
                                a través de la excelencia y la calidad.</p>
                            {/* <!-- social icons --> */}
                            <ul className="top-right-info">
                                <li>
                                    <p> Seguinos en: </p>
                                </li>
                                <li className="facebook-w3">
                                    <a href="#facebbok">
                                        <span className="fa fa-facebook-f"></span>
                                    </a>
                                </li>
                                <li className="twitter-w3">
                                    <a href="#twitter">
                                        <span className="fa fa-instagram"></span>
                                    </a>
                                </li>
                                <li className="google-w3">
                                    <a href="#google">
                                        <span className="fa fa-linkedin"></span>
                                    </a>
                                </li>
                                <li className="dribble-w3">
                                    <a href="#dribble">
                                        <span className="fa fa-youtube"></span>
                                    </a>
                                </li>
                            </ul>
                            {/* <!-- //social icons --> */}
                        </div>
                        <div className="col-lg-4 footer-grid_section_1its my-lg-0 my-sm-4 my-4">
                            <div className="footer-title">
                                <h3> <span>Nosotros</span></h3>
                            </div>
                            <div className="footer-text mt-4">
                                <br />
                                <ul className="contact_details">
                                    <li><i className="fa fa-envelope-o"></i> ventas@maxpowerautomation.com </li>
                                    <li><i className="fa fa-envelope-o"></i> agutierrez@maxpowerautomation.com </li>
                                    <li><i className="fa fa-phone-square"></i> (011)7524-1400 </li>
                                    <li><i className="fa fa-phone-square"></i> (011) 7520-5667 </li>
                                    <li><i className="fa fa-phone-square"></i> (011) 7502-9920 </li>
                                    <li><i className="fa fa-home"></i> Belgrano 180, Oficina-5, Ramos Mejía.</li>
                                    <li><a href="https://g.page/maxpower-industrial-automation?share"><i className="fa fa-map-marker"></i> Ver en el mapa </a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4 footer-grid_section_1its">
                            <div className="footer-title">
                                <h3> Contactanos </h3>
                            </div>
                            <br />
                            <div className="info-form-right mt-4 p-0">
                                <form action="#" method="post">
                                    <div className="row">
                                        <div className="col-lg-6 form-group mb-2 pr-lg-1">
                                            <input type="text" className="form-control" name="Name" placeholder="Nombre" required="" />
                                        </div>
                                        <div className="col-lg-6 form-group mb-2 pl-lg-1">
                                            <input type="text" className="form-control" name="Phone" placeholder="Telefono"
                                                required="" />
                                        </div>
                                    </div>
                                    <div className="form-group mb-2">
                                        <input type="email" className="form-control" name="Email" placeholder="Email" required="" />
                                    </div>
                                    <div className="form-group mb-2">
                                        <textarea name="Comment" className="form-control" placeholder="Descripcion"
                                            required=""></textarea>
                                    </div>
                                    <button type="submit" className="btn submit-contact ml-auto">Enviar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
