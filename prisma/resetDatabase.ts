import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const deletedUserOnTeamCount = await prisma.usersOnTeam.deleteMany({})
  console.log(`🗑️ Deleted ${deletedUserOnTeamCount.count} users on team relations`)
  const deletedTasksCount = await prisma.task.deleteMany({})
  console.log(`🗑️ Deleted ${deletedTasksCount.count} tasks`)
  const deletedTaskGroupsCount = await prisma.taskGroup.deleteMany({})
  console.log(`🗑️ Deleted ${deletedTaskGroupsCount.count} task groups`)
  const deletedBoardsCount = await prisma.board.deleteMany({})
  console.log(`🗑️ Deleted ${deletedBoardsCount.count} boards`)
  const deletedTeamsCount = await prisma.team.deleteMany({})
  console.log(`🗑️ Deleted ${deletedTeamsCount.count} teams`)
  const deletedUserCount = await prisma.user.deleteMany({})
  console.log(`🗑️ Deleted ${deletedUserCount.count} users`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
