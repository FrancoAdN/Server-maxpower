const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLSchema } = require('graphql')
const querysql = require('./database')
const axios = require('axios')


const SeguridadType = new GraphQLObjectType({
    name: 'Seguridad',
    fields: () => ({
        id_seg: { type: GraphQLID },
        nombre: { type: GraphQLString },
        modelo: { type: GraphQLString },
        marca: { type: GraphQLString },
        descripcion: { type: GraphQLString },
        categoria: { type: GraphQLString },
        img: { type: GraphQLString }
    })
})

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

const CategoriaType = new GraphQLObjectType({
    name: 'Categoria',
    fields: () => ({
        categoria: { type: GraphQLString }
    })
})

const MarcaType = new GraphQLObjectType({
    name: 'Marcas',
    fields: () => ({
        marca: { type: GraphQLString }
    })
})




const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        p_seguridad: {
            type: new GraphQLList(SeguridadType),
            resolve: async (parent, args) => {
                const sql = 'SELECT * FROM seguridad'
                return await querysql(sql)
            }
        },
        p_electronicos: {
            type: new GraphQLList(ElectronicoType),
            resolve: async (parent, args) => {
                const sql = 'SELECT * FROM electronicos'
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
        s_categorias: {
            type: new GraphQLList(CategoriaType),
            resolve: async (parent, args) => {
                const sql = 'SELECT DISTINCT categoria FROM seguridad'
                return await querysql(sql)
            }
        },
        e_marcas: {
            type: new GraphQLList(MarcaType),
            resolve: async (parent, args) => {
                const sql = 'SELECT DISTINCT marca FROM electronicos'
                return await querysql(sql)
            }
        },
        s_marcas: {
            type: new GraphQLList(MarcaType),
            resolve: async (parent, args) => {
                const sql = 'SELECT DISTINCT marca FROM seguridad'
                return await querysql(sql)
            }
        },
        seguridad: {
            type: SeguridadType,
            args: {
                id_seg: { type: GraphQLID }
            },
            resolve: async (parent, args) => {
                const sql = `SELECT * FROM seguridad WHERE id_seg = '${args.id_seg}'`
                const result = await querysql(sql)
                return result[0]

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
                const sql = 'SELECT * FROM electronicos'
                return await querysql(sql)

            }
        }


    }
})



module.exports = new GraphQLSchema({
    query: RootQuery
})