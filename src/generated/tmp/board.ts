import { RelateToManyTaskGroupInput, RelateToOneTeamInput, RelateToOneUserInput } from "./../../generated/graphql"
import { gql } from "apollo-server-express"

const board = gql`
  type Board {
    id: Int!
    name: String
    description: String
    taskGroups(where: WhereTaskGroupInput, sortBy: [SortTaskGroupBy], first: Int, skip: Int): [TaskGroup]
    team: Team
    owner: User
  }
`

const boardTypesDefs = gql`
  input CreateBoardInput {
    name: String!
    description: String
    taskGroups: RelateToManyTaskGroupInput
    team: RelateToOneTeamInput
    owner: RelateToOneUserInput
  }
  input UpdateBoardInput {
    name: String
    description: String
    taskGroups: RelateToManyTaskGroupInput
    team: RelateToOneTeamInput
    owner: RelateToOneUserInput
  }

  extend type Mutation {
    createBoard(data: CreateBoardInput!): Board!
    updateBoard(id: Int!, data: UpdateBoardInput!): Board!
    deleteBoard(id: Int!): Board
  }
`

export { board, boardTypesDefs }
