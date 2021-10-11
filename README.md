## Database Structure

1. User
   - Every user should have at least one team with himself
2. Team
   - Team can have many Users and many Admins
3. Task
   - Task is always assigned to a TaskGroup
4. TaskGroup
   - TaskGroup is always assigned to a Board
5. Board
   - Board is always assigned to a Team (even if the Team only has one User)

## How to use generator of inputs (where, orderby, first, skip)

In this project, I wanted to add some filters for queries and mutations for all models. To do so, I created a script that can generate all graphql Inputs and queries needed. It needs few steps to set it up and can still be optimized a lot.

_File : @src/graphql/generateInputs.ts_

1. Call generateAllInputs() on the server launch

- It will generate all the inputs and create a file in _@src/generated/typeInputs.ts_

2. Export the typeDef for the type you want to create Where Inputs
3. Import it in _generateInputs.ts_, and add it in typeToGenerate array
4. In _@src/graphql/typedefs/typedefsMaps.ts_ : Import and add the typeDefs you wrote and the generated files
5. Run the server, in order to generate all inputs and schema (from codegen)
6. In _@src/graphql/resolvers/resolversFunctions.ts_ : add the new types in the WhereInputTypes, ...
7. Add user() and allUsers() (those are exemples) queries in your resolvers, you can use the resolver function to args of prisma function

## Work done/to do

- Build a Package that generate all User Input + queries + Mutations based on user typedefs
- Add global function to solve "Where", "OrderBy", "First", "Skip",
