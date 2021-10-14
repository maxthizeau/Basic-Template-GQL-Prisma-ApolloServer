import { PrismaClient } from "@prisma/client"
import { getUserId } from "@src/utils/utils"

export interface Context {
  req: any
  prisma: PrismaClient
  user: any
}

const prisma = new PrismaClient()

export const context = ({ req }) => {
  return { ...req, prisma, user: req && req.headers.authorization ? getUserId(req, req.headers.authorization) : null }
}

// const newContext
