const { ApolloServer, gql, PubSub } = require('apollo-server')

const pubsub = new PubSub()

const typeDefs = gql`
    type User {
        id: ID!
        name: String,
        friends: [User]
    }
    type Subscription {
        newUser: User
    }
    type Query {
        hello: String,
        helloTwo: String,
        user: User
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
    user: () => {
      return {
        id: 1,
        name: 'anton',
        friends: [1],
      };
    }
  },
  User: (id) => {
    console.log(id)
    return {
      id: 1,
      name: 'anton',
      friends: [1],
    }
  },
  Subscription: {
    newUser: {
      subscribe () {
        return pubsub.asyncIterator(['newUser'])
      }
    }
  }
}

setInterval(() => {
  pubsub.publish('newUser', {
    newUser: {
      id: 1,
      name: 'Anton' + new Date()
    }
  })
}, 2000)

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
