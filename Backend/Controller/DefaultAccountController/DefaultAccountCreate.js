const { PrismaClient } = require("@prisma/client");
const { getUser } = require("../../Models/UserModel");

const prisma = new PrismaClient();

module.exports = class DefaultAccountController {
  async createDefaultAccount(req, res) {
    try {
      // console.log("createDefaultAccount in controller", req.body);
      const { id, selectedCurrency, amount, accountName, email } = req.body;

      const user = await getUser(email);
      // console.log("user: ", user);

      // console.log(selectedCurrency, amount, accountName, email);
      const currencyId = await prisma.currency.findFirst({
        where: {
          name: selectedCurrency,
        },
      });
      // console.log(currencyId.id);
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
      // console.log(newAccount);

      res.status(200).json({ message: "Account created" });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async accountDelete(req, res) {
    try {
      const accountId = req.params;
      // console.log("accountId", accountId);
      const account = await prisma.accounts.delete({
        where: {
          id: accountId.id,
        },
      });
      // console.log("account", account);
      res.status(200).json({ message: "Account deleted" });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
