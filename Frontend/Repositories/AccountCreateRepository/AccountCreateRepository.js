import BaseRepository from "../BaseRepository";

export default class AccountCreateRepository extends BaseRepository {
  async getAllCurrency(body) {
    response = await this.api.get("currency/allCurrency", { body });
    return response;
  }
  async createDefaultAccount(body) {
    console.log("createDefaultAccount in repository", body);
    response = await this.api.post("account/createDefaultAccount", { body });
    return response;
  }
}
