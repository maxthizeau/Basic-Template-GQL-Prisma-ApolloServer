import { IResolvers } from "@graphql-tools/utils/Interfaces"
import { Context } from "@src/graphql/prismaContext"
import { getWhereSortByFirstSkipRequest } from "@src/graphql/resolvers/resolverFunctions"

const taskQueries: IResolvers = {
  Query: {    
    task: async (_parent, args, context: Context) =>
      await context.prisma.task.findUnique({ where: { id: Number(args.where.id) } }),    
    allTasks: async (_parent, args, context: Context) => {
      // Generate all the args (where, first, skip, sortBy)
      const queryArgs = getWhereSortByFirstSkipRequest(args)
      queryArgs.include = {taskGroup:true}

      const result = await context.prisma.task.findMany(queryArgs)
      return result
    },
  },
}
export default taskQueries
