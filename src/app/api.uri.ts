import {environment} from '../environments/environment';

export class ApiUri {
  public static register: string = ApiUri.getBase() + '/register';
  public static login: string = ApiUri.getBase() + '/login';
  public static user: string = ApiUri.getBase() + '/user';

  public static wallet: string = ApiUri.getBase() + '/wallet';
  public static userWallets: string = ApiUri.wallet;
  public static addWallet: string = ApiUri.wallet + '/add';

  public static category: string = ApiUri.getBase() + '/category';
  public static addCategory: string = ApiUri.category + '/add';
  public static userCategories: string = ApiUri.category;

  public static transactionTypes: string = ApiUri.getBase() + '/transaction/types';
  public static userProfile: string = ApiUri.getBase() + '/profile';

  public static getBase(): string {
    return environment.baseApiUrl;
  }

  static addTransaction(walletId: bigint, categoryId: bigint) {
    return ApiUri.getBase() + '/wallet/' + walletId + '/category/' + categoryId + '/transaction/add';
  }

  static removeTransaction(walletId: bigint, transactionId: bigint): string {
    return ApiUri.wallet + '/' + walletId + '/transaction/remove/' + transactionId;
  }

  static getBorrowTransactions(walletId: bigint) {
    return ApiUri.wallet + '/' + walletId + '/borrow_transaction';
  }

  static getLoanTransaction(walletId: bigint) {
    return ApiUri.wallet + '/' + walletId + '/loan_transaction';
  }

  static removeCategory(id: bigint) {
    return ApiUri.category + '/remove/' + id;
  }

  static getWalletTransactions(walletId: bigint) {
    return ApiUri.wallet + '/' + walletId + '/transactions';
  }

  static getTransaction(walletId: bigint, transactionId: bigint) {
    return ApiUri.wallet + '/' + walletId + '/transaction/' + transactionId;
  }

  static editTransaction(walletId: bigint) {
    return ApiUri.wallet + '/' + walletId + '/transaction/edit';
  }
}
