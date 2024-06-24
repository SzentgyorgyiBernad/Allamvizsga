import BaseRepository from "../BaseRepository";

export default class TransactionRepository extends BaseRepository {
  async getAllTransaction(token) {
    response = await this.api.get("transactionType/allTransactionType", {
      token,
    });
    return response;
  }

  async getIncomeByMonths(body, token) {
    response = await this.api.get("transaction/incomeByMonths/" + body, {
      body,
      token,
    });
    return response;
  }

  async getLastThreeTransactions(body, token) {
    response = await this.api.get("transaction/lastThreeTransactions/" + body, {
      body,
      token,
    });
    return response;
  }

  async createTransaction(body, token) {
    response = await this.api.post("transaction/createTransaction", {
      body,
      token,
    });
    return response;
  }

  async getAllMyTransactionWithDate(body, token) {
    response = await this.api.get(
      "transaction/allTransactionWithDate/" + body.accountId + "/" + body.date,
      {
        body,
        token,
      }
    );
    return response;
  }
}
