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
        telefono_contacto: { type: GraphQLString },
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
        moneda_coti: { type: GraphQLString },
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

const RespuestTicket = new GraphQLObjectType({
    name: 'RespuestaTicket',
    fields: () => ({
        Id_respuesta: { type: GraphQLID },
        Cuerpo: { type: GraphQLString },
        Fecha: { type: GraphQLString },
        De: { type: GraphQLString },
        Id_ticket: { type: GraphQLID }
    })
})

const TicketType = new GraphQLObjectType({
    name: 'Ticket',
    fields: () => ({
        Id_ticket: { type: GraphQLID },
        Asunto: { type: GraphQLString },
        Fecha: { type: GraphQLString },
        Estado: { type: GraphQLString },
        De: { type: GraphQLString },
        Id_empleado: { type: GraphQLID },
        Id_contacto: { type: GraphQLID },
        Id_empresa: { type: GraphQLID },
        Respuestas: { type: new GraphQLList(RespuestTicket) }

    })
})


function separar_empresas(array) {
    let matriz = []
    let empresas = [array[0]]
    let id_compare = array[0].id_empresa
    for (let i = 1; i < array.length - 1; i++) {
        const element = array[i]
        if (element.id_empresa === id_compare) {
            empresas.push(element)
        } else {
            matriz.push(empresas)
            empresas = []
            id_compare = element.id_empresa
            empresas.push(element)
        }
    }
    matriz.push(empresas)
    return matriz
}

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

function extraer_empresas(array) {
    let cotizaciones = []
    let contactos = []
    for (let i = 0; i < array.length; i++) {
        const element = array[i]
        const aux_cot = {
            orden_coti: element.orden_coti,
            id_empresa: element.id_empresa,
            tipo_coti: element.tipo_coti,
            precio_total_coti: element.precio_total_coti,
            moneda_coti: element.moneda_coti,
            cotizacion_usd: element.cotizacion_usd,
            condicion_de_pago: element.condicion_de_pago,
            validez_orden: element.validez_orden,
            plazo_maximo_entrega: element.plazo_maximo_entrega,
            id_empleado: element.id_empleado,
            id_estado: element.id_estado,
            fecha_estado: element.fecha_estado,
            estado: element.estado,
            id_detalle: element.id_detalle,
            cantidad: element.cantidad,
            descripcion: element.descripcion,
            precio: element.precio,
            nombre_empleado: element.nombre_empleado,
            email_empleado: element.email_empleado,
            telefono_empleado: element.telefono_empleado,
            puesto_empleado: element.puesto_empleado

        }
        cotizaciones.push(aux_cot)
        const aux_contacto = {
            id_contacto: element.id_contacto,
            id_empresa: element.id_empresa,
            nombre_contacto: element.nombre_contacto,
            email_contacto: element.email_contacto,
            telefono_contacto: element.telefono_contacto,
            posicion_contacto: element.posicion_contacto
        }
        let found_contacto = false
        for (let cont of contactos) {
            if (cont.id_contacto === aux_contacto.id_contacto) {
                found_contacto = true
                break
            }
        }

        if (!found_contacto)
            contactos.push(aux_contacto)

    }
    return {
        cotizaciones, contactos
    }
}

function get_cotizaciones(cotizaciones) {
    cotizaciones = separar_cotizaciones(cotizaciones)
    let cotis = []
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
        cotis.push(aux_cot)
    }

    return cotis
}

function get_empresas(empresas) {
    empresas = separar_empresas(empresas)
    let empresas_aux = []
    for (let emp of empresas) {
        const { cotizaciones, contactos } = extraer_empresas(emp)

        const aux_empresa = {
            id_empresa: emp[0].id_empresa,
            nombre_emp: emp[0].nombre_emp,
            cuit_emp: emp[0].cuit_emp,
            localidad_emp: emp[0].localidad_emp,
            direccion_emp: emp[0].direccion_emp,
            webpage_emp: emp[0].webpage_emp,
            telefono_comercial_emp: emp[0].telefono_comercial_emp,
            rubro_emp: emp[0].rubro_emp,
            contactos,
            cotizaciones: get_cotizaciones(cotizaciones)
        }

        empresas_aux.push(aux_empresa)
    }

    return empresas_aux
}

