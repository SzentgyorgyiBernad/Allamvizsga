const CurrencyService = require("../../Services/CurrencyService");

module.exports = class CurrencyController {
  async getAllCurrency(req, res) {
    try {
      // console.log("CurrencyController get elott");
      const currencies = await CurrencyService.getAllCurrency();
      // console.log("CurrencyController get utan");

      res.status(200).json({ values: currencies.currencies });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
