import BaseRepository from "../BaseRepository";

export default class AccountCreateRepository extends BaseRepository {
  async getAllCurrency(token) {
    response = await this.api.get("currency/allCurrency", { token });
    return response;
  }
  async createDefaultAccount(body, token) {
    response = await this.api.post("account/createDefaultAccount", {
      body,
      token,
    });
    return response;
  }
}
