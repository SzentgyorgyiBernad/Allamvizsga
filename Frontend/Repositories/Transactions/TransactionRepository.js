import BaseRepository from "../BaseRepository";

export default class TransactionRepository extends BaseRepository {
  async getAllTransaction() {
    response = await this.api.get("transactionType/allTransactionType");
    return response;
  }

  async getIncomeByMonths(body, token) {
    response = await this.api.get("transaction/incomeByMonths", {
      body,
      token,
    });
    return response;
  }

  async getLastThreeTransactions(body, token) {
    // console.log("getLastThreeTransactions in repository", body);
    response = await this.api.get("transaction/lastThreeTransactions", {
      body,
      token,
    });
    return response;
  }

  async createTransaction(body, token) {
    // console.log("createTransaction in repository", body);
    response = await this.api.post("transaction/createTransaction", {
      body,
      token,
    });
    return response;
  }
}
