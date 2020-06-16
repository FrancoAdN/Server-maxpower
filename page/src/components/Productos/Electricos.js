import React, { useState } from 'react'
import Popup from './Popup'
import Head from './Head'
import Footer from '../Home/Footer'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import Grid from '@material-ui/core/Grid'
import Loading from '../Loading/Loading'



import './plugins/font-awesome-4.7.0/css/font-awesome.min.css'
import './styles/main_styles.css'
import './styles/responsive.css'
import './styles/Product.css'




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
    const [cotizacion, setCotizacion] = useState(false)
    return (
        <div>
            <Head />
            <Body setCotizacion={setCotizacion} />
            <Popup cotizacion={cotizacion} setCotizacion={setCotizacion} />
            <Footer />
        </div>
    )
}


function Body({ setCotizacion }) {
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
                                                    <Card prod={elect} setCotizacion={setCotizacion} />
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


function Card({ prod, setCotizacion }) {
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
                        <div className="product_price">{prod.categoria}<span></span></div>
                    </div>
                </div>
                {/* <div className="red_button add_to_cart_button"><a href="#login_form">Pedir cotizacion</a></div> */}
                <div className="red_button add_to_cart_button" onClick={() => setCotizacion(true)}>Pedir cotizacion</div>
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
            onClick={() => change(name)}
        >
            {name}
        </li>
    )
}


