import AuthRepository from "../Repositories/Auth/AuthRepository";

export default class RepositoryService {
  static instance;

  constructor() {
    if (RepositoryService.instance) {
      return RepositoryService.instance;
    } else {
      RepositoryService.instance = this;
      return this;
    }
  }

  authRepository = new AuthRepository();
}
