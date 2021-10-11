import { gql } from "apollo-server-express"
import { GraphQLScalarType, Kind } from "graphql"
// import { DateTimeTypeDef } from "graphql-scalars/typeDefs"
// import { DateTimeResolver } from "graphql-scalars/resolvers"

const user = gql`
  input WhereUserInput {
    AND: [WhereUserInput]
    OR: [WhereUserInput]
    id_is: Int
    id_not: Int
    id_lt: Int
    id_lte: Int
    id_gt: Int
    id_gte: Int
    name_is: String
    name_not: String
    email_is: String
    email_not: String
    publicId_is: String
    publicId_not: String
    registeredAt_lt: DateTime
    registeredAt_lte: DateTime
    registeredAt_gt: DateTime
    registeredAt_gte: DateTime
  }

  input WhereUniqueUserInput {
    id: Int!
  }

  input CreateUserInput {
    name: String!
    email: String!
    password: String!
  }
  input UpdateUserInput {
    name: String
    password: String
  }

  enum SortUserBy {
    id_ASC
    id_DESC
    publicId_ASC
    publicId_DESC
    name_ASC
    name_DESC
    email_ASC
    email_DESC
    registeredAt_ASC
    registeredAt_DESC
    teamsMember_ASC
    teamsMember_DESC
    teamsAdmin_ASC
    teamsAdmin_DESC
    board_ASC
    board_DESC
  }

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

  extend type Query {
    user(where: WhereUniqueUserInput!): User
    allUsers(where: WhereUserInput, sortBy: [SortUserBy!], first: Int, skip: Int): [User]
  }

  extend type Mutation {
    createUser(data: CreateUserInput!): User!
    updateUser(id: Int!, data: UpdateUserInput!): User!
    deleteUser(id: Int!): User
  }
`

export default user
