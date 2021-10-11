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

## Work done/to do

- Maybe : Add Codegen to generate schema.graphql + all types
- Add global function to solve "Where", "OrderBy", "First", "Skip",
