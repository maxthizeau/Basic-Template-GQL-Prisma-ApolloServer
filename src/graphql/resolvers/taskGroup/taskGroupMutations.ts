import { IResolvers } from "@graphql-tools/utils/Interfaces"
import { Context } from "@src/graphql/prismaContext"
import { getRandomIntString } from "@src/utils/numberFunctions"

const taskGroupMutations: IResolvers = {
  Mutation: {
    createTaskGroup: async (_root, args, context: Context) => {
      const { data } = args
      return await context.prisma.taskGroup.create({ data })
    },
    updateTaskGroup: async (_root, args, context: Context) => {
      return await context.prisma.taskGroup.update({ where: { id: Number(args.id) }, data: { ...args.data } })
    },
    deleteTaskGroup: async (_root, args, context: Context) => {
      return await context.prisma.taskGroup.delete({ where: { id: Number(args.id) } })
    },
  },
}
export default taskGroupMutations
