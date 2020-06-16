import React, { useContext } from 'react';
import './css/style.css';
import './css/style2.css';
import './css/font-awesome.css';
import { refProv } from '../../_useRefHook';

export default function HandCrafted() {
	const { handRef } = useContext(refProv);

	return (
		<div ref={handRef}>
			<section className="hand-crafted py-5">
				<div className="container py-lg-5">
					<div className="row accord-info">
						<div className="col-lg-6 pl-md-5">
							<h3
								className="mb-md-5 tittle"
								data-aos="fade-left"
								data-aos-duration="1500"
							>
								Conoce más sobre nosotros...
							</h3>

							{/* <p data-aos="fade-right" data-aos-duration="1500">
                                MaxPower es una empresa que brinda soluciones integrales a las industrias.
                                Contamos con más de 25 años de experiencia y debido a la formación profesional en
                                los distintos campos de acción, ofrecemos asesoramiento especializado en las
                                diferentes áreas de las empresas, anticipándonos a sus necesidades actuales y futuras,
                                mejorando el funcionamiento de los procesos continuos a través de la excelencia
                                y la calidad. Estamos comprometidos a brindar soluciones acorde a cada necesidad.
							</p> */}
							<br></br>
							<p data-aos="fade-right" data-aos-duration="1500">
								<span style={{ color: '#fff' }}>Nuestra misión:</span> Ser una empresa
								líder en el mercado brindando soluciones tecnológicas con valor agregado
								para nuestros clientes.
							</p>
							<p data-aos="fade-right" data-aos-duration="1500">
								<span style={{ color: '#fff' }}>Nuestra visión:</span> Ser referentes en
								el mercado nacional e internacional a través de un servicio de
								asistencia de excelencia y eficiencia que nos permita apoyar el
								crecimiento y fortalecimiento del sector industrial.
							</p>
							<p className="mt-3"></p>
							<p></p>
						</div>

						<div
							className="col-lg-6 banner-image"
							data-aos="fade-left"
							data-aos-duration="3000"
						>
							<div className="img-effect">
								<img
									src="https://i.postimg.cc/XYnvQB8T/14-4.jpg"
									alt=""
									className="img-fluid image1"
								/>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
