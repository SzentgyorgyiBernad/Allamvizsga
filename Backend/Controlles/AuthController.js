const { PrismaClient, Prisma } = require("@prisma/client");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const prisma = new PrismaClient();

module.exports = class AuthController {
  async register(req, res) {
    console.log(req.body);
    try {
      const { email, password } = req.body;
      //Checking the email to see if it is already in the database
      const existinguser = await prisma.user.findUnique({
        where: { email },
      });
      console.log(existinguser);

      //Returning with if it exist
      if (existinguser) {
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

      res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
