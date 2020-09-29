const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLSchema, GraphQLFloat, GraphQLInt } = require('graphql')
const querysql = require('./database')
const query_third_db = require('./third_db')


const ElectronicoType = new GraphQLObjectType({
    name: 'Electronica',
    fields: () => ({
        id_electronico: { type: GraphQLID },
        nombre: { type: GraphQLString },
        modelo: { type: GraphQLString },
        marca: { type: GraphQLString },
        descripcion: { type: GraphQLString },
        categoria: { type: GraphQLString },
        img: { type: GraphQLString }
    })
})

const ElectricoType = new GraphQLObjectType({
    name: 'Electrico',
    fields: () => ({
        id_elec: { type: GraphQLID },
        nombre: { type: GraphQLString },
        categoria: { type: GraphQLString },
        img: { type: GraphQLString }
    })
})

const CategoriaType = new GraphQLObjectType({
    name: 'Categoria',
    fields: () => ({
        categoria: { type: GraphQLString }
    })
})

const IndustrialesType = new GraphQLObjectType({
    name: 'Industriales',
    fields: () => ({
        id_industrial: { type: GraphQLID },
        nombre: { type: GraphQLString },
        categoria: { type: GraphQLString },
        img: { type: GraphQLString }
    })
})


const ContactosType = new GraphQLObjectType({
    name: 'Contactos',
    fields: () => ({
        id_contacto: { type: GraphQLID },
        id_empresa: { type: GraphQLID },
        nombre_contacto: { type: GraphQLString },
        email_contacto: { type: GraphQLString },
        telefono_contaco: { type: GraphQLString },
        posicion_contacto: { type: GraphQLString }
    })
})

const EstadosCotType = new GraphQLObjectType({
    name: 'Estados_coti',
    fields: () => ({
        id_estado: { type: GraphQLID },
        orden_coti: { type: GraphQLString },
        fecha_estado: { type: GraphQLString },
        estado: { type: GraphQLString }
    })
})
const EmpleadoType = new GraphQLObjectType({
    name: 'Empleado',
    fields: () => ({
        id_empleado: { type: GraphQLID },
        nombre_empleado: { type: GraphQLString },
        email_empleado: { type: GraphQLString },
        telefono_empleado: { type: GraphQLString },
        puesto_empleado: { type: GraphQLString }
    })
})

const DetalleType = new GraphQLObjectType({
    name: 'Detalle',
    fields: () => ({
        id_detalle: { type: GraphQLID },
        orden_coti: { type: GraphQLString },
        cantidad: { type: GraphQLInt },
        descripcion: { type: GraphQLString },
        precio: { type: GraphQLFloat }
    })
})

const CotizacionesType = new GraphQLObjectType({
    name: 'Cotizaciones',
    fields: () => ({
        orden_coti: { type: GraphQLString },
        id_empresa: { type: GraphQLID },
        tipo_coti: { type: GraphQLString },
        precio_total_coti: { type: GraphQLFloat },
        moneda_coti: { type: GraphQLFloat },
        cotizacion_usd: { type: GraphQLFloat },
        condicion_de_pago: { type: GraphQLString },
        validez_orden: { type: GraphQLInt },
        plazo_maximo_entrega: { type: GraphQLInt },
        empleado: { type: EmpleadoType },
        estados: { type: new GraphQLList(EstadosCotType) },
        detalles: { type: new GraphQLList(DetalleType) }
    })
})

const EmpresaType = new GraphQLObjectType({
    name: 'Empresa',
    fields: () => ({
        id_empresa: { type: GraphQLID },
        nombre_emp: { type: GraphQLString },
        cuit_emp: { type: GraphQLString },
        localidad_emp: { type: GraphQLString },
        direccion_emp: { type: GraphQLString },
        webpage_emp: { type: GraphQLString },
        telefono_comercial_emp: { type: GraphQLString },
        rubro_emp: { type: GraphQLString },
        contactos: { type: new GraphQLList(ContactosType) },
        cotizaciones: { type: new GraphQLList(CotizacionesType) }
    })
})



function extraer(array) {
    let estados = []
    let detalles = []
    for (let i = 0; i < array.length; i++) {
        const element = array[i]
        const aux_estado = {
            id_estado: element.id_estado,
            orden_coti: element.orden_coti,
            fecha_estado: element.fecha_estado,
            estado: element.estado
        }
        const aux_detalle = {
            id_detalle: element.id_detalle,
            orden_coti: element.orden_coti,
            cantidad: element.cantidad,
            descripcion: element.descripcion,
            precio: element.precio
        }

        let found_detalle = false
        let found_estado = false

        for (let est of estados) {
            if (est.id_estado === aux_estado.id_estado) {
                found_estado = true
                break
            }
        }

        if (!found_estado)
            estados.push(aux_estado)


        for (let det of detalles) {
            if (det.id_detalle === aux_detalle.id_detalle) {
                found_detalle = true
                break
            }
        }

        if (!found_detalle)
            detalles.push(aux_detalle)
    }

    console.log({ estados, detalles })
    return {
        estados, detalles
    }
}

