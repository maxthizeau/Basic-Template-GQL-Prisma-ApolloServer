import { ApolloServer } from "apollo-server-express"
import express from "express"
import { createServer } from "http"
import { schema } from "./graphql/schema"
import { context } from "@src/graphql/prismaContext"
import { performAstCodegen } from "./codegen"
import { generateAllInputs } from "./graphql/generateInputs"

async function startApolloServer() {
  // generateAllInputs()
  performAstCodegen()
  const app = express()
  const httpServer = createServer(app)

  const server = new ApolloServer({
    schema,
    context,
  })
  await server.start()
  server.applyMiddleware({ app })
  const PORT = 4000
  httpServer.listen(PORT, () => console.log(`🚀 Server is now running on http://localhost:${PORT}/graphql`))
}

startApolloServer()
