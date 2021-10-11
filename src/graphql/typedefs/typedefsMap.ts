import { gql } from "apollo-server-express"
// import { bookTypeDefs, book } from "./book"
import { user, userTypesDefs } from "./user"
import { userInputs } from "../../generated/userInputs"

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

const typeDefs = [rootTypeDefs, user, userTypesDefs, userInputs]
export default typeDefs
