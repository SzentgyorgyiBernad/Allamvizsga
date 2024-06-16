const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getAccounts(userId) {
  const accounts = await prisma.accounts.findMany({
    where: {
      user_id: userId,
    },
    select: {
      id: true,
      name: true,
      amount: true,
      currency: {
        select: {
          name: true,
        },
      },
    },
  });
  // console.log(accounts);
  return accounts;
}

module.exports = {
  getAccounts,
};
