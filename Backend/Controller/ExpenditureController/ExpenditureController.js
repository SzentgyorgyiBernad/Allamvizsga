const ExpenditureService = require("../../Services/ExpenditureService");

module.exports = class ExpenditureController {
  async getAllMyExpenditureFromCurrentMonth(req, res) {
    try {
      const accountId = req.params;
      const expenditures =
        await ExpenditureService.getMyExpenditureFromCurrentMonth(accountId.id);
      // console.log("get All My Expenditure From CurrentMonth", expenditures);
      res.status(200).json({ values: expenditures });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getComparePercantage(req, res) {
    try {
      const accountId = req.params;
      // console.log("accountIdaaaaaaaaaaa", req.params);
      const percentage = await ExpenditureService.compareToLastMonth(
        accountId.id
      );
      // console.log("getComparePercantage", percentage);
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
      // console.log("getPlannedExpenditures", plannedExpenditures);
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
      console.log(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getMyBudget(req, res) {
    try {
      const accountId = req.params;
      const budget = await ExpenditureService.getMyBudget(accountId.id);
      res.status(200).json({ values: budget });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
