const AccountService = require("../../Services/AccountService");
const jwt = require("jsonwebtoken");

module.exports = class AccountController {
  async getAllAccount(req, res) {
    try {
      const headers = req.headers.authorization;
      const token = headers.split(" ")[1];
      const user = jwt.verify(token, process.env.JWT_SECRET).user;
      const accounts = await AccountService.getAccounts(user.id);
      res.status(200).json({ values: accounts });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteAccount(req, res) {
    try {
      const id = req.params;
      const response = await AccountService.deleteMyAccount(id);
      res.status(200).json({ message: response });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
