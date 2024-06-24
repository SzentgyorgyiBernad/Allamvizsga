const CurrencyService = require("../../Services/CurrencyService");

module.exports = class CurrencyController {
  async getAllCurrency(req, res) {
    try {
      const currencies = await CurrencyService.getAllCurrency();
      res.status(200).json({ values: currencies.currencies });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
