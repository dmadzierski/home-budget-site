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
  public static getUser: string = ApiUri.getBase() + '/getUser';

  public static getBase(): string {
    return environment.baseApiUrl;
  }

  static addTransaction(walletId: bigint, categoryId: bigint) {
    return ApiUri.getBase() + '/wallet/' + walletId + '/category/' + categoryId + '/transaction/add';
  }
}
