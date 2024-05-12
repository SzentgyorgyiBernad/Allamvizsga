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

const AuthController = require("./Controlles/Auth/AuthController");
const InvoiceController = require("./Controlles/InvoiceCreate/InvoiceCreate");
const authController = new AuthController();
const invoiceController = new InvoiceController();

const AuthMiddleware = require("./Middleware/auth");

app.post("/auth/register", authController.register);
app.post("/auth/login", authController.login);

app.get("/currency/allCurrency", invoiceController.getAllCurrency);

app.listen(8000, () => console.log("The server is running on: 8000"));
