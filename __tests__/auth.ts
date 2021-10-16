import { gql } from "apollo-server-express"
// import { graphql } from "graphql"
// import { createTestClient } from "apollo-server-testing"
import { toPromise } from "apollo-link"
import { constructTestServer, startTestServer } from "./__utils"
// import prisma from "../tests/client"
import bcrypt from "bcryptjs"
import { deleteAll, seedData } from "../prisma/seedDataFunction"

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const usersCredentials = {
  admin: { email: "john.admin@seed.com", password: "Passwd01" },
}

const ALL_USER_QUERY = gql`
  query all {
    allUsers {
      id
      name
      email
    }
  }
`

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
      }
    }
  }
`

describe("Queries", () => {
  let stop, graphql
  beforeAll(async () => {
    const resultSeedData = await seedData(prisma).catch((e) => {
      console.error(e)
    })

    console.log("✨ Seed data successfully created")
  })

  afterAll(async () => {
    const resultDeleteAll = await deleteAll(prisma)
    await prisma.$disconnect()
  })
  beforeEach(async () => {
    const server = constructTestServer(prisma)
    const testServer = await startTestServer(server)
    stop = testServer.stop
    graphql = testServer.graphql
  })
  afterEach(async () => {
    stop()
  })
  it("should thrown an error when accessing list of users without being logged in", async () => {
    const res: any = await toPromise(
      graphql({
        query: ALL_USER_QUERY,
        variables: { pageSize: 1, after: "1517949900" },
      })
    )

    expect(res.errors[0].message).toBe("You don't have permission to access this resource")
    // expect(res.errors[0]).toEqual(new Error("You don't have permission to access this resource"))
  })
  it("should logged the user", async () => {
    const res: any = await toPromise(
      graphql({
        query: LOGIN_MUTATION,
        variables: { email: usersCredentials.admin.email, password: usersCredentials.admin.password },
      })
    )

    expect(res.data.login.token).not.toBeNull()
    expect(res.data.login.user).not.toBeNull()
  })
})
