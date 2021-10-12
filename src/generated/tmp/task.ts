import { RelateToOneTaskGroupInput } from "./../../generated/graphql"
import { gql } from "apollo-server-express"

const task = gql`
  type Task {
    id: Int!
    name: String
    description: String
    taskGroup: TaskGroup
  }
`

const taskTypesDefs = gql`
  input CreateTaskInput {
    name: String!
    description: String
    taskGroup: RelateToOneTaskGroupInput
  }
  input UpdateTaskInput {
    name: String
    description: String
    taskGroup: RelateToOneTaskGroupInput
  }

  extend type Mutation {
    createTask(data: CreateTaskInput!): Task!
    updateTask(id: Int!, data: UpdateTaskInput!): Task!
    deleteTask(id: Int!): Task
  }
`

export { task, taskTypesDefs }
