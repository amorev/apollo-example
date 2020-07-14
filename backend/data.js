const { ApolloServer, gql } = require('apollo-server')
const { PubSub } = require('apollo-server')

const pubsub = new PubSub()

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

setInterval(() => {
  pubsub.publish(NEW_MESSAGE, {
    newMessage: {
      title: 'title',
      text: 'information ' + new Date()
    }
  })
}, 5000)

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
