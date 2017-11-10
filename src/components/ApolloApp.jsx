import { ApolloClient, HttpLink, InMemoryCache } from "apollo-client-preset"
import { ApolloProvider } from "react-apollo"
import App from "./App"
import React from "react"

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://192.168.27.170/graphql" }),
  cache: new InMemoryCache()
})

export default () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
