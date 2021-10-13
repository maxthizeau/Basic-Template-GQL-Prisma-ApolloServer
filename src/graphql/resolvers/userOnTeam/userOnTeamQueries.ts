import { IResolvers } from "@graphql-tools/utils/Interfaces"
import { Context } from "@src/graphql/prismaContext"
import { getWhereSortByFirstSkipRequest } from "@src/graphql/resolvers/resolverFunctions"

const userOnTeamQueries: IResolvers = {
  Query: {
    userOnTeam: async (_parent, args, context: Context) =>
      await context.prisma.usersOnTeam.findUnique({ where: { id: Number(args.where.id) } }),
    allUserOnTeams: async (_parent, args, context: Context) => {
      // Generate all the args (where, first, skip, sortBy)
      const queryArgs = getWhereSortByFirstSkipRequest(args)
      const result = await context.prisma.usersOnTeam.findMany(queryArgs)
      return result
    },
  },
  UserOnTeam: {
    user: async (_parent, args, context: Context) => {
      const result = await context.prisma.user.findUnique({ where: { id: _parent.userId } })
      return result
    },
    team: async (_parent, args, context: Context) => {
      const result = await context.prisma.team.findUnique({ where: { id: _parent.teamId } })
      return result
    },
  },
}
export default userOnTeamQueries
