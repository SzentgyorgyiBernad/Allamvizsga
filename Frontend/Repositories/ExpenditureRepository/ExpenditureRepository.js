import BaseRepository from "../BaseRepository";

export default class ExpenditureRepository extends BaseRepository {
  async compareToMyLastMonth(body, token) {
    response = await this.api.get("expenditure/compareToMyLastMonth/" + body, {
      body,
      token,
    });
    return response;
  }

  async getMyExpendituresFromCurrentMonth(body, token) {
    response = await this.api.get(
      "expenditure/getMyExpendituresFromCurrentMonth/" + body,
      { body, token }
    );
    return response;
  }

  async getMyPlannedExpenditures(body, token) {
    response = await this.api.get(
      "expenditure/getMyPlannedExpenditures/" + body,
      {
        body,
        token,
      }
    );
    return response;
  }

  async createMyBudget(body, token) {
    response = await this.api.post("expenditure/createBudget", { body, token });
    return response;
  }

  async getBudget(body, token) {
    response = await this.api.get("expenditure/getMyBudget/" + body, {
      body,
      token,
    });
    return response;
  }
}
