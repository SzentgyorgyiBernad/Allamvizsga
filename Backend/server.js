// import AuthController from "./Controlles/AuthController";
var bodyParser = require("body-parser");
const express = require("express");
const { PrismaClient, Prisma } = require("@prisma/client");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const prisma = new PrismaClient();
const app = express();
const router = express.Router();

app.use(express.json());
app.use(express.json());
app.use(cors());

const AuthController = require("./Controller/Auth/AuthController");
const DefaultAccountCreate = require("./Controller/DefaultAccountController/AccountCreate");
const Currency = require("./Controller/CurrencyController/Currency");
const authController = new AuthController();
const accountController = new DefaultAccountCreate();
const currency = new Currency();

const AuthMiddleware = require("./Middleware/auth");

app.post("/auth/register", authController.register);
app.post("/auth/login", authController.login);

app.get("/currency/allCurrency", currency.getAllCurrency);

app.post(
  "/account/createDefaultAccount",
  accountController.createDefaultAccount
);

app.listen(8000, () => console.log("The server is running on: 8000"));
