const { createTestClient } = require('apollo-server-testing')
const { ApolloServer, gql } = require('apollo-server')
const test = require('ava')

var context = { user: { id: 1, email: 'admin@labtrail.app', role: 'ADMIN', tenant: 1 } }


const typeDefs = gql`
    type Query {
        hello: String,
        helloTwo: String,
    }
    type Message {
        text: String,
        title: String
    }
    type Subscription {
        newMessage: Message
    }
`

const NEW_MESSAGE = 'NEW_MESSAGE'

const resolvers = {
  Query: {
    hello: () => 'world' + new Date(),
    helloTwo: () => 'two' + new Date(),
  },
  Subscription: {
    newMessage: {
      subscribe: () => pubsub.asyncIterator([NEW_MESSAGE]),
    },
  },
}


const server = new ApolloServer({
  typeDefs,
  resolvers
})

const { query, mutate } = createTestClient(server)

var result = {}

test.serial('Test hello world', async t => {
  const QUERY = gql`
      query {
          hello
      }
  `
  result = await query({
    query: QUERY
  })
  const type = typeof result.data.hello
  t.is(type, 'string')
})
