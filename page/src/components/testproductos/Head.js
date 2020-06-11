import React from 'react'
import twologo from '../Home/images/2.png'
import '../Home/css/slider.css'
import '../Home/css/style.css'
import '../Home/css/style2.css'
import '../Home/css/font-awesome.css'

export default function Head() {
    return (
        <div className="main-w3-pvt-header-sec page-w3pvt-inner">
            <div className="overlay-innerpage">
                <header>
                    <div className="top-bar-w3layouts pt-4">
                        <div className="container">
                            <div className="row">
                                <div className="offset-xl-5"></div>
                                <div className="col-xl-7 top-social-lavi text-md-right text-center mt-md-0 mt-2">
                                    <div className="row right-top-info">
                                        <div className="col-md-6 header-top text-xl-right text-center">
                                            <p className="mr-2">
                                                <span className="fa fa-map-marker mr-2"></span> Argentina
								            </p>
                                            <p><i className="fa fa-phone mr-2"></i> +011 7520-5667</p>
                                        </div>
                                        <ul className="col-md-6 top-right-info text-md-right text-center">
                                            <li>
                                                <p style={{ color: 'white' }}>Seguinos en:</p>
                                            </li>
                                            <li className="ml-3 mr-1">
                                                <a href="#">
                                                    <span className="fa fa-facebook-f animate__animated  animate__fadeInUp"></span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <span className="fa fa-instagram animate__animated  animate__fadeInUp"></span>
                                                </a>
                                            </li>
                                            <li className="mx-1">
                                                <a href="#">
                                                    <span className="fa fa-linkedin animate__animated  animate__fadeInUp"></span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <span className="fa fa-youtube animate__animated  animate__fadeInUp"></span>
                                                </a>
                                            </li>
                                        </ul>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="header d-lg-flex justify-content-between align-items-center py-lg-3 px-lg-3">
                            <div id="logo">
                                <h1>
                                    <a href="index.html"><img src={twologo} /><span></span></a>
                                </h1>
                            </div>

                            <div className="w3pvt-bg">
                                <div className="nav_w3pvt">
                                    <nav>
                                        <label htmlFor="drop" className="toggle">Menu</label>
                                        <input type="checkbox" id="drop" />
                                        <ul className="menu">
                                            <li><a href="index.html">Inicio</a></li>
                                            <li className="active"><a href="about.html">Nosotros</a></li>
                                            <li><a href="blog.html">Servicios</a></li>
                                            <li>

                                                <label htmlFor="drop-2" className="toggle toogle-2">
                                                    Productos<span className="fa fa-angle-down" aria-hidden="true"></span>
                                                </label>
                                                <a href="#">Productos <span className="fa fa-angle-down" aria-hidden="true"></span></a>
                                                <input type="checkbox" id="drop-2" />
                                                <ul>

                                                    <li><a href="#process" className="drop-text">Process</a></li>
                                                    <li><a href="#stats" className="drop-text">Statistics</a></li>
                                                    <li><a href="#services" className="drop-text">Services</a></li>
                                                    <li><a href="#team" className="drop-text">Our Team</a></li>
                                                    <li><a href="index.html" className="drop-text">Clients</a></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>

                                <div className="justify-content-center">

                                    <div className="apply-w3-pvt ml-lg-3">
                                        <a className="btn read" href="contact.html" role="button">Contacto</a>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        </div>
    )
}
