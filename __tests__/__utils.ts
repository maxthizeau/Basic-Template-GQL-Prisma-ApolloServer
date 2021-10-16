import { schema } from "../src/graphql/schema"
import { createServer } from "http"
import { ApolloServer } from "apollo-server-express"
import express from "express"
import { context as defaultContext } from "../src/graphql/prismaContext"
import { HttpLink } from "apollo-link-http"
import { execute, toPromise } from "apollo-link"
import prisma from "../tests/client"
import { getUserId } from "../src/utils/utils"
import fetch from "cross-fetch"
import { MockContext, Context, createMockContext } from "../tests/mockContext"
// import { prismaMock } from "../tests/singleton"

const PORT = 4600
// const { HttpLink } = require('apollo-link-http');

// module.exports.toPromise = toPromise;

/**
 * Integration testing utils
 */

export const constructTestServer = (prisma) => {
  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      return {
        ...req,
        prisma,
        user: req && req.headers.authorization ? getUserId(req, req.headers.authorization) : null,
      }
    },
  })

  return server
}

/**
 * e2e Testing Utils
 */

export const startTestServer = async (server) => {
  // if using apollo-server-express...
  const app = express()
  const httpServer = createServer(app)
  await server.start()
  server.applyMiddleware({ app })
  httpServer.listen(PORT)

  const link = new HttpLink({
    uri: `http://localhost:${PORT}/graphql`,
    fetch,
  })

  const executeOperation = ({ query, variables = {} }) => execute(link, { query, variables })

  return {
    link,
    stop: () => {
      httpServer.close()
    },
    graphql: executeOperation,
  }
}
