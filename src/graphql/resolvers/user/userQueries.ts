import { IResolvers } from "@graphql-tools/utils/Interfaces"
import { Context } from "@src/graphql/prismaContext"
import { getWhereSortByFirstSkipRequest } from "../resolverFunctions"

const userQueries: IResolvers = {
  Query: {
    // user(where: WhereUniqueUserInput!): User
    user: async (_parent, args, context: Context) =>
      await context.prisma.user.findUnique({ where: { id: Number(args.where.id) } }),
    // allUsers(where: WhereUserInput, sortBy: [SortUserBy!], first: Int, skip: Int): [User]
    allUsers: async (_parent, args, context: Context) => {
      // Generate all the args (where, first, skip, sortBy)
      const queryArgs = getWhereSortByFirstSkipRequest(args)
      const result = await context.prisma.user.findMany(queryArgs)
      return result
    },
  },
}
export default userQueries
