import { Prisma } from ".prisma/client"
export const rules = {
  isLoggedIn(context) {
    if (!context.user) {
      return false
    }
    return true
  },
  canSeeBoards(context) {
    if (!this.isLoggedIn(context)) {
      return false
    }
    const { user } = context
    // Return true to allow all access
    if (user.role === "ADMIN") {
      return true
    }
    // Otherwise, return a PrismaWhere cond
    // Here : Either is the owner of the board or member of a team that can access it
    return {
      OR: [
        { ownerId: user.id },
        {
          team: {
            members: {
              every: {
                userId: user.id,
              },
            },
          },
        },
      ],
    }
  },
  async canManageBoard(context, boardId) {
    if (!this.isLoggedIn(context)) {
      return false
    }
    const { user } = context
    // Return true to allow all access
    if (user.role === "ADMIN") {
      return true
    }
    // Otherwise, return a PrismaWhere cond
    // Here : Either is the owner of the board or member of a team that can access it

    const access: Prisma.BoardWhereInput = {
      OR: [
        { ownerId: user.id },
        {
          team: {
            members: {
              every: {
                userId: user.id,
                isAdmin: true,
              },
            },
          },
        },
      ],
    }

    const queryWhere: Prisma.BoardWhereInput = { AND: [{ id: boardId }, access] }
    const canEditThisOne = await context.prisma.board.findFirst({ where: queryWhere })
    return canEditThisOne
  },
}
