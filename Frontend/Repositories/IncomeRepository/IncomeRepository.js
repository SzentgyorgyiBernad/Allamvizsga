import BaseRepository from "../BaseRepository";

export default class IncomeRepository extends BaseRepository {
  async compareToMyLastMonth(body, token) {
    response = await this.api.get("income/compareToMyLastMonth/" + body, {
      body,
      token,
    });
    return response;
  }

  async getMyTransactionsFromCurrentMonth(body, token) {
    response = await this.api.get(
      "income/getMyTransactionsFromCurrentMonth/" + body,
      { body, token }
    );
    return response;
  }

  async getMyPlannedTransactions(body, token) {
    response = await this.api.get("income/getMyPlannedTransactions/" + body, {
      body,
      token,
    });
    return response;
  }

  async createMyGoal(body, token) {
    response = await this.api.post("income/createGoal", { body, token });
    return response;
  }

  async getMyGoals(body, token) {
    response = await this.api.get("income/getMyGoals/" + body, { body, token });
    return response;
  }

  async addMoneyToGoal(body, token) {
    response = await this.api.post("income/addMoneyToGoal", { body, token });
    return response;
  }
}
