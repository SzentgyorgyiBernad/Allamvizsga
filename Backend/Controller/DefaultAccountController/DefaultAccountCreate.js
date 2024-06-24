const { PrismaClient } = require("@prisma/client");
const { getUser } = require("../../Models/UserModel");

const prisma = new PrismaClient();

module.exports = class DefaultAccountController {
  async createDefaultAccount(req, res) {
    try {
      const { id, selectedCurrency, amount, accountName, email } = req.body;
      const user = await getUser(email);
      const currencyId = await prisma.currency.findFirst({
        where: {
          name: selectedCurrency,
        },
      });
      const newAccount = await prisma.accounts.create({
        data: {
          id: id,
          name: accountName,
          amount: parseFloat(amount),
          default: true,
          currency: {
            connect: { id: currencyId.id },
          },
          user: {
            connect: { id: user.user.id },
          },
        },
      });

      res.status(200).json({ message: "Account created" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
