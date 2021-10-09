// resolverMap.ts
import { IResolvers } from "@graphql-tools/utils/Interfaces"
import bookMutations from "./bookMutations"
import bookQueries from "./bookQueries"
const resolverMap: IResolvers = {
  ...bookQueries,
  ...bookMutations,
}
export default resolverMap
