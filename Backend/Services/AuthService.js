const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const NodeCache = require("node-cache");
const { PrismaClient } = require("@prisma/client");
const { v4: uuidv4 } = require("uuid");

const tokenCache = new NodeCache({ stdTTL: 3600 });
const prisma = new PrismaClient();

async function register(email, password) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (user) {
    throw new Error("Email is already registered!");
  }

  const newUser = await prisma.user.create({
    data: {
      id: uuidv4(),
      email: email,
      password: await bcrypt.hash(password, 10),
    },
  });

  return {
    token: createToken(email),
    email: newUser.email,
  };
}

async function login(email, password) {
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid email or password");
  }

  return {
    token: createToken(email),
    email: user.email,
  };
}

function createToken(user) {
  const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "5d" });
  tokenCache.set(token, undefined);
  return token;
}

module.exports = {
  register,
  login,
};
