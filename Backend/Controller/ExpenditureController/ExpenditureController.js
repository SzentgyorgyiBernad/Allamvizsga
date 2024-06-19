const ExpenditureService = require("../../Services/ExpenditureService");

module.exports = class ExpenditureController {
  async getAllMyExpenditureFromCurrentMonth(req, res) {
    try {
      const accountId = req.params;
      const expenditures =
        await ExpenditureService.getMyExpenditureFromCurrentMonth(accountId.id);
      res.status(200).json({ values: expenditures });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getComparePercantage(req, res) {
    try {
      const accountId = req.params;
      const percentage = await ExpenditureService.compareToLastMonth(
        accountId.id
      );
      res.status(200).json({ values: percentage });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getPlannedExpenditures(req, res) {
    try {
      const accountId = req.params;
      const plannedExpenditures =
        await ExpenditureService.getMyPlannedExpenditures(accountId.id);
      res.status(200).json({ values: plannedExpenditures });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async createBudget(req, res) {
    try {
      const body = req.body;
      const response = await ExpenditureService.createMyBudget(body);
      res.status(200).json({ values: response });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getMyBudget(req, res) {
    try {
      const accountId = req.params;
      const budget = await ExpenditureService.getBudget(accountId.id);
      res.status(200).json({ values: budget });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
