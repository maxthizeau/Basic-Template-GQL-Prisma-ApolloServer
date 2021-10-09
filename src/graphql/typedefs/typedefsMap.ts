import { gql } from "apollo-server-express"
import bookTypeDefs from "./book"

const rootTypeDefs = gql`
  type Query {
    root: String!
  }
  type Mutation {
    root: String!
  }
`

const typeDefs = [rootTypeDefs, bookTypeDefs]
export default typeDefs
