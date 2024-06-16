const IncomeRepository = require("../../Services/IncomeService");

module.exports = class IncomeController {
  async getAllMyIncomeFromCurrentMonth(req, res) {
    // console.log("req.body", req);
    try {
      const accountId = req.params;
      const incomes = await IncomeRepository.getMyIncomeFromCurrentMonth(
        accountId.id
      );
      // console.log("incomes", incomes);
      res.status(200).json({ values: incomes });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getComparePercantage(req, res) {
    try {
      const accountId = req.params;
      // console.log("accountIdaaaaaaaaaaa", req.params);
      const percentage = await IncomeRepository.compareToLastMonth(
        accountId.id
      );
      // console.log("percentage", percentage);
      res.status(200).json({ values: percentage });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getPlannedTransactions(req, res) {
    try {
      const accountId = req.params;
      // console.log("accountId ssssssssss", accountId);
      const plannedTransactions =
        await IncomeRepository.getMyPlannedTransactions(accountId.id);
      // console.log("plannedTransactions", plannedTransactions);
      res.status(200).json({ values: plannedTransactions });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async createGoal(req, res) {
    try {
      const { body } = req.body;
      console.log("body", body);
      const response = await IncomeRepository.createMyGoal(body);
      console.log("response", response);
      res.status(200).json({ values: response });
    } catch (error) {
      console.log("Erro a cathcnbben", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getGoals(req, res) {
    try {
      const accountId = req.params;
      // console.log("accountId", accountId);
      const goals = await IncomeRepository.getMyGoals(accountId.id);
      // console.log("goals", goals);
      res.status(200).json({ values: goals });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async addMoneyToGoal(req, res) {
    console.log("req.body", req.body);
    try {
      console.log("req.body", req);
      const { body } = req.body;
      console.log("body", body);
      // const response = await IncomeRepository.addMoneyToGoals(body);
      // console.log("response", response);
      // res.status(200).json({ values: response });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
