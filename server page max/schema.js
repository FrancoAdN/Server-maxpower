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
        }


    }
})



module.exports = new GraphQLSchema({
    query: RootQuery
})