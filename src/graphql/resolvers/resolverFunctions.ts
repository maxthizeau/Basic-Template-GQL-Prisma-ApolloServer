// import { WhereUserInput, QueryAllUsersArgs, QueryAllBoardsArgs } from "@src/generated/graphql"
import { Prisma } from ".prisma/client"

type PrismaWhereInput = Prisma.UserWhereInput | Prisma.BoardWhereInput
type QueryAllArgs = any
// type QueryAllArgs = QueryAllUsersArgs | QueryAllBoardsArgs
type FindManyArgs = Prisma.UserFindManyArgs | Prisma.BoardFindManyArgs
type OrderByWithRelationInput = Prisma.UserOrderByWithRelationInput | Prisma.BoardOrderByWithRelationInput

function generatePrismaWhere(inputWhere): PrismaWhereInput {
  const whereFinal: PrismaWhereInput = {}
  if (!inputWhere) {
    return whereFinal
  }
  // If There is an "OR", then generate an array of UserWhereInput and place it in whereFinal.OR
  // Use recursive function
  if (inputWhere.OR) {
    let orFinal: Prisma.Enumerable<PrismaWhereInput> = []

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
    let andFinal: Prisma.Enumerable<PrismaWhereInput> = []

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

export function getWhereSortByFirstSkipRequest(args: QueryAllArgs): any {
  // console.log("test")
  const { where, first, skip, sortBy } = args

  const finalReturnedQuery: FindManyArgs = {}
  if (first) {
    finalReturnedQuery.take = first
  }
  if (skip) {
    finalReturnedQuery.skip = skip
  }

  let whereFinal: PrismaWhereInput = {}
  if (where) {
    whereFinal = generatePrismaWhere(where)
  }

  let sortByFinal: OrderByWithRelationInput = {}
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
