import { IResolvers } from "@graphql-tools/utils/Interfaces"
import { Context } from "@src/graphql/prismaContext"
import { board } from "@src/graphql/typedefs/board"
import { getRandomIntString } from "@src/utils/numberFunctions"
import { removeSpecialChar } from "../../../utils/stringFunctions"
import { Prisma } from ".prisma/client"

function generatePublicId(name: string): string {
  return `${name}#${getRandomIntString(5)}`
}

const boardMutations: IResolvers = {
  Mutation: {
    createBoard: async (_root, args, context: Context) => {
      const { data } = args
      return await context.prisma.board.create({ data })
    },
    updateBoard: async (_root, args, context: Context) => {
      return await context.prisma.board.update({ where: { id: Number(args.id) }, data: { ...args.data } })
    },
    deleteBoard: async (_root, args, context: Context) => {
      return await context.prisma.board.delete({ where: { id: Number(args.id) } })
    },
  },
}
export default boardMutations
