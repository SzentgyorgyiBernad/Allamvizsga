const jwt = require("jsonwebtoken");

module.exports = class AccountController {
  async authJWT(req, res, next) {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);

      req.user = verified.user;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Token expired" });
      } else if (error.name === "JsonWebTokenError") {
        return res.status(400).json({ error: "Invalid token" });
      } else {
        return res.status(400).json({ error: "Token verification failed" });
      }
    }
  }
};
