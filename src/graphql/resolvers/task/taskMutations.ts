import { IResolvers } from "@graphql-tools/utils/Interfaces"
import { Context } from "@src/graphql/prismaContext"
import { getRandomIntString } from "@src/utils/numberFunctions"

const taskMutations: IResolvers = {
  Mutation: {
    createTask: async (_root, args, context: Context) => {
      const { data } = args
      return await context.prisma.task.create({ data })
    },
    updateTask: async (_root, args, context: Context) => {
      return await context.prisma.task.update({ where: { id: Number(args.id) }, data: { ...args.data } })
    },
    deleteTask: async (_root, args, context: Context) => {
      return await context.prisma.task.delete({ where: { id: Number(args.id) } })
    },
  },
}
export default taskMutations
