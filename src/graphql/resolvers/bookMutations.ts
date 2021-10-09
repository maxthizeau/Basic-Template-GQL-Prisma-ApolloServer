import { IResolvers } from "@graphql-tools/utils/Interfaces"
import { books } from "@src/data/books"

const bookMutations: IResolvers = {
  Mutation: {
    createBook: (_root, args) => {
      const index = books.length + 1
      books.push({ id: index, title: args.title, author: args.author })
      return books[index - 1]
    },
    updateBook: (_root, args) => {
      const index = books.findIndex((x) => x.id === Number(args.id))
      books[index] = { ...books[index], ...args.data }
      return books[index]
    },
    deleteBook: (_root, args) => {
      const index = books.findIndex((x) => x.id === Number(args.id))
      const returnedBook = books[index]
      books.splice(index, 1)
      return returnedBook
    },
  },
}
export default bookMutations
