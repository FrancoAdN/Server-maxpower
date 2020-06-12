import React from 'react'
import './headertop.css'
import { NavLink, Link } from 'react-router-dom'
import logo from '../../logos/maxpower.png'
import facebook from '../../logos/facebook.png'
import instagram from '../../logos/instagram.png'
import linkedin from '../../logos/linkedin.png'
import youtube from '../../logos/youtube.png'

export default function HeaderTop({ btnCot }) {
    return (
        <div className="bg-light d-block">
            <div className="container">
                <div className="row">
                    <div className="col-2">
                        <center>
                            <img src={logo} alt="maxpower logo" />
                        </center>
                    </div>
                    <div className="col-8 d-flex flex-column">
                        <center>

                            <h2 className="let-sp-10"><span className="red-color">MAX</span><span>POWER</span></h2>
                            <span className="let-sp-3 grey-color">INDUSTRIAL AUTOMATION</span>

                            <div>
                                <hr />
                                <div className="d-flex flex-row justify-content-around grey-color">
                                    <Link to={'/'} style={{ textDecoration: 'none', color: '#9f9f9f' }}><span className="head-items">INICIO</span></Link>
                                    <Link to={'/productos-electricos'} style={{ textDecoration: 'none', color: '#9f9f9f' }}><span className="head-items">PRODUCTOS ELÉCTRICOS</span></Link>
                                    <Link to={'/productos-electronicos'} style={{ textDecoration: 'none', color: '#9f9f9f' }}><span className="head-items">PRODUCTOS ELECTRÓNICOS</span></Link>
                                </div>
                                <hr />
                            </div>


                        </center>

                    </div>

                    <div className="col-2 d-flex flex-column justify-content-around">
                        <div className="d-flex flex-row justify-content-center">
                            <img className="mg-5" src={facebook} alt="facebook" />
                            <img className="mg-5" src={instagram} alt="instagram" />
                            <img className="mg-5" src={linkedin} alt="linkedin" />
                            <img className="mg-5" src={youtube} alt="youtube" />
                        </div>

                        <button className="btn btn-cot" onClick={btnCot}>Pedir cotización</button>

                    </div>
                </div>
            </div>
        </div>
    )
}
