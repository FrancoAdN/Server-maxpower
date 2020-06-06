import React from 'react'
import './css/slider.css'
import './css/style.css'
import './css/style2.css'
import './css/font-awesome.css'
import cccc from './images/cccc.jpg'
import ffff from './images/ffff.jpg'

export default function Prods() {
    return (
        <div>
            <section className="mid-section animate__animated animate__zoomIn">
                <div className="d-lg-flex p-0">
                    <div className="col-lg-6 bottom-w3pvt-left p-lg-0">
                        <img src={ffff} className="img-fluid" alt="" />
                        <div className="pos-wthree">
                            <h4 className="text-wthree">Conoce nuestros <br /> Productos electricos</h4>
                            <a href="shop.html" className="btn shop mt-3"> Ver </a>
                        </div>
                    </div>
                    <div className="col-lg-6 bottom-w3pvt-left bottom-w3pvt-right p-lg-0">
                        <img src={cccc} className="img-fluid" alt="" />
                        <div className="pos-w3pvt">
                            <h4 className="text-w3pvt">Conoce nuestros <br /> Productos electronicos </h4>
                            <a href="shop.html" className="btn shop mt-3">Ver</a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
