const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getAllCurrency() {
  try {
    const currencies = await prisma.currency.findMany({
      select: {
        name: true,
      },
    });
    const currencyValues = currencies.map((item) => item.name);
    return { currencies: currencyValues };
  } catch (error) {
    return "Internal server error";
  }
}

module.exports = {
  getAllCurrency,
};
