import { gql } from "apollo-server-express"

const user = gql`
  type User {
    id: Int!
    publicId: String
    name: String
    email: String
    password: String
    registeredAt: DateTime
    updatedAt: DateTime
    # teamsMember(where: WhereTeamInput, sortBy: [SortTeamBy], first: Int, skip: Int): [Team]
    # teamsAdmin(where: WhereTeamInput, sortBy: [SortTeamBy], first: Int, skip: Int): [Team]
    # boards(where: WhereBoardInput, sortBy: [SortBoardBy], first: Int, skip: Int): [Board]
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
    # boards: RelateToManyBoardInput
  }

  # extend type Query {
  #   user(where: WhereUniqueUserInput!): User
  #   allUsers(where: WhereUserInput, sortBy: [SortUserBy!], first: Int, skip: Int): [User]
  # }

  extend type Mutation {
    # createUser(data: CreateUserInput!): User!
    # updateUser(id: Int!, data: UpdateUserInput!): User!
    deleteUser(id: Int!): User
  }
`

export { user, userTypesDefs }
