const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
// const { userExists, userFromDb, getUser } = require("../Models/UserModel");

const prisma = new PrismaClient();

module.exports = class AuthController {
  async register(req, res) {
    console.log("Backend register");
    try {
      const { email, password } = req.body;

      const existingUser = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (existingUser) {
        return res.status(400).json({ error: "Email is already registered!" });
      }

      //Encrypting the password
      const hashedPassword = await bcrypt.hash(password, 10);

      //Creating new user
      const newId = uuidv4();

      const newUser = await prisma.user.create({
        data: {
          id: newId,
          email: email,
          password: hashedPassword,
        },
      });
      // Token
      const token = jwt.sign({ userId: newId }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res.status(200).json({ token: token, email: email });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async login(req, res) {
    // console.log(req);
    // console.log("Be van loginolva");
    try {
      const { email, password } = req.body;
      console.log(email, password);
      const userFromDb = await prisma.user.findFirstOrThrow({
        where: {
          email: email,
        },
      });
      console.log(userFromDb);
      if (!userFromDb) {
        return res.status(404).json({ error: "User not found" });
      }
      // console.log(userFromDb.password);
      // console.log(password);
      const passwordMatch = await bcrypt.compare(password, userFromDb.password);
      // console.log("ma", passwordMatch);
      if (!passwordMatch) {
        res.status(401).json({ error: "Invalid email or password!" });
      }
      const token = jwt.sign(
        { userId: userFromDb.id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      // console.log("Token: ", token);
      res.status(200).json({ token: token, email: email });
    } catch (error) {
      // console.log(JSON.stringify(error));
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
