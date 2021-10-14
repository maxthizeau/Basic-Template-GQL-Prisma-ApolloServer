import dotenv from "dotenv"
import jwt from "jsonwebtoken"

const APP_SECRET = "THISISTOKEN"

function getTokenPayload(token) {
  const test = jwt.verify(token, APP_SECRET)
  // console.log("test: ", test)

  return jwt.verify(token, APP_SECRET)
}

function getUserId(req, authToken) {
  if (req) {
    const authHeader = req.headers.authorization
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "")
      if (!token) {
        throw new Error("No token found")
      }
      // console.log("tokenpayload : ", getTokenPayload(token))
      const { user }: any = getTokenPayload(token)
      return user
    }
  } else if (authToken) {
    const { user }: any = getTokenPayload(authToken)
    return user
  }

  throw new Error("Not authenticated")
}

export { getUserId, APP_SECRET }
