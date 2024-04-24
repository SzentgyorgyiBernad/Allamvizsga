const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decodedToken.userId;
      if (req.body.userId && req.body.userId !== userId) {
        throw "Invalid user ID";
      } else {
        next();
      }
    } catch {
      res.status(401).json({
        error: new Error("Invalid request!"),
      });
    }
  }
};