function separar_cotizaciones(array) {
    let matriz = []
    let cotizacion = [array[0]]
    let ord_compare = array[0].orden_coti
    for (let i = 1; i < array.length - 1; i++) {
        const element = array[i]
        if (element.orden_coti === ord_compare) {
            cotizacion.push(element)
        } else {
            matriz.push(cotizacion)
            cotizacion = []
            ord_compare = element.orden_coti
            cotizacion.push(element)
        }
    }
    matriz.push(cotizacion)
    return matriz
}




const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        elect_categorias: {
            type: new GraphQLList(CategoriaType),
            resolve: async (parent, args) => {
                const sql = 'SELECT DISTINCT categoria FROM electricos'
                return await querysql(sql)
            }
        },
        e_categorias: {
            type: new GraphQLList(CategoriaType),
            resolve: async (parent, args) => {
                const sql = 'SELECT DISTINCT categoria FROM electronicos'
                return await querysql(sql)
            }
        },
        i_categorias: {
            type: new GraphQLList(CategoriaType),
            resolve: async (parent, args) => {
                const sql = 'SELECT DISTINCT categoria FROM industriales'
                return await querysql(sql)
            }
        },
        electronico: {
            type: new GraphQLList(ElectronicoType),
            args: {
                categoria: { type: GraphQLString }
            },
            resolve: async (parent, args) => {
                if (args.categoria != 'all') {
                    const sql = `SELECT * FROM electronicos WHERE categoria = '${args.categoria}'`
                    return await querysql(sql)
                }
                const sql = 'SELECT * FROM electronicos ORDER BY categoria'
                return await querysql(sql)

            }
        },
        electricos: {
            type: new GraphQLList(ElectricoType),
            args: {
                categoria: { type: GraphQLString }
            },
            resolve: async (parent, args) => {
                if (args.categoria != 'all') {
                    const sql = `SELECT * FROM electricos WHERE categoria = '${args.categoria}'`
                    return await querysql(sql)
                }
                const sql = 'SELECT * FROM electricos ORDER BY categoria'
                return await querysql(sql)

            }
        },
        industriales: {
            type: new GraphQLList(IndustrialesType),
            args: {
                categoria: { type: GraphQLString }
            },
            resolve: async (parent, args) => {
                if (args.categoria != 'all') {
                    const sql = `SELECT * FROM industriales WHERE categoria = '${args.categoria}'`
                    return await querysql(sql)
                }
                const sql = 'SELECT * FROM industriales ORDER BY categoria'
                return await querysql(sql)

            }
        },
        cotizaciones: {
            type: new GraphQLList(CotizacionesType),
            resolve: async (parent, args) => {
                const sql = `SELECT * FROM Cotizaciones c, Estados_coti ec, Detalle_coti dc, Empleados emp WHERE c.orden_coti = ec.orden_coti AND ec.orden_coti = dc.orden_coti AND emp.id_empleado = c.id_empleado;`
                let cotizaciones = await query_third_db(sql)
                cotizaciones = separar_cotizaciones(cotizaciones)
                let rtn = []
                for (let cot of cotizaciones) {
                    const { estados, detalles } = extraer(cot)
                    const empleado = {
                        id_empleado: cot[0].id_empleado,
                        nombre_empleado: cot[0].nombre_empleado,
                        email_empleado: cot[0].email_empleado,
                        telefono_empleado: cot[0].telefono_empleado,
                        puesto_empleado: cot[0].puesto_empleado
                    }
                    const aux_cot = {
                        orden_coti: cot[0].orden_coti,
                        id_empresa: cot[0].id_empresa,
                        tipo_coti: cot[0].tipo_coti,
                        precio_total_coti: cot[0].precio_total_coti,
                        moneda_coti: cot[0].moneda_coti,
                        cotizacion_usd: cot[0].cotizacion_usd,
                        condicion_de_pago: cot[0].condicion_de_pago,
                        validez_orden: cot[0].validez_orden,
                        plazo_maximo_entrega: cot[0].plazo_maximo_entrega,
                        empleado,
                        estados,
                        detalles
                    }
                    cot = aux_cot
                    rtn.push(aux_cot)
                }
                console.log(rtn)
                return rtn

            }
        }



    }
})



module.exports = new GraphQLSchema({
    query: RootQuery
})