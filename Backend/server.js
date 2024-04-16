// import AuthController from "./Controlles/AuthController";
const express = require("express");
const { PrismaClient, Prisma } = require("@prisma/client");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const prisma = new PrismaClient();
const app = express();
const router = express.Router();

app.use(express.json());
app.use(cors());

const AuthController = require("./Controlles/AuthController");
const authController = new AuthController();
const AuthMiddleware = require("./Middleware/auth");

app.post("/register", authController.register);
app.post("/login", authController.login);

app.listen(8000, () => console.log("The server is running on: 8000"));
