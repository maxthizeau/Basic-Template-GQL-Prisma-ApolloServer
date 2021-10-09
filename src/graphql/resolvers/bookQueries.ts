import { IResolvers } from "@graphql-tools/utils/Interfaces"
import { Context } from "@src/graphql/prismaContext"

const bookQueries: IResolvers = {
  Query: {
    book: async (_parent, args, context: Context) =>
      await context.prisma.book.findUnique({ where: { id: Number(args.id) } }),
    allBooks: async (_parent, _args, context: Context) => await context.prisma.book.findMany(),
  },
}
export default bookQueries
