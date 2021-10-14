import { IResolvers } from "@graphql-tools/utils/Interfaces"
import { Context } from "../prismaContext"
import { generatePublicId } from "./user/userMutations"
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { APP_SECRET, getUserId } = require("@src/utils/utils")

async function signup(parent, args, context, info) {
  const publicId = generatePublicId(args.name)
  // 1
  const password = await bcrypt.hash(args.password, 10)
  const data = { ...args, publicId: publicId, password }

  // 2
  const user = await context.prisma.user.create({ data })

  // 3
  const token = jwt.sign({ user: user }, APP_SECRET)

  // 4
  return {
    token,
    user,
  }
}

async function login(parent, args, context, info) {
  // 1
  const user = await context.prisma.user.findUnique({ where: { email: args.email } })
  if (!user) {
    throw new Error("No such user found")
  }

  // 2
  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error("Invalid password")
  }
  // console.log("USER LOGIN : ", user)

  const token = jwt.sign({ user: user }, APP_SECRET)

  // 3
  return {
    token,
    user,
  }
}

const appMutations: IResolvers = {
  Mutation: {
    login: async (_root, args, context: Context, info) => {
      return login(_root, args, context, info)
    },
    signup: async (_root, args, context: Context, info) => {
      return signup(_root, args, context, info)
    },
  },
}

export default appMutations
