import { gql } from "apollo-server-express"
import bookTypeDefs from "./book"
import user from "./user"

const rootTypeDefs = gql`
  type SuccessMessage {
    success: Boolean!
    message: String
  }
  type Query {
    root: String!
  }
  type Mutation {
    root: String!
  }
`

const typeDefs = [rootTypeDefs, bookTypeDefs, user]
export default typeDefs
