const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getMyIncomeFromCurrentMonth(accountId) {
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
          gt: 0,
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

    let totalIncome = 0;
    transactions.forEach((transaction) => {
      totalIncome += transaction.amount;
    });

    return { transactions: transactions, totalIncome: totalIncome };
  } catch (error) {
    return "Internal server error";
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

    const previousMonthStart = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      1
    );
    const previousMonthEnd = new Date(
      now.getFullYear(),
      now.getMonth(),
      0,
      23,
      59,
      59,
      999
    );
    // console.log(currentStart, currentEnd, previousMonthStart, previousMonthEnd);

    const transactionsFromCurrentMonth = await prisma.income.findMany({
      where: {
        account_id: accountId,
        date: {
          gte: currentStart,
          lte: now,
        },
        amount: {
          gt: 0,
        },
      },
    });

    const transactionsFromLastmMonth = await prisma.income.findMany({
      where: {
        account_id: accountId,
        date: {
          gte: previousMonthStart,
          lte: previousMonthEnd,
        },
        amount: {
          gt: 0,
        },
      },
    });

    let totalIncomeFromCurrentMonth = 0;
    transactionsFromCurrentMonth.forEach((transaction) => {
      totalIncomeFromCurrentMonth += transaction.amount;
    });

    let totalIncomeFromLastMonth = 0;
    transactionsFromLastmMonth.forEach((transaction) => {
      totalIncomeFromLastMonth += transaction.amount;
    });
    // console.log(totalIncomeFromCurrentMonth, totalIncomeFromLastMonth);

    const percentage =
      ((totalIncomeFromCurrentMonth - totalIncomeFromLastMonth) /
        totalIncomeFromLastMonth) *
      100;

    return { percentage: percentage.toFixed(2) };
  } catch (error) {
    return "Internal server error";
  }
}

async function getMyPlannedTransactions(accountId) {
  try {
    const now = new Date();
    const startMonth = now.getMonth() + 1;
    const endDate = new Date(now.getFullYear(), startMonth, 1);

    const transactions = await prisma.income.findMany({
      where: {
        account_id: accountId,
        date: {
          gte: now,
          lte: endDate,
        },
        amount: {
          gt: 0,
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
        amount: "desc",
      },
    });

    const transactionsWithDaysRemaining = transactions.map((transaction) => {
      const transactionDate = new Date(transaction.date);
      const daysRemaining = Math.ceil(
        (transactionDate - now) / (1000 * 60 * 60 * 24)
      );
      return {
        ...transaction,
        daysRemaining,
      };
    });

    // console.log("transactions", transactionsWithDaysRemaining);

    return { values: transactionsWithDaysRemaining };
  } catch (error) {
    return "Internal server error";
  }
}

async function createMyGoal(data) {
  try {
    // console.log("data", data);
    const response = await prisma.user_goal.create({
      data: {
        id: data.id,
        name: data.goalName,
        endAmount: parseFloat(data.goalAmount),
        amount: parseFloat(0),
        description: data.description,
        end_date: data.endDate,
        accounts: {
          connect: {
            id: data.accountId,
          },
        },
      },
    });
    // console.log("response", response);

    return { values: response };
  } catch (error) {
    return { error: error.message };
  }
}

async function getMyGoals(accountId) {
  try {
    const goals = await prisma.user_goal.findMany({
      where: {
        account_id: accountId,
      },
      select: {
        id: true,
        amount: true,
        description: true,
        end_date: true,
        name: true,
        endAmount: true,
      },
      orderBy: {
        end_date: "asc",
      },
    });

    return { values: goals };
  } catch (error) {
    return "Internal server error";
  }
}

async function addMoneyToGoals(data) {
  try {
    // console.log("data", data);
    const goal = await prisma.user_goal.findUnique({
      where: {
        id: data.id,
      },
    });

    const response = await prisma.user_goal.update({
      where: {
        id: data.id,
      },
      data: {
        amount: parseFloat(goal.amount) + parseFloat(data.amount),
      },
    });

    return { values: response };
  } catch (error) {
    return "Internal server error";
  }
}

module.exports = {
  getMyIncomeFromCurrentMonth,
  compareToLastMonth,
  getMyPlannedTransactions,
  createMyGoal,
  getMyGoals,
  addMoneyToGoals,
};
