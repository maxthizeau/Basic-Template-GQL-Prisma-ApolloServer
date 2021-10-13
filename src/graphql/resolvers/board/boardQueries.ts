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
      //   taskGroups(where: WhereTaskGroupInput, sortBy: [SortTaskGroupBy], first: Int, skip: Int): [TaskGroup]
      // team: Team
      // owner: User

      const result = await context.prisma.board.findMany(queryArgs)
      return result
    },
  },
  Board: {
    team: async (_parent, args, context: Context) => {
      const result = await context.prisma.team.findUnique({ where: { id: _parent.teamId } })
      return result
    },
    owner: async (_parent, args, context: Context) => {
      const result = await context.prisma.user.findUnique({ where: { id: _parent.ownerId } })
      return result
    },
    taskGroups: async (_parent, args, context: Context) => {
      const argsRequest = getWhereSortByFirstSkipRequest(args)
      argsRequest.where = { ...argsRequest.where, boardId: _parent.id }
      const result = await context.prisma.taskGroup.findMany(argsRequest)
      return result
    },
  },
}
export default boardQueries
