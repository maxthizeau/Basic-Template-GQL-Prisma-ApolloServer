import { gql } from "apollo-server-express"
import { GraphQLScalarType, Kind } from "graphql"
// import { DateTimeTypeDef } from "graphql-scalars/typeDefs"
// import { DateTimeResolver } from "graphql-scalars/resolvers"

const user = gql`
  type User {
    id: Int!
    publicId: String
    name: String
    email: String
    password: String
    registeredAt: DateTime
    updatedAt: DateTime
    # teamsMember: [Team]
    # teamsAdmin: [Team]
    # Board: [Board]
  }
`

const userTypesDefs = gql`
  input CreateUserInput {
    name: String!
    email: String!
    password: String!
  }
  input UpdateUserInput {
    name: String
    password: String
  }

  # extend type Query {
  #   user(where: WhereUniqueUserInput!): User
  #   allUsers(where: WhereUserInput, sortBy: [SortUserBy!], first: Int, skip: Int): [User]
  # }

  extend type Mutation {
    createUser(data: CreateUserInput!): User!
    updateUser(id: Int!, data: UpdateUserInput!): User!
    deleteUser(id: Int!): User
  }
`

export { user, userTypesDefs }
