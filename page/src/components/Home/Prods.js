import React from 'react';
import { Link } from 'react-router-dom';
import './css/style.css';
import './css/style2.css';
import './css/font-awesome.css';
import cccc from './images/cccc.jpg';
import ffff from './images/ffff.jpg';

export default function Prods() {
	return (
		<div>
			<section
				className="shipping-wthree"
				data-aos="zoom-in"
				data-aos-duration="1500"
			>
				<div className="shiopping-grids d-lg-flex">
					<div className="col-lg-4 shiopping-gd text-center">
						<div className="icon-gd">
							<span className="fa fa-truck" aria-hidden="true"></span>
						</div>
						<div className="icon-gd-info">
							<h3>
								{' '}
								STOCK EN VARIADORES <span>ATV930 90KW</span>{' '}
							</h3>
							<p>
								{' '}
								Disponemos de stock en variadores ATV930 90KW de{' '}
								<span> Schneider Electric</span>, comuniquese con nosotros para
								brindarle la ficha tecnica y/o resolver sus dudas! Su consulta no
								molesta.{' '}
							</p>
						</div>
					</div>
					<div className="col-lg-4 shiopping-gd sec text-center">
						<div className="icon-gd">
							<span className="fa fa-users" aria-hidden="true"></span>
						</div>
						<div className="icon-gd-info">
							<h3 className="title-second"> SERVICIO DE ASISTENCIA TÉCNICA ONLINE </h3>
							<p className="desc-second">
								Hemos implementado un servicio de asistencia técnica online con
								video-llamadas, telefónico y whatsapp para poder asistir a las empresas.
							</p>
						</div>
					</div>
					<div className="col-lg-4 shiopping-gd text-center">
						<div className="icon-gd">
							{' '}
							<span className="fa fa-plane" aria-hidden="true"></span>
						</div>
						<div className="icon-gd-info">
							<h3>
								{' '}
								SEGUIMOS <span className="import">IMPORTANDO </span>PRODUCTOS{' '}
							</h3>
							<p>
								{' '}
								A pesar del <span className="import"> COVID-19 </span>, seguimos
								importando{' '}
								<span className="import"> productos electricos y electronicos</span>{' '}
								para nuestros clientes.Estamos a su disposicion, no dude en
								contactarnos!
							</p>
						</div>
					</div>
				</div>
			</section>
			<section
				className="mid-section animate__animated animate__zoomIn"
				data-aos="fade-right"
				data-aos-duration="1500"
			>
				<div className="d-lg-flex p-0">
					<div className="col-lg-6 bottom-w3pvt-left p-lg-0">
						<img src={cccc} className="img-fluid" alt="" />
						<div className="pos-wthree">
							<h4 className="text-wthree">
								Conoce nuestros <br /> Productos eléctricos
							</h4>
							{/* <a href="shop.html" className="btn shop mt-3"> Ver </a> */}
							<Link to={'/productos-electricos'} className="btn shop mt-3">
								Ver
							</Link>
						</div>
					</div>
					<div className="col-lg-6 bottom-w3pvt-left bottom-w3pvt-right p-lg-0">
						<img src={ffff} className="img-fluid" alt="" />
						<div className="pos-w3pvt">
							<h4 className="text-w3pvt">
								Conoce nuestros <br /> Productos electrónicos{' '}
							</h4>
							{/* <a href="shop.html" className="btn shop mt-3">Ver</a> */}
							<Link to={'/productos-electronicos'} className="btn shop mt-3">
								Ver
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/*
			<div className="benefit">
				<div className="container">
					<div className="row benefit_row">
						<div className="col-lg-3 benefit_col">
							<div className="benefit_item d-flex flex-row align-items-center">
								<div className="benefit_icon">
									<i className="fa fa-truck" aria-hidden="true"></i>
								</div>
								<div className="benefit_content">
									<h6> ENTREGA RAPIDA </h6>
									<p>
										{' '}
										Sumando la entrega a domicilio sin cargo en un radio de 100km en CABA.{' '}
									</p>
								</div>
							</div>
						</div>
						<div className="col-lg-3 benefit_col">
							<div className="benefit_item d-flex flex-row align-items-center">
								<div className="benefit_icon">
									<i className="fa fa-handshake-o" aria-hidden="true"></i>
								</div>
								<div className="benefit_content">
									<h6> Confiabilidad </h6>
									<p> Brindamos el mejor servicio y atención a nuestros clientes. </p>
								</div>
							</div>
						</div>
						<div className="col-lg-3 benefit_col">
							<div className="benefit_item d-flex flex-row align-items-center">
								<div className="benefit_icon">
									<i className="fa fa-check" aria-hidden="true"></i>
								</div>
								<div className="benefit_content">
									<h6> Garantía y calidad </h6>
									<p>
										{' '}
										Garantizamos el arreglo y correcto funcionamiento de sus productos.{' '}
									</p>
								</div>
							</div>
						</div>
						<div className="col-lg-3 benefit_col">
							<div className="benefit_item d-flex flex-row align-items-center">
								<div className="benefit_icon">
									<i className="fa fa-clock-o" aria-hidden="true"></i>
								</div>
								<div className="benefit_content">
									<h6>LUNES A VIERNES</h6>
									<p>
										{' '}
										Nuestro horario de atención al cliente es de 9:00AM HASTA LAS 17:00PM.{' '}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		*/}
		</div>
	);
}
