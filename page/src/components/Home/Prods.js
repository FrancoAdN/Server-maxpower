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
                        <img src={cccc} className="img-fluid" alt="" />
                        <div className="pos-wthree">
                            <h4 className="text-wthree">Conoce nuestros <br /> Productos electricos</h4>
                            <a href="shop.html" className="btn shop mt-3"> Ver </a>
                        </div>
                    </div>
                    <div className="col-lg-6 bottom-w3pvt-left bottom-w3pvt-right p-lg-0">
                        <img src={ffff} className="img-fluid" alt="" />
                        <div className="pos-w3pvt">
                            <h4 className="text-w3pvt">Conoce nuestros <br /> Productos electronicos </h4>
                            <a href="shop.html" className="btn shop mt-3">Ver</a>
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
							<h6>free shipping</h6>
							<p>Suffered Alteration in Some Form</p>
						</div>
					</div>
				</div>
				<div class="col-lg-3 benefit_col">
					<div class="benefit_item d-flex flex-row align-items-center">
						<div class="benefit_icon"><i class="fa fa-money" aria-hidden="true"></i></div>
						<div class="benefit_content">
							<h6>cach on delivery</h6>
							<p>The Internet Tend To Repeat</p>
						</div>
					</div>
				</div>
				<div class="col-lg-3 benefit_col">
					<div class="benefit_item d-flex flex-row align-items-center">
						<div class="benefit_icon"><i class="fa fa-undo" aria-hidden="true"></i></div>
						<div class="benefit_content">
							<h6>45 days return</h6>
							<p>Making it Look Like Readable</p>
						</div>
					</div>
				</div>
				<div class="col-lg-3 benefit_col">
					<div class="benefit_item d-flex flex-row align-items-center">
						<div class="benefit_icon"><i class="fa fa-clock-o" aria-hidden="true"></i></div>
						<div class="benefit_content">
							<h6>LUNES A VIERNES</h6>
							<p> DE 9AM - 17:00PM</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
        </div>
    )
}
