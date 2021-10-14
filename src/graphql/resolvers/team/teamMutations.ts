import { IResolvers } from "@graphql-tools/utils/Interfaces"
import { Context } from "@src/graphql/prismaContext"
import { getRandomIntString } from "@src/utils/numberFunctions"

const teamMutations: IResolvers = {
  Mutation: {
    createTeam: async (_root, args, context: Context) => {
      console.log(context)
      let data = args.data

      return await context.prisma.team.create({ data })
    },
    updateTeam: async (_root, args, context: Context) => {
      return await context.prisma.team.update({ where: { id: Number(args.id) }, data: { ...args.data } })
    },
    deleteTeam: async (_root, args, context: Context) => {
      return await context.prisma.team.delete({ where: { id: Number(args.id) } })
    },
  },
}
export default teamMutations
