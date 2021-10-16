import { gql } from "apollo-server-express"
// import { graphql } from "graphql"
// import { createTestClient } from "apollo-server-testing"
import { toPromise } from "apollo-link"
import { constructTestServer, startTestServer } from "./__utils"
import prisma from "../tests/client"

import { deleteAll, seedData } from "../prisma/seedDataFunction"

const ALL_USER_QUERY = gql`
  query all {
    allUsers {
      id
      name
      email
    }
  }
`

describe("Queries", () => {
  let stop, graphql
  beforeAll(async () => {
    const resultSeedData = await seedData()
    console.log("✨ Seed data successfully created")
  })

  afterAll(async () => {
    const resultDeleteAll = await deleteAll()
    await prisma.$disconnect()
  })
  beforeEach(async () => {
    const server = constructTestServer()
    const testServer = await startTestServer(server)
    stop = testServer.stop
    graphql = testServer.graphql
  })
  afterEach(async () => {
    stop()
  })
  it("gets list of users", async () => {
    const res = await toPromise(
      graphql({
        query: ALL_USER_QUERY,
        variables: { pageSize: 1, after: "1517949900" },
      })
    )

    console.log(res)

    expect(1).toBe(2)
  })
  it("should be true", async () => {
    expect(1).toBe(1)
  })
})
