// import AuthController from "./Controlles/AuthController";

const express = require("express");
const { PrismaClient, Prisma } = require("@prisma/client");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");

const prisma = new PrismaClient();
const app = express();
const router = express.Router();

app.use(express.json());
app.use(cors());

const AuthController = require("./Controlles/AuthController");
const authController = new AuthController();
const AuthMiddleware = require("./Middleware/auth");

app.post("/register", AuthMiddleware, authController.register);

app.listen(8000, () => console.log("The server is running on: 8000"));
