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
app.use(cors());

const AuthController = require("./Controller/Auth/AuthController");
const DefaultAccountController = require("./Controller/DefaultAccountController/DefaultAccountCreate");
const CurrencyController = require("./Controller/CurrencyController/CurrencyController");
const AccountController = require("./Controller/AccountController/AccountController");
const TransactionTypeController = require("./Controller/TransactionTypeController/TransactionTypeController");
const IncomeController = require("./Controller/IncomeController/IncomeController");
const ExpenditureController = require("./Controller/ExpenditureController/ExpenditureController");
const authController = new AuthController();
const defaultAccountController = new DefaultAccountController();
const currencyController = new CurrencyController();
const accountController = new AccountController();
const transactionTypeController = new TransactionTypeController();
const incomeController = new IncomeController();
const expenditureController = new ExpenditureController();

const AuthMiddleware = require("./Middleware/authJWT");
const authMiddleware = new AuthMiddleware();
//Auth
app.post("/auth/register", authController.register);
app.post("/auth/login", authController.login);
//Currency
app.get(
  "/currency/allCurrency",
  authMiddleware.authJWT,
  currencyController.getAllCurrency
);
//DefaultAccount
app.post(
  "/account/createDefaultAccount",
  authMiddleware.authJWT,
  defaultAccountController.createDefaultAccount
);
//Account
app.get(
  "/account/getAccounts",
  authMiddleware.authJWT,
  accountController.getAllAccount
);
app.delete(
  "/account/deleteAccount/:id",
  authMiddleware.authJWT,
  accountController.deleteAccount
);
//TransactionType
app.get(
  "/transactionType/allTransactionType",
  authMiddleware.authJWT,
  transactionTypeController.getAllTransactionType
);
//Transactions
app.post(
  "/transaction/createTransaction",
  authMiddleware.authJWT,
  transactionTypeController.createNewTransaction
);
app.get(
  "/transaction/incomeByMonths/:id",
  authMiddleware.authJWT,
  transactionTypeController.getIncomeByMonths
);
app.get(
  "/transaction/lastThreeTransactions/:id",
  authMiddleware.authJWT,
  transactionTypeController.getLastThreeTransactions
);
app.get(
  "/transaction/allTransactionWithDate/:id/:period",
  authMiddleware.authJWT,
  transactionTypeController.getAllMyTransactionWithDate
);
//Income
app.get(
  "/income/getMyTransactionsFromCurrentMonth/:id",
  authMiddleware.authJWT,
  incomeController.getAllMyIncomeFromCurrentMonth
);
app.get(
  "/income/compareToMyLastMonth/:id",
  authMiddleware.authJWT,
  incomeController.getComparePercantage
);
app.get(
  "/income/getMyPlannedTransactions/:id",
  authMiddleware.authJWT,
  incomeController.getPlannedTransactions
);
app.post(
  "/income/createGoal",
  authMiddleware.authJWT,
  incomeController.createGoal
);
app.get(
  "/income/getMyGoals/:id",
  authMiddleware.authJWT,
  incomeController.getGoals
);
app.post(
  "/income/addMoneyToGoal",
  authMiddleware.authJWT,
  incomeController.addMoneyToGoal
);
//Expenditure
app.get(
  "/expenditure/getMyExpendituresFromCurrentMonth/:id",
  authMiddleware.authJWT,
  expenditureController.getAllMyExpenditureFromCurrentMonth
);
app.get(
  "/expenditure/compareToMyLastMonth/:id",
  authMiddleware.authJWT,
  expenditureController.getComparePercantage
);
app.get(
  "/expenditure/getMyPlannedExpenditures/:id",
  authMiddleware.authJWT,
  expenditureController.getPlannedExpenditures
);
app.post(
  "/expenditure/createBudget",
  authMiddleware.authJWT,
  expenditureController.createBudget
);
app.get(
  "/expenditure/getMyBudget/:id",
  authMiddleware.authJWT,
  expenditureController.getMyBudget
);
app.listen(8000, () => console.log("The server is running on: 8000"));
