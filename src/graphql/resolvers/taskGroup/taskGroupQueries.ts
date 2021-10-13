import { IResolvers } from "@graphql-tools/utils/Interfaces"
import { Context } from "@src/graphql/prismaContext"
import { getWhereSortByFirstSkipRequest } from "@src/graphql/resolvers/resolverFunctions"

const taskGroupQueries: IResolvers = {
  Query: {
    taskGroup: async (_parent, args, context: Context) =>
      await context.prisma.taskGroup.findUnique({ where: { id: Number(args.where.id) } }),
    allTaskGroups: async (_parent, args, context: Context) => {
      // Generate all the args (where, first, skip, sortBy)
      const queryArgs = getWhereSortByFirstSkipRequest(args)
      const result = await context.prisma.taskGroup.findMany(queryArgs)
      return result
    },
  },
  TaskGroup: {
    board: async (_parent, args, context: Context) => {
      // Find board where taskGroupId
      const result = await context.prisma.board.findUnique({ where: { id: _parent.boardId } })
      return result
    },
    tasks: async (_parent, args, context: Context) => {
      const argsRequest = getWhereSortByFirstSkipRequest(args)
      argsRequest.where = { ...argsRequest.where, taskGroupId: _parent.id }
      const result = await context.prisma.task.findMany(argsRequest)
      return result
    },
  },
}
export default taskGroupQueries
