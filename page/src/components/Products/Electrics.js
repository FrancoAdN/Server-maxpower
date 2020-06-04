import React, { useState, useRef } from 'react'
import axios from 'axios'
import './Product.css'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import HeaderTop from './HeaderTop'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}))

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

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)

export default function Electrics() {
    const classes = useStyles()
    const [body, setBody] = useState('')
    const [cat, setCat] = useState('all')
    const cotRef = useRef(null)

    const executeScroll = () => scrollToRef(cotRef)


    return (
        <div className="container-fluid">
            <div className="row" style={{ height: '160px' }}>
                <div className="col fixed-top">
                    <HeaderTop btnCot={executeScroll} />
                </div>
            </div>
            <div className="row">
                <div className="col-3">
                    <h5 className="cat-hd mg-l"><b>CATEGORÍAS</b></h5>
                    <hr className="mg-l" />
                    <Query query={CAT_QUERY}>
                        {
                            ({ loading, error, data }) => {
                                if (loading) return <p>Loading..</p>
                                if (error) console.log(error)
                                return data.elect_categorias.map((cat, i) => (
                                    <p key={i} className="mg-l grey-color cat-items" onClick={
                                        e => {
                                            setCat(cat.categoria)
                                        }
                                    }>{cat.categoria}</p>
                                ))
                            }
                        }
                    </Query>
                    <hr className="mg-l" />
                    <Cotizacion body={body} setBody={setBody} cRef={cotRef} />
                </div>

                <div className="col">
                    <center><h5 className="cat-hd"><b>PRODUCTOS ELÉCTRICOS</b></h5></center>
                    <hr />
                    <div className="container" >
                        <div className={classes.root}>
                            <Grid container spacing={4} alignItems="center">

                                <Query query={PROD_QUERY} variables={{ categoria: cat }}>
                                    {
                                        ({ loading, error, data }) => {
                                            if (loading) return <p>Loading..</p>
                                            if (error) console.log(error)
                                            return data.electricos.map(elect => (
                                                <Grid item xs={4} key={elect.id_elec} style={{ background: '#e8e6e6' }}>
                                                    <center>
                                                        <Card prod={elect} addToCot={setBody} />
                                                    </center>

                                                </Grid>
                                            ))
                                        }
                                    }
                                </Query>
                            </Grid>
                        </div>

                    </div >
                </div>
            </div>
        </div>


    )
}


function Card({ prod, addToCot }) {
    return (

        <div className="flip-card">
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <img className="img-prod" src={prod.img} alt="Avatar" />
                </div>
                <div className="flip-card-back d-flex flex-column justify-content-around">
                    <h3>{prod.nombre}</h3>
                    <h5>{prod.categoria}</h5>
                    <center>
                        <button
                            className="btn"
                            style={{ width: ' 150px', background: '#fff', color: '#c2000a' }}
                            onClick={
                                e => {
                                    e.preventDefault()
                                    addToCot(body => [...body, ` ${prod.nombre} - ${prod.categoria}`])
                                }
                            }
                        >
                            Pedir cotización
                        </button>
                    </center>

                </div>
            </div>
        </div>

    )

}


function Cotizacion({ body, setBody, cRef }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [emp, setEmp] = useState('')
    return (
        <form className="cot-form d-flex flex-column" ref={cRef} onSubmit={
            e => {
                e.preventDefault()
                const contact = { name, email, emp, body }
                axios.post('http://localhost:5000/cotizacion', contact)
                setName('')
                setEmail('')
                setEmp('')
                setBody('')
            }
        }>
            <center><h5>¡Haz tu pedido!</h5></center>
            <input type="text" value={name} placeholder="Nombre:" required onChange={e => setName(e.target.value)} />
            <input type="email" value={email} placeholder="Email:" required onChange={e => setEmail(e.target.value)} />
            <input type="text" value={emp} placeholder="Empresa:" required onChange={e => setEmp(e.target.value)} />
            <textarea rows="5" value={body} placeholder="Haga su consulta" required onChange={e => setBody(e.target.value)} />
            <center><button type="submit" className="btn">Pedir cotización</button></center>
        </form>
    )
}