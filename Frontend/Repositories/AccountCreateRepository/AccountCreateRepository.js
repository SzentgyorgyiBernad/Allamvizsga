import BaseRepository from "../BaseRepository";

export default class AccountCreateRepository extends BaseRepository {
  async getAllCurrency(token) {
    // console.log("getAllCurrency in repository aaaaaaaaaaaaaaaaaaa", token);
    response = await this.api.get("currency/allCurrency", { token });
    // console.log("response from repo", response);
    return response;
  }
  async createDefaultAccount(body) {
    // console.log("createDefaultAccount in repository", body);
    response = await this.api.post("account/createDefaultAccount", { body });
    return response;
  }
}
