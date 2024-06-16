const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getAllCurrency() {
  try {
    const currencies = await prisma.currency.findMany({
      select: {
        name: true,
      },
    });
    console.log(currencies);
    const currencyValues = currencies.map((item) => item.name);
    console.log("Currency service", currencyValues);
    return { currencies: currencyValues };
  } catch (error) {
    // console.log(error.message);
    return "Internal server error";
  }
}

module.exports = {
  getAllCurrency,
};
