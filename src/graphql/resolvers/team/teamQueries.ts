import { IResolvers } from "@graphql-tools/utils/Interfaces"
import { Context } from "@src/graphql/prismaContext"
import { getWhereSortByFirstSkipRequest } from "@src/graphql/resolvers/resolverFunctions"

const teamQueries: IResolvers = {
  Query: {    
    team: async (_parent, args, context: Context) =>
      await context.prisma.team.findUnique({ where: { id: Number(args.where.id) } }),    
    allTeams: async (_parent, args, context: Context) => {
      // Generate all the args (where, first, skip, sortBy)
      const queryArgs = getWhereSortByFirstSkipRequest(args)
      queryArgs.include = {members:true}
      queryArgs.include = {admins:true}
      queryArgs.include = {boards:true}

      const result = await context.prisma.team.findMany(queryArgs)
      return result
    },
  },
}
export default teamQueries