function get_tickets(tickets) {
    const aux_tickets = []
    let tick_with_resp = separar_tickets(tickets[0])

    for (let tick of tick_with_resp)
        aux_tickets.push(extraer_respuestas(tick))

    for (let tick of tickets[1]) {
        tick["Respuestas"] = []
        aux_tickets.push(tick)

    }

    return aux_tickets


}

function separar_tickets(array) {
    let matriz = []
    let ticket = [array[0]]
    let ticket_id = array[0].Id_ticket
    for (let i = 1; i < array.length - 1; i++) {
        const element = array[i]

        if (element.Id_ticket === ticket_id)
            ticket.push(element)
        else {
            matriz.push(ticket)
            ticket = []
            ticket_id = element.Id_ticket
            ticket.push(element)
        }
    }
    matriz.push(ticket)
    return matriz

}

function extraer_respuestas(tick) {
    let ticket = {
        Id_ticket: tick[0].Id_ticket,
        Asunto: tick[0].Asunto,
        Fecha: tick[0].Fecha,
        Estado: tick[0].Estado,
        De: tick[0].De,
        Id_empleado: tick[0].Id_empleado,
        Id_empresa: tick[0].Id_empresa,
        Id_contacto: tick[0].Id_contacto,
        Respuestas: []
    }

    for (const t of tick) {

        const resp = {
            Id_respuesta: t.Id_respuesta,
            Cuerpo: t.Cuerpo_respuesta,
            Fecha: t.Fecha_respuesta,
            De: t.De_respuesta,
            Id_ticket: t.Id_ticket
        }
        ticket.Respuestas.push(resp)
    }

    return ticket
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
                return get_cotizaciones(await query_third_db(sql))

            }
        },
        cotizaciones_por_empresa: {
            type: new GraphQLList(CotizacionesType),
            args: {
                id_empresa: { type: GraphQLID }
            },
            resolve: async (parent, args) => {
                const sql = `SELECT * FROM Cotizaciones c, Estados_coti ec, Detalle_coti dc, Empleados emp WHERE c.id_empresa = ${args.id_empresa} AND c.orden_coti = ec.orden_coti AND ec.orden_coti = dc.orden_coti AND emp.id_empleado = c.id_empleado;`
                return get_cotizaciones(await query_third_db(sql))
            }
        },
        empresas: {
            type: new GraphQLList(EmpresaType),
            resolve: async () => {
                const sql = `SELECT * FROM Empresas e, Contactos_empresa contemp, Cotizaciones c, Estados_coti ec, Detalle_coti dc, Empleados emp WHERE e.id_empresa=contemp.id_empresa AND c.id_empresa=e.id_empresa AND c.orden_coti=ec.orden_coti AND ec.orden_coti=dc.orden_coti AND emp.id_empleado=c.id_empleado;`
                return get_empresas(await query_third_db(sql))
            }
        },
        empresas_por_id: {
            type: new GraphQLList(EmpresaType),
            args: {
                id_empresa: { type: GraphQLID }
            },
            resolve: async (parent, args) => {
                const sql = `SELECT * FROM Empresas e, Contactos_empresa contemp, Cotizaciones c, Estados_coti ec, Detalle_coti dc, Empleados emp WHERE e.id_empresa=contemp.id_empresa AND c.id_empresa=e.id_empresa AND c.orden_coti=ec.orden_coti AND ec.orden_coti=dc.orden_coti AND emp.id_empleado=c.id_empleado AND e.id_empresa=${args.id_empresa};`
                return get_empresas(await query_third_db(sql))
            }
        },
        tickets_por_empresa: {
            type: new GraphQLList(TicketType),
            args: {
                id_empresa: { type: GraphQLID }
            },
            resolve: async (parent, args) => {
                const matx = []
                const sql = `SELECT * FROM Ticket t, Respuesta_ticket rt WHERE t.Id_ticket = rt.Id_ticket AND t.Id_empresa = ${args.id_empresa}`
                const sql2 = `SELECT * FROM Ticket WHERE (Id_empleado is NULL OR Id_contacto is NULL) AND Id_empresa = ${args.id_empresa}`
                matx.push(await query_third_db(sql)) // matx[0] = ticket con respuestas
                matx.push(await query_third_db(sql2)) // matx[1] = ticket sin respuestas
                console.log(matx[0])
                return get_tickets(matx)

            }
        }
        // reactor.com.ar




    }
})



module.exports = new GraphQLSchema({
    query: RootQuery
})