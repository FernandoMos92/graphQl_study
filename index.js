const { ApolloServer, gql } = require('apollo-server');
const usuarios = [{
    id: 1,
    nome: "jsilva@zemail.com",
    idade: 29
},
{
    id: 2,
    nome: "Rafael Junior",
    email: "rafajun@wemail.com",
    idade: 31
},{
    id: 3,
    nome: "Daniela Smith",
    email: "danismi@umail.com",
    idade: 24
}]
const typeDefs = gql`
    #Pontos de entrada da sua API!
    type Usuario {
        id: ID
        nome: String!
        email: String!
        idade: Int
        salario: Float
        vip: Boolean
    }

    type Produto {
        nome: String!
        preco: Float!
        desconto: Float
        precoComDesconto: Float
    }

    # Pontos de entrada da sua API
    type Query {
        ola: String!
        horaAtual: String!
        usuarioLogado: Usuario
        produtoEmDestaque: Produto
        numerosDaMegaSena: [Int!]!
        usuarios: [Usuario]!
    }
    `

// conjunto de funções
const resolvers = {
    Produto: {
        precoComDesconto(produto) {
            if (produto.desconto) {
                return produto.preco * (1 - produto.desconto)
            } else {
                return produto.preco
            }
        }
    },
    Query: {
        ola() {
            return 'Olá mundo!'
        },
        horaAtual() {
            const hour = new Date()
            return `${hour.getHours()}:${hour.getMinutes()}`
        },
        usuarioLogado() {
            return {
                id: 1,
                nome: 'Ana da Web',
                email: 'anadaweb@email.com',
                idade: 23,
                salario: 1234.56,
                vip: true
            }
        },
        produtoEmDestaque() {
            return {
                nome: 'Notebook Gamer',
                preco: 4890.89,
                desconto: 0.15
            }
        },
        numerosDaMegaSena() {
            const orderBy = (a, b) => a - b;
            return Array(6).fill(0).map(n => parseInt(Math.random() * 60 + 1)).sort(orderBy);
        },
        usuarios() {
            return usuarios
        }
    }
}

// configuração básica do GraphQL
const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }) => {
    console.log(`Executando em ${url}`)
})