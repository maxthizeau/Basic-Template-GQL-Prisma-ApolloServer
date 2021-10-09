import { gql } from "apollo-server-express"
const bookTypeDefs = gql`
  input BookUpdateInput {
    title: String
    author: String
  }

  type Book {
    id: ID!
    title: String
    author: String
  }

  extend type Query {
    book(id: ID!): Book!
    allBooks: [Book!]!
  }

  extend type Mutation {
    createBook(title: String!, author: String!): Book
    updateBook(id: ID!, data: BookUpdateInput!): Book
    deleteBook(id: ID!): Book
  }
`

export default bookTypeDefs
