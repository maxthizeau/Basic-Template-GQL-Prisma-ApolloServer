import { IResolvers } from "@graphql-tools/utils/Interfaces"
import { Context } from "@src/graphql/prismaContext"
import { getWhereSortByFirstSkipRequest } from "@src/graphql/resolvers/resolverFunctions"

const boardQueries: IResolvers = {
  Query: {
    board: async (_parent, args, context: Context) =>
      await context.prisma.board.findUnique({ where: { id: Number(args.where.id) } }),
    allBoards: async (_parent, args, context: Context) => {
      // Generate all the args (where, first, skip, sortBy)
      const queryArgs = getWhereSortByFirstSkipRequest(args)
      queryArgs.include = { taskGroups: true }
      queryArgs.include = { team: true }
      queryArgs.include = { owner: true }

      const result = await context.prisma.board.findMany(queryArgs)
      return result
    },
  },
}
export default boardQueries
