import { IResolvers } from "@graphql-tools/utils/Interfaces"
import { books } from "@src/data/books"

const bookQueries: IResolvers = {
  Query: {
    book: (_parent: void, args: any) => books.find((x) => x.id === Number(args.id)),
    allBooks: () => books,
  },
}
export default bookQueries
