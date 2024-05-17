const { PrismaClient } = require("@prisma/client");
const { v4: uuidv4 } = require("uuid");

const prisma = new PrismaClient();

module.exports = class AccountController {
  async createDefaultAccount(req, res) {
    try {
      console.log("createDefaultAccount in controller", req.body);
      const { selectedCurrency, amount, accountName, email } = req.body;
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      const userId = user.id;
      const accountId = uuidv4();
      console.log(selectedCurrency, amount, accountName, email);
      const currencyId = await prisma.currency.findFirst({
        where: {
          name: selectedCurrency,
        },
      });
      // console.log(currencyId);
      const newAccount = await prisma.accounts.create({
        data: {
          id: accountId,
          name: accountName,
          amount: parseFloat(amount),
          user_id: userId,
          currency_name: currencyId.id,
          default: true,
        },
      });

      res.status(200).json({ message: "Account created" });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
