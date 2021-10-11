// resolverMap.ts
import { IResolvers } from "@graphql-tools/utils/Interfaces"
import userMutations from "@src/graphql/resolvers/user/userMutations"
import userQueries from "@src/graphql/resolvers/user/userQueries"
const resolverMap: IResolvers = {
  ...userQueries,
  ...userMutations,
}
export default resolverMap
