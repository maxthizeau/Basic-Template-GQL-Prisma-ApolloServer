import { ApolloServer } from "apollo-server-express"
import express from "express"
import { createServer } from "http"
import { schema } from "./graphql/schema"
import { context } from "src/graphql/prismaContext"
import { performAstCodegen } from "./codegen"
import { generateAllInputs } from "./graphql/generateInputs"
import dotenv from "dotenv"

require("dotenv").config

export const server = new ApolloServer({
  schema,
  context,
})

export const PORT = 4500

async function startApolloServer() {
  // generateAllInputs()
  performAstCodegen()
  const app = express()
  const httpServer = createServer(app)

  await server.start()
  server.applyMiddleware({ app })

  httpServer.listen(PORT, () => console.log(`🚀 Server is now running on http://localhost:${PORT}/graphql`))
}

startApolloServer()
