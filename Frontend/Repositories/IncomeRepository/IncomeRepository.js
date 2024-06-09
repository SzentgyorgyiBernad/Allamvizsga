import BaseRepository from "../BaseRepository";

export default class IncomeRepository extends BaseRepository {
  async compareToMyLastMonth(body, token) {
    response = await this.api.get("income/compareToMyLastMonth", {
      body,
      token,
    });
    return response;
  }

  async getMyTransactionsFromSpecDate(body, token) {
    response = await this.api.get("income/getMyTransactionsFromSpecDate", {
      body,
      token,
    });
    return response;
  }

  async getMyPlannedTransactions(body, token) {
    response = await this.api.get("income/getMyPlannedTransactions", {
      body,
      token,
    });
    return response;
  }
}
