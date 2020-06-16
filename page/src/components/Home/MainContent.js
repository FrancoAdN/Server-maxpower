import React, { useContext } from 'react';
import twopng from './images/2.png';
import { Link } from 'react-router-dom';
import './css/slider.css';
import './css/style.css';
import './css/style2.css';
import './css/font-awesome.css';
import { refProv } from '../../_useRefHook';

export default function MainContent() {
	const executeScroll = (ref) => {
		window.scrollTo(0, ref.current.offsetTop);
	};

	const { aboutRef, featRef, handRef, contactRef } = useContext(refProv);
	return (
		<div>
			<div className="main-w3-pvt-header-sec" id="home">
				{/* <!-- header --> */}
				<header>
					{/* <!--/Top-Header--> */}
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
											<p>
												<i className="fa fa-phone mr-2"></i> +011 7520-5667
											</p>
										</div>
										{/* <!-- social icons --> */}
										<ul className="col-md-6 top-right-info text-md-right text-center">
											<li>
												<p className="" style={{ color: 'white' }}>
													Seguinos en:
												</p>
											</li>
											<li className="ml-3 mr-1">
												<a href="https://www.facebook.com/maxpower.industrial/">
													<span className="fa fa-facebook-f animate__animated  animate__fadeInUp"></span>
												</a>
											</li>
											<li>
												<a href="https://www.instagram.com/maxpower.industrial/">
													<span className="fa fa-instagram animate__animated  animate__fadeInUp"></span>
												</a>
											</li>
											<li className="mx-1">
												<a href="https://www.linkedin.com/in/maxpower-industrial-automation-8186903a">
													<span className="fa fa-linkedin animate__animated  animate__fadeInUp"></span>
												</a>
											</li>
											<li>
												<a href="https://www.youtube.com/channel/UCXcFJ1D2XFs2NL_5RulBmJw">
													<span className="fa fa-youtube animate__animated  animate__fadeInUp"></span>
												</a>
											</li>
										</ul>
										{/* <!-- //social icons --> */}
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* <!--//Top-Header--> */}
					<div className="container">
						<div className="header d-lg-flex justify-content-between align-items-center py-lg-3 px-lg-3">
							{/* <!-- logo --> */}
							<div id="logo">
								<h1>
									{/* <a href="index.html"><img src="images/2.png"></span></a> */}
									<Link to={'/'}>
										<img src={twopng} alt="logo" />
									</Link>
								</h1>
							</div>
							{/* <!-- //logo --> */}
							<div className="w3pvt-bg">
								{/* <!-- nav --> */}
								<div className="nav_w3pvt">
									<nav>
										<label htmlFor="drop" className="toggle">
											Menu
										</label>
										<input type="checkbox" id="drop" />
										<ul className="menu">
											<li className="active">
												<Link to={'/'}>Inicio</Link>
											</li>
											<li>
												<a onClick={() => executeScroll(aboutRef)}>Nosotros</a>
											</li>
											<li>
												<a onClick={() => executeScroll(featRef)}>Servicios</a>
											</li>
											<li>
												{/* <!-- First Tier Drop Down --> */}
												<label htmlFor="drop-2" className="toggle toogle-2">
													Productos{' '}
													<span className="fa fa-angle-down" aria-hidden="true"></span>
												</label>
												<a>
													Productos{' '}
													<span className="fa fa-angle-down" aria-hidden="true"></span>
												</a>
												<input type="checkbox" id="drop-2" />
												<ul>
													<li>
														<Link to={'/productos-electricos'} className="drop-text">
															Productos Eléctricos
														</Link>
													</li>
													<li>
														<Link to={'/productos-electronicos'} className="drop-text">
															Productos Electrónicos
														</Link>
													</li>
												</ul>
											</li>
										</ul>
									</nav>
								</div>
								{/* <!-- //nav --> */}
								<div className="justify-content-center">
									{/* <!-- search --> */}
									<div className="apply-w3-pvt ml-lg-3">
										<a
											className="btn read"
											role="button"
											onClick={() => executeScroll(contactRef)}
										>
											Contacto
										</a>
									</div>
									{/* <!-- //search --> */}
								</div>
							</div>
						</div>
					</div>
				</header>
				{/* <!-- //header --> */}

				{/* <!-- banner --> */}
				<section className="banner_w3pvt">
					<div className="csslider infinity" id="slider1">
						<input type="radio" name="slides" defaultChecked="checked" id="slides_1" />
						<input type="radio" name="slides" id="slides_2" />
						<input type="radio" name="slides" id="slides_3" />

						<ul>
							<li>
								<div className="banner-top">
									<div className="overlay">
										<div className="container">
											<div className="banner-info">
												<div className="banner-w3ls-inner">
													<h4
														className="animate__animated animate__fadeIn"
														data-aos="fade-left"
														data-aos-duration="1500"
													>
														VENTA DE PRODUCTOS Y SERVICIOS
													</h4>
													<h3
														className="animate__animated animate__fadeInLeft"
														data-aos="fade-right"
														data-aos-duration="1500"
													>
														AUTOMATIZACIÓN INDUSTRIAL
													</h3>
													<p
														className="animate__animated animate__fadeInLeft"
														data-aos="fade-left"
														data-aos-duration="1500"
													>
														Somos distribuidores de productos eléctricos y electrónicos para
														el sector industrial. Proporcionamos distintos servicios a las
														empresas, brindando un excelente desempeño y calidad con garantía
														en nuestro trabajo.
													</p>

													<div className="test-info text-left mt-lg-5 mt-4">
														<a
															className="btn mr-2 animate__animated animate__fadeInUp"
															onClick={() => executeScroll(handRef)}
														>
															Leer más
														</a>
														<a
															className="btn animate__animated animate__fadeInUp"
															onClick={() => executeScroll(contactRef)}
														>
															Contactános
														</a>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</li>
							<li>
								<div className="banner-top1">
									<div className="overlay sec">
										<div className="container">
											<div className="banner-info">
												<div className="banner-w3ls-inner">
													<h4> MAXPOWER INDUSTRIAL AUTOMATION </h4>
													<h3> SOLUCIONES INTEGRALES </h3>
													<p>
														Buscamos a través de un servicio de asistencia en excelencia y
														eficiencia, apoyar el crecimiento y fortalecimiento del sector
														industrial, siendo asi una empresa líder en el mercado brindando
														soluciones tecnológicas con valor agregado para nuestros clientes.
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</li>
							<li>
								<div className="banner-top2">
									<div className="overlay">
										<div className="container">
											<div className="banner-info">
												<div className="banner-w3ls-inner">
													<h4> PRODUCTOS ELÉCTRICOS Y ELECTRÓNICOS </h4>
													<h3> IMPORTADORES Y DISTRIBUIDORES </h3>
													<p>
														A pesar del COVID-19, seguimos importando productos eléctricos y
														electrónicos para nuestros clientes. Estamos a su disposición, no
														dude en contactárnos!
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</li>
						</ul>
						<div className="arrows">
							<label htmlFor="slides_1"></label>
							<label htmlFor="slides_2"></label>
							<label htmlFor="slides_3"></label>
						</div>
					</div>
				</section>
				{/* <!-- //slider --> */}
			</div>
		</div>
	);
}
