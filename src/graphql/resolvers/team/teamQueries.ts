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
      const result = await context.prisma.team.findMany(queryArgs)
      return result
    },
  },
  Team: {
    members: async (_parent, args, context: Context) => {
      const argsRequest = getWhereSortByFirstSkipRequest(args)
      argsRequest.where = { ...argsRequest.where, teamId: _parent.id }
      const result = await context.prisma.usersOnTeam.findMany(argsRequest)
      return result
    },
    boards: async (_parent, args, context: Context) => {
      const argsRequest = getWhereSortByFirstSkipRequest(args)
      argsRequest.where = { ...argsRequest.where, team: { id: _parent.id } }
      const result = await context.prisma.board.findMany(argsRequest)
      return result
    },
  },
}
export default teamQueries
