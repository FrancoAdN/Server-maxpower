import React, { useContext } from 'react'
import certificate from './images/certificate.png'
import './css/style.css'
import './css/style2.css'
import './css/font-awesome.css'
import { refProv } from '../../_useRefHook'

export default function About() {
    const { aboutRef } = useContext(refProv)
    return (
        <div ref={aboutRef} data-aos="fade-right" data-aos-duration="1500">
            <section className="about py-5 my-md-5 animate__animated animate__slideInUp" id="nosotros">
                <div className="container">
                    <div className="row about_grids">
                        <div className="col-lg-5 mb-lg-0 mb-5 left-grid">
                            <div className="heading">
                                <h3 className="heading text-uppercase mb-5 pb-3"><span>SOBRE</span> NOSOTROS </h3>
                                {/* <!-- 
                            <h4 className="position">HISTORY</h4>
                            --> */}
                            </div>
                            <p className="mb-4"> MaxPower es una empresa que brinda soluciones integrales a las industrias. Contamos con más de 25 años de experiencia y debido a la formación profesional en los distintos campos de acción, ofrecemos asesoramiento especializado en las diferentes áreas de las empresas, anticipándonos a sus necesidades actuales y futuras, mejorando el funcionamiento de los procesos continuos a través de la excelencia y la calidad </p>
                            <img src={certificate} className="img-fluid" alt="certificate" /> <strong>Certified Company</strong>
                        </div>
                        <div className="col-lg-7 right-grid">
                            <div className="row right_inner_grids">
                                <div className="col-sm-6 icon1">
                                    <span className="fa fa-users"></span>
                                    <h4 className="text-uppercase my-3">Profesionales</h4>
                                    <p className="mb-4"> Nuestro trabajo, habla de nosotros, le garantizamos un excelente desempeño en nuestros servicios brindados para la satisfacción de nuestros clientes.</p>
                                </div>
                                <div className="col-sm-6 icon2">
                                    <span className="fa fa-handshake-o"></span>
                                    <h4 className="text-uppercase my-3"> Confiabilidad </h4>
                                    <p className="mb-4"> La confianza es un factor importante en el trabajo, es por ello que hacemos que nuestros clientes se sientan cómodos con nuestros servicios.</p>
                                </div>
                                <div className="col-sm-6 icon3 mb-sm-0 mb-3">
                                    <span className="fa fa-truck"></span>
                                    <h4 className="text-uppercase my-3"> Eficiencia </h4>
                                    <p className=""> Nos destacamos por garantizar entrega de productos a corto plazo, agregando a este el servicio de entrega a domicilio sin costo en un radio de 100km alrededor de CABA.</p>
                                </div>
                                <div className="col-sm-6 icon4">
                                    <span className="fa fa-check"></span>
                                    <h4 className="text-uppercase my-3"> Garantía </h4>
                                    <p className=""> Garantizamos el arreglo y correcto funcionamiento de sus productos. Brindamos a nuestros clientes productos y servicios con la mejor calidad.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
