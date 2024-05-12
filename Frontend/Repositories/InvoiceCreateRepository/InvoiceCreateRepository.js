import BaseRepository from "../BaseRepository";

export default class AuthRepository extends BaseRepository {
  async getAllCurrency(body) {
    response = await this.api.get("currency/allCurrency", { body });
    return response;
  }
}
