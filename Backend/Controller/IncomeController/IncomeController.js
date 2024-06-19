const IncomeRepository = require("../../Services/IncomeService");

module.exports = class IncomeController {
  async getAllMyIncomeFromCurrentMonth(req, res) {
    try {
      const accountId = req.params;
      const incomes = await IncomeRepository.getMyIncomeFromCurrentMonth(
        accountId.id
      );
      res.status(200).json({ values: incomes });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getComparePercantage(req, res) {
    try {
      const accountId = req.params;
      const percentage = await IncomeRepository.compareToLastMonth(
        accountId.id
      );
      res.status(200).json({ values: percentage });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getPlannedTransactions(req, res) {
    try {
      const accountId = req.params;
      const plannedTransactions =
        await IncomeRepository.getMyPlannedTransactions(accountId.id);
      res.status(200).json({ values: plannedTransactions });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async createGoal(req, res) {
    try {
      const { body } = req.body;
      const response = await IncomeRepository.createMyGoal(body);
      res.status(200).json({ values: response });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getGoals(req, res) {
    try {
      const accountId = req.params;
      const goals = await IncomeRepository.getMyGoals(accountId.id);
      res.status(200).json({ values: goals });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async addMoneyToGoal(req, res) {
    try {
      const { body } = req.body;
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
