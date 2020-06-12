import React, { useState } from 'react'
import Head from './Head'
import Footer from '../Home/Footer'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import Grid from '@material-ui/core/Grid'
import Loading from '../Loading/Loading'


import './plugins/font-awesome-4.7.0/css/font-awesome.min.css'
import './plugins/OwlCarousel2-2.2.1/owl.carousel.css'
import './plugins/OwlCarousel2-2.2.1/owl.theme.default.css'
import './plugins/OwlCarousel2-2.2.1/animate.css'
import './styles/main_styles.css'
import './styles/responsive.css'
import './styles/Product.css'
import './styles/popup.css'



const CAT_QUERY = gql`
{
    elect_categorias {
      categoria
    }
}
`
const PROD_QUERY = gql`
query Productos ($categoria: String)
{
    electricos(categoria: $categoria)
    {
  	    id_elec
        nombre
        categoria
        img
    }  
}
`







export default function Electricos() {
    return (
        <div>
            <Head />
            <Body />
            <Popup />
            <Footer />
        </div>
    )
}


function Body() {
    const [category, setCat] = useState('all')

    return (
        <div className="new_arrivals">
            <div className="container">
                <div className="row">
                    <div className="col text-center">
                        <div className="section_title new_arrivals_title">
                            <h2>Productos Eléctricos</h2>
                        </div>
                    </div>
                </div>
                <div className="row align-items-center">
                    <div className="col text-center">
                        <div className="new_arrivals_sorting">
                            <ul className="arrivals_grid_sorting clearfix button-group filters-button-group">
                                <ListCat name={'all'} current={category} change={setCat} />
                                <Query query={CAT_QUERY}>
                                    {
                                        ({ loading, error, data }) => {
                                            if (loading) return <Loading />
                                            if (error) console.log(error)
                                            return data.elect_categorias.map((cat, i) => {
                                                return (
                                                    <ListCat name={cat.categoria} key={i} current={category} change={setCat} />
                                                )
                                            })

                                        }
                                    }
                                </Query>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col" style={{ marginTop: '50px', marginBottom: '50px' }}>
                        <Grid container spacing={1} alignItems="center">

                            <Query query={PROD_QUERY} variables={{ categoria: category }}>
                                {
                                    ({ loading, error, data }) => {
                                        if (loading) return <Loading />
                                        if (error) console.log(error)
                                        return data.electricos.map(elect => (
                                            <Grid item xs={false} key={elect.id_elec}>
                                                <center>
                                                    <Card prod={elect} />
                                                </center>

                                            </Grid>
                                        ))
                                    }
                                }
                            </Query>
                        </Grid>
                    </div>
                </div>
            </div>

        </div>
    )
}


function Card({ prod, addToCot }) {
    return (

        <div className="product-grid">
            <div className="product-item">
                <div className="product discount product_filter">
                    <div className="product_image">
                        <img className="img-prod" src={prod.img} alt="Avatar" />
                    </div>
                    <div className="favorite favorite_left"></div>
                    <div className="product-info">
                        <h6 className="product_name">{prod.nombre}</h6>
                        <div className="product_price">Codigo:<span></span></div>
                    </div>
                </div>
                <div class="red_button add_to_cart_button"><a href="#login_form">Pedir cotizacion</a></div>
            </div>
        </div>

    )

}

function ListCat({ name, current, change }) {
    if (current == name) {
        return (
            <li className="grid_sorting_button button d-flex flex-column justify-content-center align-items-center active is-checked">
                {name}
            </li>
        )
    }

    return (
        <li
            className="grid_sorting_button button d-flex flex-column justify-content-center align-items-center"
            onClick={
                () => {
                    change(name)
                }
            }
        >
            {name}
        </li>
    )
}

function Popup() {
    return (
        <div>
            <a href="#x" class="overlay2" id="login_form"></a>
            <div className="popup">
            <div className="main_grid_contact">
            <h4 className="mb-4 sec-title-w3 let-spa text-bl"> SOLICITUD DE COTIZACION: </h4>
                <p>Los datos ingresados deben ser reales para su posterior contacto.</p>
                <div className="row">
                <div className="col-sm-6 form-group pr-sm-1">
                <input className="form-control" type="text" name="Name" placeholder="Nombre" required/>
                </div>
                <div className="col-sm-6 form-group pl-sm-1">
                <input className="form-control" type="email" name="Email" placeholder="Email"/>
                </div>
                </div>
                <div className="form-group">
                <input className="form-control" type="text" name="Subject" placeholder="Asunto"/>
                </div>
                <div className="form-group">
                <input className="form-control" type="text" name="Phone Number" placeholder="Teléfono"
                     required="" />
                </div>
                <div className="form-group">
                <textarea name="message" placeholder="Descripcion" required=""></textarea>
                </div>

                <div className="input-group1 text-center">
                <button className="btn" type="submit">Enviar</button>
                </div>
                
            </div>
            </div>
        </div>
    )
}

