const { PrismaClient } = require("@prisma/client");
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
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    for (let i = now.getMonth() - 4; i <= now.getMonth(); i++) {
      if (i < 0) {
        const month = new Date(now.getFullYear(), startMonth + 11 + i, 1);
        const key = `${monthNames[month.getMonth()]}`;
        result[key] = { positives: 0, negatives: 0 };
      } else {
        const month = new Date(now.getFullYear(), startMonth + i, 1);
        const key = `${monthNames[month.getMonth()]}`;
        result[key] = { positives: 0, negatives: 0 };
      }
    }

    incomeByMonths.forEach((income) => {
      const month = income.date.getMonth() + 1;
      const key = `${monthNames[month]}`;

      if (!result[key]) {
        result[key] = { positives: 0, negatives: 0 };
      }
      if (income.amount > 0) {
        result[key].positives += income.amount;
      } else {
        result[key].negatives += income.amount;
      }
    });
    return { values: result };
  } catch (error) {
    return "Internal server error";
  }
}

async function getLastThreeTransaction(accountId) {
  try {
    const now = new Date();
    const startMonth = new Date(now.getFullYear(), now.getMonth() - 5, 1);

    const lastThreeTransactions = await prisma.income.findMany({
      where: {
        account_id: accountId,
        date: {
          lte: now,
          gte: startMonth,
        },
      },
      select: {
        id: true,
        amount: true,
        date: true,
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
    const transaction = await prisma.income.create({
      data: {
        id: body.id,
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

    const incomeType = await prisma.income_types.findUnique({
      where: {
        id: body.selectedTransactionType,
      },
      select: {
        name: true,
      },
    });

    const updatedAccount = await prisma.accounts.update({
      where: {
        id: body.selectedAccount,
      },
      data: {
        amount: {
          increment: parseFloat(body.amount),
        },
      },
    });

    const responseTransaction = {
      ...transaction,
      income_type: { name: incomeType.name },
    };

    return { response: "OK", value: responseTransaction };
  } catch (error) {
    return error.message;
  }
}

async function getAllTransactionWithDate(body) {
  try {
    let transactions;
    if (body.period.split("l")[1]) {
      const start = new Date(body.period.split("l")[0]);
      const end = new Date(body.period.split("l")[1]);

      transactions = await prisma.income.findMany({
        where: {
          account_id: body.accountId,
          date: {
            gte: start,
            lte: end,
          },
        },
        select: {
          id: true,
          amount: true,
          date: true,
          income_type: {
            select: {
              name: true,
            },
          },
        },
      });
    } else {
      const now = new Date();
      const start = new Date(body.period.split("l")[0]);

      transactions = await prisma.income.findMany({
        where: {
          account_id: body.accountId,
          date: {
            gte: start,
            lte: now,
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
      });
    }
    const transactionTypes = await prisma.income_types.findMany({
      select: {
        id: true,
        name: true,
        in_or_out: true,
      },
    });
    const incomeResult = transactionTypes
      .filter((type) => type.in_or_out === "in")
      .map((type) => ({
        type: type.name,
        value: 0,
      }));

    const outcomeResult = transactionTypes
      .filter((type) => type.in_or_out === "out")
      .map((type) => ({
        type: type.name,
        value: 0,
      }));

    let incomeNumber = 0;
    let outcomeNumber = 0;
    let income = 0;
    let outcome = 0;

    transactions.forEach((transaction) => {
      const type = transactionTypes.find(
        (type) => type.name === transaction.income_type.name
      );
      if (transaction.amount > 0) {
        incomeNumber += 1;
        income += transaction.amount;
        const index = incomeResult.findIndex((item) => item.type === type.name);
        incomeResult[index].value += transaction.amount;
      } else {
        outcomeNumber += 1;
        outcome += transaction.amount;
        const index = outcomeResult.findIndex(
          (item) => item.type === type.name
        );
        outcomeResult[index].value += transaction.amount;
      }
    });

    return {
      transactionValues: transactions,
      incomeTypeValues: incomeResult,
      outcomeTypeValues: outcomeResult,
      income: incomeNumber,
      outcome: outcomeNumber,
      incomeAmount: income,
      outcomeAmount: outcome,
    };
  } catch (error) {
    return error.message;
  }
}

module.exports = {
  getAllTransactionType,
  createTransaction,
  getIncomeByMonthsChart,
  getLastThreeTransaction,
  getAllTransactionWithDate,
};
