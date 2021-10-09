Basic Template using :

- Apollo Server Express
- GraphQL
- Prisma
- PostgreSQL databse

I tried to organize schema definition (resolvers/typedefs) to facilitate working on bigger projects from this template.

## TypeDefs Structure

1. Each Model has a typedef file (ex : book)
   - "Query" and "Mutation" need "extend"
   - Define "type" (Book) and "input" (CreateBookInput, UpdateBookInput)
2. Each typedef file is imported in typedefsMap which is imported in the schema (in server.js)

## Resolvers Structure

1. There is a separate file for each type Queries and Mutations (ex : for the type Book, there is a "bookQueries" and "bookMutations" file)
2. Resolve code is in those files
3. Possibility to organize more by putting those files in a folder named by the type (./resolvers/book/bookMutations)
4. Those files are imported in "resolverMap" which is imported in the schema (server.js)

## Work done/to do

1. Apollo Server Express
   Done : Get a server running
2. GraphQL Tool
   Done : Build & Factorize
3. Prisma
   Done : Models + Connect to database
4. From this template, create a To Do App
   WiP : repository link to be added
