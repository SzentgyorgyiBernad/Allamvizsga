const { PrismaClient } = require("@prisma/client");
const { v4: uuidv4 } = require("uuid");
const prisma = new PrismaClient();

async function getAllTransactionType() {
  try {
    const transactionTypes = await prisma.income_types.findMany({
      select: {
        id: true,
        name: true,
        in_or_out: true,
      },
    });

    return { transactionTypes: transactionTypes };
  } catch (error) {
    return "Internal server error";
  }
}

async function getIncomeByMonthsChart(accountId) {
  try {
    const now = new Date();
    const startMonth = now.getMonth() - 5;
    const endMonth = new Date(now.getFullYear(), startMonth, 1);

    const incomeByMonths = await prisma.income.findMany({
      where: {
        account_id: accountId,
        date: {
          gte: endMonth,
          lte: now,
        },
      },
    });

    const result = {};

    incomeByMonths.forEach((income) => {
      const month = income.date.getMonth() + 1;
      const year = income.date.getFullYear();
      const key = `${year}-${month < 10 ? "0" : ""}${month}`;

      if (!result[key]) {
        result[key] = { positives: 0, negatives: 0 };
      }
      if (income.amount > 0) {
        result[key].positives += income.amount;
      } else {
        result[key].negatives += income.amount;
      }
    });
    // console.log("incomeByMonths", result);
    return { values: result };
  } catch (error) {
    return "Internal server error";
  }
}

async function getLastThreeTransaction(accountId) {
  try {
    const lastThreeTransactions = await prisma.income.findMany({
      where: {
        account_id: accountId,
      },
      select: {
        id: true,
        amount: true,
        date: true,
        // note: true,
        // repetable: true,
        // repetable_period: true,
        income_type: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        date: "desc",
      },
      take: 3,
    });

    return { values: lastThreeTransactions };
  } catch (error) {
    return "Internal server error";
  }
}

async function createTransaction(body) {
  try {
    console.log("body", body);
    const transactionType = await prisma.income.create({
      data: {
        id: uuidv4(),
        amount: parseFloat(body.amount),
        date: body.date,
        note: body.description,
        repetable: body.repetable,
        repetable_period: body.repetable_period,
        income_type: {
          connect: { id: body.selectedTransactionType },
        },
        account: {
          connect: { id: body.selectedAccount },
        },
      },
    });

    return { response: "OK" };
  } catch (error) {
    return error.message;
  }
}

module.exports = {
  getAllTransactionType,
  createTransaction,
  getIncomeByMonthsChart,
  getLastThreeTransaction,
};
