import { ApolloServer, gql } from "apollo-server-express"
import express from "express"
import { createServer } from "http"
import { execute, subscribe } from "graphql"
import { makeExecutableSchema } from "@graphql-tools/schema"
import { books } from "@src/data/books"
import resolvers from "@src/graphql/resolvers/resolverMap"
import typeDefs from "@src/graphql/typedefs/typedefsMap"

async function startApolloServer(typeDefs, resolvers) {
  const app = express()
  const httpServer = createServer(app)
  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const server = new ApolloServer({
    schema,
  })
  await server.start()
  server.applyMiddleware({ app })
  const PORT = 4000
  httpServer.listen(PORT, () => console.log(`🚀 Server is now running on http://localhost:${PORT}/graphql`))
}

startApolloServer(typeDefs, resolvers)
