const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function userExists(email) {
  const userExist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (userExist == null) return false;
  else return true;
}

async function getUser(email) {
  const userFromDb = await prisma.user.findFirstOrThrow({
    where: {
      email: email,
    },
  });
  return { user: userFromDb };
}

module.exports = { userExists, getUser };
