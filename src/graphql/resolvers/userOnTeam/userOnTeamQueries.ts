import { IResolvers } from "@graphql-tools/utils/Interfaces"
import { Context } from "@src/graphql/prismaContext"
import { getWhereSortByFirstSkipRequest } from "@src/graphql/resolvers/resolverFunctions"
import { rules } from "../../accessRules"

const userOnTeamQueries: IResolvers = {
  Query: {
    userOnTeam: async (_parent, args, context: Context) => {
      // Access : Should only access to teams where current user is in
      const access: any = await rules.canSeeThisUserOnTeamRelation(context, args.id)
      if (!access) {
        throw new Error("You don't have permission to access this resource")
      }

      return await context.prisma.usersOnTeam.findUnique({ where: { id: Number(args.where.id) } })
    },
    allUserOnTeams: async (_parent, args, context: Context) => {
      // Access : Should only access to teams where current user is in
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
