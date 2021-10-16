import { IResolvers } from "@graphql-tools/utils/Interfaces"
import { Context } from "src/graphql/prismaContext"
import { getRandomIntString } from "@src/utils/numberFunctions"
import { rules } from "../../accessRules"

const taskMutations: IResolvers = {
  Mutation: {
    createTask: async (_root, args, context: Context) => {
      // Access : A user should be logged in to create task
      const access: any = rules.isLoggedIn(context)
      if (!access) {
        throw new Error("You don't have permission to access this resource")
      }
      const { data } = args
      return await context.prisma.task.create({ data })
    },
    updateTask: async (_root, args, context: Context) => {
      // Access : A user should be able to manage a Task when :
      // - He is member of the team > board > taskgroup > task
      // - He is owner of the board
      const access: any = await rules.canManageTasks(context, args.id)
      if (!access) {
        throw new Error("You don't have permission to access this resource")
      }

      return await context.prisma.task.update({ where: { id: Number(args.id) }, data: { ...args.data } })
    },
    deleteTask: async (_root, args, context: Context) => {
      // Access : A user should be able to manage a Task when :
      // - He is member of the team > board > taskgroup > task
      // - He is owner of the board
      const access: any = await rules.canManageTasks(context, args.id)
      if (!access) {
        throw new Error("You don't have permission to access this resource")
      }

      return await context.prisma.task.delete({ where: { id: Number(args.id) } })
    },
  },
}
export default taskMutations
