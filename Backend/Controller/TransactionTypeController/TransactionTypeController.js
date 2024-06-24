const TransactionTypeService = require("../../Services/TransactionTypeService");

module.exports = class TransactionTypeController {
  async getAllTransactionType(req, res) {
    try {
      const transactionTypes =
        await TransactionTypeService.getAllTransactionType();
      res.status(200).json({ values: transactionTypes.transactionTypes });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getIncomeByMonths(req, res) {
    try {
      const accountId = req.params;
      const incomeByMonths =
        await TransactionTypeService.getIncomeByMonthsChart(accountId.id);
      res.status(200).json({ values: incomeByMonths });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getLastThreeTransactions(req, res) {
    try {
      const accountId = req.params;
      const lastThreeTransactions =
        await TransactionTypeService.getLastThreeTransaction(accountId.id);
      res.status(200).json({ values: lastThreeTransactions });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async createNewTransaction(req, res) {
    try {
      const { body } = req;
      const response = await TransactionTypeService.createTransaction(body);
      res.status(200).json({ values: response });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getAllMyTransactionWithDate(req, res) {
    try {
      const accountId = req.params.id;
      const period = req.params.period;
      const response = await TransactionTypeService.getAllTransactionWithDate({
        accountId,
        period,
      });
      res.status(200).json({ values: response });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
