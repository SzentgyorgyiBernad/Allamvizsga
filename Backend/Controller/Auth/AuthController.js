const AuthService = require("../../Services/AuthService");

module.exports = class AuthController {
  async register(req, res) {
    const { email, password } = req.body;
    try {
      const token = await AuthService.register(email, password);
      res.status(200).json({ token: token.token, email: email });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;
    try {
      const token = await AuthService.login(email, password);
      res.status(200).json({ token: token.token, email: email });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
