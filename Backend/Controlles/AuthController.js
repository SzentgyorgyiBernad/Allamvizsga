const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const { userExists, userFromDb, getUser } = require("../Models/UserModel");

const prisma = new PrismaClient();

module.exports = class AuthController {
  async register(req, res) {
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
      console.log(newUser.email);
      res.status(200).json("User created!");
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const userFromDb = await prisma.user.findFirstOrThrow({
        where: {
          email: email,
        },
      });
      if (!userFromDb) {
        return res.status(404).json({ error: "User not found" });
      }

      const passwordMatch = await bcrypt.compare(password, userFromDb.password);
      if (!passwordMatch) {
        res.status(401).json({ error: "Invalid email or password!" });
      }
      const token = jwt.sign(
        { userId: userFromDb.id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      // console.log("Token: ", token);
      res.status(200).json({ token: token });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
