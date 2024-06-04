const jwt = require("jsonwebtoken");

function authJWT(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified.user;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
}
