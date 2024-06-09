const TransactionTypeService = require("../../Services/TransactionTypeService");
const jwt = require("jsonwebtoken");

module.exports = class TransactionTypeController {
  async getAllTransactionType(req, res) {
    try {
      const transactionTypes =
        await TransactionTypeService.getAllTransactionType();
      res.status(200).json({ values: transactionTypes.transactionTypes });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getIncomeByMonths(req, res) {
    try {
      const accountId = req.body;
      const incomeByMonths =
        await TransactionTypeService.getIncomeByMonthsChart(accountId);
      res.status(200).json({ values: incomeByMonths });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getLastThreeTransactions(req, res) {
    try {
      const accountId = req.body;
      const lastThreeTransactions =
        await TransactionTypeService.getLastThreeTransaction(accountId);
      console.log("lastThreeTransactions", lastThreeTransactions);
      res.status(200).json({ values: lastThreeTransactions });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async createNewTransaction(req, res) {
    try {
      const { body } = req;
      const response = await TransactionTypeService.createTransaction(body);
      console.log("response", response);
      res.status(200).json({ values: response });
    } catch (error) {
      console.log("Erro a cathcnbben", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
