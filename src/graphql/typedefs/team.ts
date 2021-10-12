import { gql } from "apollo-server-express"

const team = gql`
  type Team {
    id: Int!
    publicId: String
    name: String
    members(where: WhereUserInput, sortBy: [SortUserBy], first: Int, skip: Int): [User]
    admins(where: WhereUserInput, sortBy: [SortUserBy], first: Int, skip: Int): [User]
    boards(where: WhereBoardInput, sortBy: [SortBoardBy], first: Int, skip: Int): [Board]
  }
`

const teamTypesDefs = gql`
  input CreateTeamInput {
    name: String!
    members: RelateToManyUserInput
    admins: RelateToManyUserInput
    boards: RelateToManyBoardInput
  }
  input UpdateTeamInput {
    name: String
    members: RelateToManyUserInput
    admins: RelateToManyUserInput
    boards: RelateToManyBoardInput
  }

  extend type Mutation {
    createTeam(data: CreateTeamInput!): Team!
    updateTeam(id: Int!, data: UpdateTeamInput!): Team!
    deleteTeam(id: Int!): Team
  }
`

export { team, teamTypesDefs }
