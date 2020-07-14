const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
    type Query {
        hello: String,
        helloTwo: String,
    }
`

const resolvers = {
  Query: {
    hello: () => 'world' + new Date(),
    helloTwo: () => 'two' + new Date(),
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
