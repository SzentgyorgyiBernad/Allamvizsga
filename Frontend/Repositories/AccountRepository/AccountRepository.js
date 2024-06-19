import BaseRepository from "../BaseRepository";

export default class AccountRepository extends BaseRepository {
  async getAllAccount(token) {
    response = await this.api.get("account/getAccounts", { token });
    return response;
  }

  async deleteMyAccount(body, token) {
    response = await this.api.delete("account/deleteAccount/" + body, {
      token,
    });
    return response;
  }
}
