const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function userExists(email) {
  const userExist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  console.log("amit kap", userExist);
  if (userExist == null) return false;
  else return true;
}

async function getUser(email) {
  const userFromDb = await prisma.user.findFirstOrThrow({
    where: {
      email: email,
    },
  });

  return !!userFromDb;
}

module.exports = { userExists, getUser };
