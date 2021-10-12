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
      queryArgs.include = {tasks:true}
      queryArgs.include = {board:true}

      const result = await context.prisma.taskGroup.findMany(queryArgs)
      return result
    },
  },
}
export default taskGroupQueries
