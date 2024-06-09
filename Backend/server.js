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
const DefaultAccountController = require("./Controller/DefaultAccountController/DefaultAccountCreate");
const CurrencyController = require("./Controller/CurrencyController/CurrencyController");
const AccountController = require("./Controller/AccountController/AccountController");
const TransactionTypeController = require("./Controller/TransactionTypeController/TransactionTypeController");
const authController = new AuthController();
const defaultAccountController = new DefaultAccountController();
const currencyController = new CurrencyController();
const accountController = new AccountController();
const transactionTypeController = new TransactionTypeController();

const AuthMiddleware = require("./Middleware/authJWT");
//Auth
app.post("/auth/register", authController.register);
app.post("/auth/login", authController.login);
//Currency
app.get("/currency/allCurrency", currencyController.getAllCurrency);
//DefaultAccount
app.post(
  "/account/createDefaultAccount",
  defaultAccountController.createDefaultAccount
);
//Account
app.get("/account/getAccounts", accountController.getAllAccount);
//TransactionType
app.get(
  "/transactionType/allTransactionType",
  transactionTypeController.getAllTransactionType
);
//Transactions
app.post(
  "/transaction/createTransaction",
  transactionTypeController.createNewTransaction
);
app.get(
  "/transaction/incomeByMonths",
  transactionTypeController.getIncomeByMonths
);
app.get(
  "/transaction/lastThreeTransactions",
  transactionTypeController.getLastThreeTransactions
);
app.listen(8000, () => console.log("The server is running on: 8000"));
