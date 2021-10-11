// resolverMap.ts
import { IResolvers } from "@graphql-tools/utils/Interfaces"
import bookMutations from "./bookMutations"
import bookQueries from "./bookQueries"
import userMutations from "@src/graphql/resolvers/user/userMutations"
import userQueries from "@src/graphql/resolvers/user/userQueries"
const resolverMap: IResolvers = {
  ...bookQueries,
  ...userQueries,
  ...bookMutations,
  ...userMutations,
}
export default resolverMap
