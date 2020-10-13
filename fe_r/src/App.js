import React from 'react'
import logo from './logo.svg'
import './App.css'
import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
  useQuery,
  split,
  useSubscription,
  HttpLink,
} from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true
  }
})
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/'
})
const finalLink = new split(
  ({ query }) => {
    const def = getMainDefinition(query)
    return def.operation === 'subscription'
  },
  wsLink,
  httpLink
)
const client = new ApolloClient({
  link: finalLink,
  cache: new InMemoryCache()
})

const QUERY = gql`
    {
        hello
    }`

const SUBSCRIBE = gql`
    subscription {
        newUser {
            id
            name
        }
    }

`

function App () {
  const { data, error, loading } = useSubscription(SUBSCRIBE, {
    client
  })
  if (!data || loading) {
    return 'loading'
  }

  return (
    <div className="App">
      <header className="App-header">
        <ApolloProvider client={client}>
          <div>
            {data.newUser.name}
          </div>
        </ApolloProvider>

        <img src={logo} className="App-logo" alt="logo"/>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>)
}

export default App
