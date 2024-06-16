import BaseRepository from "../BaseRepository";

export default class AccountRepository extends BaseRepository {
  async getAllAccount(token) {
    // console.log("AccountRep getAllAccount", body);
    response = await this.api.get("account/getAccounts", { token });
    // console.log("AccountRep getAccounts", JSON.stringify(response));
    return response;
  }
}
