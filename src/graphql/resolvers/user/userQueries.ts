// import { QueryAllBoardsArgs } from "@src/generated/graphql"
import { IResolvers } from "@graphql-tools/utils/Interfaces"
import { Context } from "@src/graphql/prismaContext"
import { getWhereSortByFirstSkipRequest } from "@src/graphql/resolvers/resolverFunctions"
import { Prisma } from ".prisma/client"

const userQueries: IResolvers = {
  Query: {
    user: async (_parent, args, context: Context) =>
      await context.prisma.user.findUnique({ where: { id: Number(args.where.id) } }),
    allUsers: async (_parent, args, context: Context) => {
      const queryArgs = getWhereSortByFirstSkipRequest(args)
      const result = await context.prisma.user.findMany(queryArgs)
      return result
    },
  },
  User: {
    boards: async (_parent, args, context: Context) => {
      console.log("boards requested")
      const argsRequest = getWhereSortByFirstSkipRequest(args)
      argsRequest.where = { ...argsRequest.where, ownerId: _parent.id }
      const result = await context.prisma.board.findMany(argsRequest)
      return result
    },
  },
}
export default userQueries
