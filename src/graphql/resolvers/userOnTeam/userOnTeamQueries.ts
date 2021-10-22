import { IResolvers } from "@graphql-tools/utils/Interfaces"
import { Context } from "src/graphql/prismaContext"
import { getWhereSortByFirstSkipRequest } from "../resolverFunctions"
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
    user: async (parent, args, context: Context) => {
      // console.log("Parent UserOnTeam.user", parent)
      const result = await context.prisma.user.findUnique({ where: { id: parent.userId } })
      return result
    },
    team: async (parent, args, context: Context) => {
      // console.log("Parent UserOnTeam.team", parent)
      console.log(parent.teamId)
      const access: any = await rules.canSeeThisTeam(context, parent.teamId)
      console.log("access : ", access)
      if (!access) {
        return
      }
      const result = await context.prisma.team.findUnique({ where: { id: parent.teamId } })
      return result
    },
  },
}
export default userOnTeamQueries
