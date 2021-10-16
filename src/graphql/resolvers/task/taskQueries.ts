import { IResolvers } from "@graphql-tools/utils/Interfaces"
import { Context } from "src/graphql/prismaContext"
import { getWhereSortByFirstSkipRequest } from "../resolverFunctions"
import { rules } from "../../accessRules"

const taskQueries: IResolvers = {
  Query: {
    task: async (_parent, args, context: Context) => {
      // Access : A user should be able to see a Task when :
      // - He is member of the team > board > taskgroup > task
      // - He is owner of the board
      const access: any = await rules.canSeeThisTask(context, args.id)
      if (!access) {
        throw new Error("You don't have permission to access this resource")
      }
      return await context.prisma.task.findUnique({ where: { id: Number(args.where.id) } })
    },
    allTasks: async (_parent, args, context: Context) => {
      // Access : A user should be able to see tasks when :
      // - He is member of the team > board > taskgroup > task
      // - He is owner of the board
      const access: any = await rules.canSeeThisTaskGroup(context, args.id)
      if (!access) {
        throw new Error("You don't have permission to access this resource")
      }
      const queryAccess = access !== true ? access : {}

      const queryArgs = getWhereSortByFirstSkipRequest(args)

      queryArgs.where = {
        ...queryArgs.where,
        ...queryAccess,
      }

      const result = await context.prisma.task.findMany(queryArgs)
      return result
    },
  },
  Task: {
    taskGroup: async (_parent, args, context: Context) => {
      const result = await context.prisma.taskGroup.findUnique({ where: { id: _parent.taskGroupId } })
      return result
    },
  },
}
export default taskQueries
