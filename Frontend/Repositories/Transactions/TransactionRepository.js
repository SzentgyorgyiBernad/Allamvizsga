import BaseRepository from "../BaseRepository";

export default class TransactionRepository extends BaseRepository {
  async getAllTransaction(token) {
    response = await this.api.get("transactionType/allTransactionType", {
      token,
    });
    return response;
  }

  async getIncomeByMonths(body, token) {
    // console.log("getIncomeByMonths in repository", body);
    response = await this.api.get("transaction/incomeByMonths/" + body, {
      body,
      token,
    });
    // console.log("response", response);
    return response;
  }

  async getLastThreeTransactions(body, token) {
    // console.log("getLastThreeTransactions in repository", body);
    response = await this.api.get("transaction/lastThreeTransactions/" + body, {
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
