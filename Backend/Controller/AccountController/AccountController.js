const AccountService = require("../../Services/AccountService");
const jwt = require("jsonwebtoken");

module.exports = class AccountController {
  async getAllAccount(req, res) {
    try {
      //   console.log("req.headers, eljut idaig?", req.headers);

      const headers = req.headers.authorization;
      //   console.log("headers", headers);
      const token = headers.split(" ")[1];
      // console.log("token", token);
      const user = jwt.verify(token, process.env.JWT_SECRET).user;
      // console.log("user a tokenbol", user);
      const accounts = await AccountService.getAccounts(user.id);
      // console.log("accounts in controller", accounts);
      res.status(200).json({ values: accounts });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
