import AuthRepository from "../Repositories/Auth/AuthRepository";
import InvoiceCreateRepository from "../Repositories/InvoiceCreateRepository/InvoiceCreateRepository";

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
  invoiceCreateRepository = new InvoiceCreateRepository();
}
