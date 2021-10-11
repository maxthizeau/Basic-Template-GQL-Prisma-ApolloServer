import { IResolvers } from "@graphql-tools/utils/Interfaces"
import { Context } from "@src/graphql/prismaContext"
import { WhereUserInput, QueryAllUsersArgs } from "@src/generated/graphql"
import { prisma, Prisma } from ".prisma/client"
import { context } from "../../prismaContext"
import { Maybe } from "../../../generated/graphql"

function generatePrismaWhere(inputWhere): Prisma.UserWhereInput {
  const whereFinal: Prisma.UserWhereInput = {}
  if (!inputWhere) {
    return whereFinal
  }
  // If There is an "OR", then generate an array of UserWhereInput and place it in whereFinal.OR
  // Use recursive function
  if (inputWhere.OR) {
    let orFinal: Prisma.Enumerable<Prisma.UserWhereInput> = []

    for (let i = 0; i < inputWhere.OR.length; i++) {
      const element = inputWhere.OR[i]
      orFinal.push(generatePrismaWhere(inputWhere.OR[i]))
    }
    console.log(orFinal)
    whereFinal.OR = orFinal
  }
  // If There is an "AND", then generate an array of UserWhereInput and place it in whereFinal.AND
  // Use recursive function
  if (inputWhere.AND) {
    let andFinal: Prisma.Enumerable<Prisma.UserWhereInput> = []

    for (let i = 0; i < inputWhere.AND.length; i++) {
      const element = inputWhere.AND[i]
      andFinal.push(generatePrismaWhere(inputWhere.AND[i]))
    }
    console.log(andFinal)
    whereFinal.AND = andFinal
  }

  // After the proccessing of OR and AND, we add other filters to the final where{}. (Recursives goes there directly, unless they also have OR/AND)
  Object.keys(inputWhere).map(function (whereName) {
    const whereValue = inputWhere[whereName]
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
  })
  return whereFinal
}

function getWhereSortByFirstSkipRequest(args: QueryAllUsersArgs): any {
  const { where, first, skip, sortBy } = args

  const finalReturnedQuery: Prisma.UserFindManyArgs = {}
  if (first) {
    finalReturnedQuery.take = first
  }
  if (skip) {
    finalReturnedQuery.skip = skip
  }

  let whereFinal: Prisma.UserWhereInput = {}
  if (where) {
    whereFinal = generatePrismaWhere(where)
  }

  let sortByFinal: Prisma.UserOrderByWithRelationInput = {}
  if (sortBy) {
    const [sortByName] = sortBy
    const [sortByFieldName, sortByTypeOrder] = sortByName.split("_")
    sortByFinal[sortByFieldName] = sortByTypeOrder.toLowerCase()
  }

  finalReturnedQuery.where = whereFinal
  finalReturnedQuery.orderBy = sortByFinal
  console.log(finalReturnedQuery)
  return finalReturnedQuery
}

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
