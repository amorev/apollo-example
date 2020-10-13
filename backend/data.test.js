const { ApolloServer, gql, PubSub } = require('apollo-server')
const { createTestClient } = require('apollo-server-testing')
const test = require('ava')

const typeDefs = gql`    
    type Query {
        hello: String,
        helloTwo: String,
    }
`

const resolvers = {
  Query: {
    hello: () => {
      return new Promise((r) => {
        setTimeout(() => r('world' + new Date()), 0)
      })
    },
    helloTwo: () => 'two' + new Date(),
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

const testClient = createTestClient(server)

const query = testClient.query

test.serial('test hello world', async t => {
  const q = gql`
      {
          hello
      }
  `
  const result = await query({query: q})
  console.log(result)
  const type = typeof result.data.hello
  t.is(type, 'string')
})
