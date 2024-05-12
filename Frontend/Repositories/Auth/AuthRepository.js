import BaseRepository from "../BaseRepository";

export default class AuthRepository extends BaseRepository {
  async login(body) {
    // console.log("AuthRep login", body);
    response = await this.api.post("auth/login", { body });
    return response;
  }

  async register(body) {
    response = await this.api.post("auth/register", { body });
    return response;
  }

  async logout(body) {
    return await this.api.post("/logout", { body });
  }
}
