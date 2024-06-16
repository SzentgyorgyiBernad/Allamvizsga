const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getMyExpenditureFromCurrentMonth(accountId) {
  try {
    const now = new Date();
    const startMonth = now.getMonth() + 1;

    const transactions = await prisma.income.findMany({
      where: {
        account_id: accountId,
        date: {
          gte: new Date(now.getFullYear(), startMonth - 1, 1),
          lte: now,
        },
        amount: {
          lt: 0,
        },
      },
      select: {
        id: true,
        amount: true,
        date: true,
        note: true,
        income_type: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        date: "desc",
      },
    });

    let totalExpenditure = 0;
    transactions.forEach((transaction) => {
      totalExpenditure += transaction.amount;
    });
    // console.log("Total Expenditure", totalExpenditure);
    // console.log("Transactions", transactions);
    return { transactions: transactions, totalExpenditure: totalExpenditure };
  } catch (error) {
    return { error: error.message };
  }
}

async function compareToLastMonth(accountId) {
  try {
    // console.log("Account ID", accountId);
    const now = new Date();
    const startMonth = now.getMonth() + 1;

    const currentStart = new Date(now.getFullYear(), startMonth - 1, 1);
    const currentEnd = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    );
    // console.log("Current Start", currentStart);

    const lastMonthStart = new Date(now.getFullYear(), startMonth - 2, 1);
    const lastMonthEnd = new Date(
      now.getFullYear(),
      startMonth - 1,
      0,
      23,
      59,
      59,
      999
    );

    // console.log("Last Month Start", lastMonthStart);

    const currentMonthTransactions = await prisma.income.findMany({
      where: {
        account_id: accountId,
        date: {
          gte: currentStart,
          lte: currentEnd,
        },
        amount: {
          lt: 0,
        },
      },
    });

    // console.log("Current Month Transactions", currentMonthTransactions);

    const lastMonthTransactions = await prisma.income.findMany({
      where: {
        account_id: accountId,
        date: {
          gte: lastMonthStart,
          lte: lastMonthEnd,
        },
        amount: {
          lt: 0,
        },
      },
    });

    // console.log("Last Month Transactions", lastMonthTransactions);

    let currentMonthTotal = 0;
    currentMonthTransactions.forEach((transaction) => {
      currentMonthTotal += transaction.amount;
    });

    let lastMonthTotal = 0;
    lastMonthTransactions.forEach((transaction) => {
      lastMonthTotal += transaction.amount;
    });

    // console.log("Current Month Total", currentMonthTotal);
    // console.log("Last Month Total", lastMonthTotal);

    if (currentMonthTotal === 0 || lastMonthTotal === 0) {
      return 0;
    }

    const percentage =
      ((currentMonthTotal - lastMonthTotal) / lastMonthTotal) * 100;
    // console.log("Percentage", percentage);
    return percentage;
  } catch (error) {
    return "Internal server error";
  }
}

async function getMyPlannedExpenditures(accountId) {
  try {
    const now = new Date();
    const startMonth = now.getMonth() + 1;
    const endDate = new Date(now.getFullYear(), startMonth + 1, 1);
    // console.log("Now", now);
    // console.log("End Date", endDate);
    // console.log("Start Month", startMonth);

    const plannedExpenditures = await prisma.income.findMany({
      where: {
        account_id: accountId,
        date: {
          gte: now,
          lte: endDate,
        },
        amount: {
          lt: 0,
        },
      },
      select: {
        id: true,
        amount: true,
        date: true,
        note: true,
        expenditure_type: {
          select: {
            name: true,
          },
        },
      },
    });
    console.log("Planned Expenditures", plannedExpenditures);
    return plannedExpenditures;
  } catch (error) {
    return "Internal server error";
  }
}

module.exports = {
  getMyExpenditureFromCurrentMonth,
  compareToLastMonth,
  getMyPlannedExpenditures,
};
