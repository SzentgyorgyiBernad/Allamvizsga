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
    return { transactions: transactions, totalExpenditure: totalExpenditure };
  } catch (error) {
    return { error: error.message };
  }
}

async function compareToLastMonth(accountId) {
  try {
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

    let currentMonthTotal = 0;
    currentMonthTransactions.forEach((transaction) => {
      currentMonthTotal += transaction.amount;
    });

    let lastMonthTotal = 0;
    lastMonthTransactions.forEach((transaction) => {
      lastMonthTotal += transaction.amount;
    });

    if (currentMonthTotal === 0 || lastMonthTotal === 0) {
      return 0;
    }

    const percentage =
      ((currentMonthTotal - lastMonthTotal) / lastMonthTotal) * 100;
    return percentage;
  } catch (error) {
    return { error: error.message };
  }
}

async function getMyPlannedExpenditures(accountId) {
  try {
    const now = new Date();
    const startMonth = now.getMonth() + 1;
    const endDate = new Date(now.getFullYear(), startMonth, 1);

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

    const transactionsWithDaysRemaining = plannedExpenditures.map(
      (transaction) => {
        const transactionDate = new Date(transaction.date);
        const daysRemaining = Math.ceil(
          (transactionDate - now) / (1000 * 60 * 60 * 24)
        );
        return {
          ...transaction,
          daysRemaining,
        };
      }
    );

    return { values: transactionsWithDaysRemaining };
  } catch (error) {
    return { error: error.message };
  }
}

async function createMyBudget(body) {
  try {
    const newBudget = await prisma.expenditure_plan.create({
      data: {
        id: body.id,
        amount: parseFloat(body.budgetAmount),
        account: {
          connect: { id: body.accountId },
        },
      },
    });
    return { values: newBudget };
  } catch (error) {
    return { error: error.message };
  }
}

async function getBudget(accountId) {
  try {
    const budget = await prisma.expenditure_plan.findMany({
      where: {
        account_id: accountId,
      },
      select: {
        id: true,
        amount: true,
      },
    });
    return { values: budget };
  } catch (error) {
    return { error: error.message };
  }
}

module.exports = {
  getMyExpenditureFromCurrentMonth,
  compareToLastMonth,
  getMyPlannedExpenditures,
  createMyBudget,
  getBudget,
};
