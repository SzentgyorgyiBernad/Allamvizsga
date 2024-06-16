import AuthRepository from "../Repositories/Auth/AuthRepository";
import AccountCreateRepository from "../Repositories/AccountCreateRepository/AccountCreateRepository";
import AccountRepository from "../Repositories/AccountRepository/AccountRepository";
import TransactionRepository from "../Repositories/Transactions/TransactionRepository";
import IncomeRepository from "../Repositories/IncomeRepository/IncomeRepository";
import ExpenditureRepository from "../Repositories/ExpenditureRepository/ExpenditureRepository";

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
  accountCreateRepository = new AccountCreateRepository();
  accountRepository = new AccountRepository();
  transactionRepository = new TransactionRepository();
  incomeRepository = new IncomeRepository();
  expenditureRepository = new ExpenditureRepository();
}
