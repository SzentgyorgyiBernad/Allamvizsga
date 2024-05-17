const { PrismaClient } = require("@prisma/client");
const { v4: uuidv4 } = require("uuid");

const prisma = new PrismaClient();

module.exports = class InvoiceController {
  async getAllCurrency(req, res) {
    try {
      const currencies = await prisma.currency.findMany({
        select: {
          name: true,
        },
      });
      console.log(currencies);
      const currencyValues = currencies.map((item) => item.name);
      console.log(currencyValues);
      res.status(200).json({ values: currencyValues });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
