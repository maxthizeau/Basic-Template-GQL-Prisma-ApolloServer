import * as fs from "fs"
import path from "path"
import { capitalizeFirstLetter, lowercaseFirstLetter, tab } from "@src/utils/stringFunctions"
import { gql } from "apollo-server-express"
import { DocumentNode } from "graphql"

// Import GQL Types to generate
import { user } from "./typedefs/user"

// Create an array of type to generate
const typeToGenerate: TypeToGenerate[] = [{ name: "User", typeDef: user }]

interface GraphQLType {
  field: string
  type: string
}

interface TypeToGenerate {
  name: string
  typeDef: DocumentNode
}

function writeInput(typeArray: GraphQLType[], typeName: string): string {
  // WhereUserInput + enum SortBy
  let whereInput = `input Where${typeName}Input { \n`
  let sortBy = `${tab(2)}enum Sort${typeName}By { \n`
  typeArray.map((x) => {
    whereInput += `${tab(4) + x.field}_is: ${x.type.replace("!", "")}\n`
    whereInput += `${tab(4) + x.field}_not: ${x.type.replace("!", "")}\n`
    whereInput += `${tab(4) + x.field}_lt: ${x.type.replace("!", "")}\n`
    whereInput += `${tab(4) + x.field}_lte: ${x.type.replace("!", "")}\n`
    whereInput += `${tab(4) + x.field}_gt: ${x.type.replace("!", "")}\n`
    whereInput += `${tab(4) + x.field}_gte: ${x.type.replace("!", "")}\n`
    sortBy += `${tab(4) + x.field}_ASC\n${tab(4) + x.field}_DESC\n`
  })
  whereInput += tab(2) + "}\n\n"
  sortBy += tab(2) + "}\n\n"

  // WhereUniqueUserInput
  let whereUniqueInput = `${tab(2)}input WhereUnique${typeName}Input { \n`
  whereUniqueInput += `${tab(4) + typeArray[0].field}: ${typeArray[0].type} \n${tab(2)}}\n\n`

  return whereInput + whereUniqueInput + sortBy
}

function writeQueries(typeArray: GraphQLType[], typeName: string): string {
  let returnedString = "extend type Query {\n"
  returnedString += `${tab(4) + lowercaseFirstLetter(typeName)}(where: WhereUnique${typeName}Input!): ${typeName}\n`
  returnedString += `${tab(4)}all${capitalizeFirstLetter(
    typeName
  )}s(where: Where${typeName}Input, sortBy: [Sort${typeName}By!], first: Int, skip: Int): [${typeName}]\n`
  returnedString += `${tab(2)}}\n`
  return returnedString
}

async function generate(gqlDef: TypeToGenerate) {
  const { name, typeDef } = gqlDef
  // 1. Get the source code of typedefinition
  const source = typeDef.loc?.source.body

  // 2. Filter : Only keep type definitions (without commented ones)
  const regex = /(?=.*:)^.\s*[A-Z0-9].*/gim
  const explodedSource = source?.split("\n")
  const result = explodedSource?.filter((line) => line.match(regex))

  // 3. Build an array of GraphQLType {field : 'id', type : 'Int!' }
  const array: GraphQLType[] = []
  result?.map((x) => {
    const tmp = x.split(":")
    const fields: GraphQLType = { field: tmp[0].replace(/\s/g, ""), type: tmp[1].replace(/\s/g, "") }
    array.push(fields)
  })

  // 4. Write all inputs from the array
  const inputs = writeInput(array, name)

  // 5. Write all Queries from the array
  const queries = writeQueries(array, name)

  // Write Output
  let output = `// This file has been generated. DO NOT MODIFY\n\n`
  output += `import { gql } from "apollo-server-express"\n\n`
  output += `export const ${lowercaseFirstLetter(name)}Inputs = gql\`\n${tab(2) + inputs}${tab(2) + queries}\n\``

  // 8. Generate files
  const pathName = path.join("src", "generated", `${lowercaseFirstLetter(name)}Inputs.ts`)

  const content = fs.existsSync(pathName) ? fs.readFileSync(pathName, "utf-8") : null
  if (content !== output) {
    fs.writeFile(pathName, output, () => {
      console.log(name, " inputs generated!")
    })
  }
}

export async function generateAllInputs() {
  typeToGenerate.forEach((element) => {
    generate(element)
  })
}
// Get the user type def alone (export it)
// Import it in this file, and insert it into an array
//
