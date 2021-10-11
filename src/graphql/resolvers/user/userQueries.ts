import { IResolvers } from "@graphql-tools/utils/Interfaces"
import { Context } from "@src/graphql/prismaContext"
import { WhereUserInput, QueryAllUsersArgs } from "@src/generated/graphql"
import { prisma, Prisma } from ".prisma/client"
import { context } from "../../prismaContext"

function getWhereSortByFirstSkipRequest(args: QueryAllUsersArgs): any {
  const { where, first, skip, sortBy } = args

  const aggregateQuery: Prisma.UserFindManyArgs = {}
  if (first) {
    aggregateQuery.take = first
  }
  if (skip) {
    aggregateQuery.skip = skip
  }
  const whereFinal: Prisma.UserWhereInput = {}
  if (where) {
    console.log("Where : ", where)
    Object.keys(where).map(function (whereName) {
      const whereValue = where[whereName]
      const [whereFieldName, whereTypeSearch] = whereName.split("_")
      if (whereTypeSearch === "not") {
        whereFinal.NOT = { ...whereFinal.NOT, [whereFieldName]: whereValue }
      }
      if (whereTypeSearch === "is") {
        whereFinal[whereFieldName] = whereValue
      }
      if (["gt", "gte", "lt", "lte"].indexOf(whereTypeSearch) > -1) {
        // If the type search is one "gt","gte","lt", "lte"
        whereFinal[whereFieldName] = { ...whereFinal[whereName], [whereTypeSearch]: whereValue }
      }
      // console.log(`We search ${whereFieldName} with type ${whereTypeSearch} for value ${whereValue}`)
    })
  }

  let sortByFinal: Prisma.UserOrderByWithRelationInput = {}
  if (sortBy) {
    const [sortByName] = sortBy
    const [sortByFieldName, sortByTypeOrder] = sortByName.split("_")
    console.log(sortByName, sortByFieldName, sortByTypeOrder)
    sortByFinal[sortByFieldName] = sortByTypeOrder.toLowerCase()
  }

  aggregateQuery.where = whereFinal
  aggregateQuery.orderBy = sortByFinal

  return aggregateQuery
}

const userQueries: IResolvers = {
  Query: {
    // user(where: WhereUniqueUserInput!): User
    user: async (_parent, args, context: Context) =>
      await context.prisma.user.findUnique({ where: { id: Number(args.where.id) } }),
    // allUsers(where: WhereUserInput, sortBy: [SortUserBy!], first: Int, skip: Int): [User]
    allUsers: async (_parent, args, context: Context) => {
      const aggregateArgs = getWhereSortByFirstSkipRequest(args)
      const result = await context.prisma.user.findMany(aggregateArgs)
      return result
    },
  },
}
export default userQueries
