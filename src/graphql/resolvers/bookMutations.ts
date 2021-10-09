import { IResolvers } from "@graphql-tools/utils/Interfaces"
import { Context } from "../prismaContext"

const bookMutations: IResolvers = {
  Mutation: {
    createBook: async (_root, args, context: Context) => {
      return await context.prisma.book.create({ data: { ...args } })
    },
    updateBook: async (_root, args, context: Context) => {
      return await context.prisma.book.update({ where: { id: Number(args.id) }, data: { ...args.data } })
    },
    deleteBook: async (_root, args, context: Context) => {
      return await context.prisma.book.delete({ where: { id: Number(args.id) } })
    },
  },
}
export default bookMutations
