import React from 'react'
import { Link } from 'react-router-dom'
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
						<img src={cccc} className="img-fluid" alt="" />
						<div className="pos-wthree">
							<h4 className="text-wthree">Conoce nuestros <br /> Productos eléctricos</h4>
							{/* <a href="shop.html" className="btn shop mt-3"> Ver </a> */}
							<Link to={'/productos-electricos'} className="btn shop mt-3">Ver</Link>
						</div>
					</div>
					<div className="col-lg-6 bottom-w3pvt-left bottom-w3pvt-right p-lg-0">
						<img src={ffff} className="img-fluid" alt="" />
						<div className="pos-w3pvt">
							<h4 className="text-w3pvt">Conoce nuestros <br /> Productos electrónicos </h4>
							{/* <a href="shop.html" className="btn shop mt-3">Ver</a> */}
							<Link to={'/productos-electronicos'} className="btn shop mt-3">Ver</Link>
						</div>
					</div>
				</div>
			</section>

			<div class="benefit">
				<div class="container">
					<div class="row benefit_row">
						<div class="col-lg-3 benefit_col">
							<div class="benefit_item d-flex flex-row align-items-center">
								<div class="benefit_icon"><i class="fa fa-truck" aria-hidden="true"></i></div>
								<div class="benefit_content">
									<h6> ENTREGA RAPIDA </h6>
									<p> Sumando la entrega a domicilio sin cargo en un radio de 100km en CABA. </p>
								</div>
							</div>
						</div>
						<div class="col-lg-3 benefit_col">
							<div class="benefit_item d-flex flex-row align-items-center">
								<div class="benefit_icon"><i class="fa fa-handshake-o" aria-hidden="true"></i></div>
								<div class="benefit_content">
									<h6> Confiabilidad </h6>
									<p> Brindamos el mejor servicio y atención a nuestros clientes. </p>
								</div>
							</div>
						</div>
						<div class="col-lg-3 benefit_col">
							<div class="benefit_item d-flex flex-row align-items-center">
								<div class="benefit_icon"><i class="fa fa-check" aria-hidden="true"></i></div>
								<div class="benefit_content">
									<h6> Garantía y calidad </h6>
									<p> Garantizamos el arreglo y correcto funcionamiento de sus productos. </p>
								</div>
							</div>
						</div>
						<div class="col-lg-3 benefit_col">
							<div class="benefit_item d-flex flex-row align-items-center">
								<div class="benefit_icon"><i class="fa fa-clock-o" aria-hidden="true"></i></div>
								<div class="benefit_content">
									<h6>LUNES A VIERNES</h6>
									<p> Nuestro horario de atención al cliente es de  9:00AM HASTA LAS 17:00PM. </p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
