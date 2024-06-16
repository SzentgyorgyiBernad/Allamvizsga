const jwt = require("jsonwebtoken");

module.exports = class AccountController {
  async authJWT(req, res, next) {
    const authHeader = req.headers["authorization"];
    // console.log("authHeader", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    // console.log("token", token);
    // console.log("verified", process.env.JWT_SECRET);

    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);

      // console.log(verified);

      req.user = verified.user;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        console.log("Token expired", error);
        return res.status(401).json({ error: "Token expired" });
      } else if (error.name === "JsonWebTokenError") {
        console.log("Invalid token", error);
        return res.status(400).json({ error: "Invalid token" });
      } else {
        console.log("Token verification failed", error);
        return res.status(400).json({ error: "Token verification failed" });
      }
    }
  }
};
