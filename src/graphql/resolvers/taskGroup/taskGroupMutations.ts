import { IResolvers } from "@graphql-tools/utils/Interfaces"
import { Context } from "src/graphql/prismaContext"
import { getRandomIntString } from "@src/utils/numberFunctions"
import { rules } from "../../accessRules"

const taskGroupMutations: IResolvers = {
  Mutation: {
    createTaskGroup: async (_root, args, context: Context) => {
      // Access : A user should be logged in to create group
      const access: any = rules.isLoggedIn(context)
      if (!access) {
        throw new Error("You don't have permission to access this resource")
      }

      const { data } = args
      return await context.prisma.taskGroup.create({ data })
    },
    updateTaskGroup: async (_root, args, context: Context) => {
      // Access : A user should be able to update a task group only :
      //   - when he is member of the team that own the board
      //   - when he owns the board
      const access: any = await rules.canManageTaskGroup(context, args.id)
      if (!access) {
        throw new Error("You don't have permission to access this resource")
      }

      return await context.prisma.taskGroup.update({ where: { id: Number(args.id) }, data: { ...args.data } })
    },
    deleteTaskGroup: async (_root, args, context: Context) => {
      // Access : A user should be able to delete a task group only :
      //   - when he is member of the team that own the board
      //   - when he owns the board
      const access: any = await rules.canManageTaskGroup(context, args.id)
      if (!access) {
        throw new Error("You don't have permission to access this resource")
      }
      return await context.prisma.taskGroup.delete({ where: { id: Number(args.id) } })
    },
  },
}
export default taskGroupMutations
