import { IResolvers } from "@graphql-tools/utils/Interfaces"
import { Context } from "@src/graphql/prismaContext"
import { board } from "@src/graphql/typedefs/board"
import { getRandomIntString } from "@src/utils/numberFunctions"
import { removeSpecialChar } from "../../../utils/stringFunctions"
import { Prisma } from ".prisma/client"
import { rules } from "../../accessRules"

function generatePublicId(name: string): string {
  return `${name}#${getRandomIntString(5)}`
}

const boardMutations: IResolvers = {
  // Access : Only connected
  Mutation: {
    createBoard: async (_root, args, context: Context) => {
      // Only allow to LoggedIn Users
      const access: any = rules.isLoggedIn(context)
      if (access === false) throw new Error("You don't have permission to access this resource")

      const { data } = args

      return await context.prisma.board.create({ data: { ...data, owner: { connect: { id: context.user.id } } } })
    },
    updateBoard: async (_root, args, context: Context) => {
      // Only allow to LoggedIn Users. Users can only update their own boards (where they are owner or admin)
      const access: any = await rules.canManageBoard(context, args.id)
      if (!access) throw new Error("You don't have permission to access this resource")

      return await context.prisma.board.update({
        where: { id: Number(args.id) },
        data: { ...args.data },
      })
    },
    deleteBoard: async (_root, args, context: Context) => {
      // Only allow to LoggedIn Users. Users can only update their own boards (where they are owner or admin)
      const access: any = await rules.canManageBoard(context, args.id)
      if (!access) throw new Error("You don't have permission to access this resource")

      if (access === false) throw new Error("You don't have permission to access this resource")

      return await context.prisma.board.delete({ where: { id: Number(args.id) } })
    },
  },
}
export default boardMutations
