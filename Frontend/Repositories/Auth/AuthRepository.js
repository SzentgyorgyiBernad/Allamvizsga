import BaseRepository from "../BaseRepository";

export default class AuthRepository extends BaseRepository {
  async login(body) {
    return await this.api.post("auth/login", { body });
  }

  async register(body) {
    return await this.api.post("auth/register", { body });
  }

  async logout(body) {
    return await this.api.post("/logout", { body });
  }
}
