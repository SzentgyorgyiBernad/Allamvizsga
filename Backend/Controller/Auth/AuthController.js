const AuthService = require("../../Services/AuthService");

module.exports = class AuthController {
  async register(req, res) {
    // console.log("Backend register");
    const { email, password } = req.body;
    try {
      // Token
      const token = await AuthService.register(email, password);
      // console.log("Token: ", token);
      res.status(200).json({ token: token.token, email: email });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async login(req, res) {
    // console.log(req);
    // console.log("Be van loginolva");
    const { email, password } = req.body;
    try {
      const token = await AuthService.login(email, password);
      // console.log("Token: ", token);
      res.status(200).json({ token: token.token, email: email });
    } catch (error) {
      // console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
