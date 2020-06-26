import {environment} from '../environments/environment';
import {TransactionStatisticsAndPagingAndSorting} from './models/transaction.model';

export class ApiUri {
  public static register: string = ApiUri.getBase() + '/register';
  public static login: string = ApiUri.getBase() + '/login';
  public static user: string = ApiUri.getBase() + '/user';

  public static wallet: string = ApiUri.getBase() + '/wallet';
  public static userWallets: string = ApiUri.wallet;
  public static addWallet: string = ApiUri.wallet + '/add';
  public static editWallet: string = ApiUri.wallet + '/edit';

  public static category: string = ApiUri.getBase() + '/category';
  public static addCategory: string = ApiUri.category + '/add';
  public static userCategories: string = ApiUri.category;

  public static transactionTypes: string = ApiUri.getBase() + '/transaction/types';
  public static userProfile: string = ApiUri.getBase() + '/profile';
  static restoreDefaultCategories: string = ApiUri.category + '/restoreDefaultCategories';
  static setFavoriteWallet: string = ApiUri.user + '/setFavoriteWallet';

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
    return ApiUri.wallet + '/' + walletId + '/transactions?transactionType=BORROW&isFinished=false';
  }

  static getLoanTransaction(walletId: bigint) {
    return ApiUri.wallet + '/' + walletId + '/transactions?transactionType=LOAN&isFinished=false';
  }

  static removeCategory(id: bigint) {
    return ApiUri.category + '/remove/' + id;
  }

  static getWalletTransactions(transactionSaPaS: TransactionStatisticsAndPagingAndSorting) {
    let link = ApiUri.wallet + '/' + transactionSaPaS.walletId + '/transactions';

    let linkHasAnyParam = false;
    if (transactionSaPaS.pageSize) {
      link = this.getLinkWithParam(link, 'size', transactionSaPaS.pageSize, linkHasAnyParam);
      linkHasAnyParam = true;
    }
    if (transactionSaPaS.pageIndex) {
      link = this.getLinkWithParam(link, 'page', transactionSaPaS.pageIndex, linkHasAnyParam);
      linkHasAnyParam = true;
    }
    if (transactionSaPaS.minPrice) {
      link = this.getLinkWithParam(link, 'minPrice', transactionSaPaS.minPrice, linkHasAnyParam);
      linkHasAnyParam = true;
    }
    if (transactionSaPaS.maxPrice) {
      link = this.getLinkWithParam(link, 'maxPrice', transactionSaPaS.maxPrice, linkHasAnyParam);
      linkHasAnyParam = true;
    }
    if (transactionSaPaS.sortBy && transactionSaPaS.sortDirection) {
      link = this.getLinkWithParam(link, 'sort', transactionSaPaS.sortBy + ',' + transactionSaPaS.sortDirection, linkHasAnyParam);
      linkHasAnyParam = true;
    }
    if (transactionSaPaS.dateOfPurchaseStart) {
      link = this.getLinkWithParam(link, 'start', transactionSaPaS.dateOfPurchaseStart + 'T00:00:00', linkHasAnyParam);
      linkHasAnyParam = true;
    }
    if (transactionSaPaS.dateOfPurchaseEnd) {
      link = this.getLinkWithParam(link, 'end', transactionSaPaS.dateOfPurchaseEnd + 'T23:59:59', linkHasAnyParam);
      linkHasAnyParam = true;
    }
    if (transactionSaPaS.transactionType) {
      link = this.getLinkWithParam(link, 'transactionType', transactionSaPaS.transactionType, linkHasAnyParam);
      linkHasAnyParam = true;
    }

    return link;
  }

  static getTransaction(walletId: bigint, transactionId: bigint) {
    return ApiUri.wallet + '/' + walletId + '/transaction/' + transactionId;
  }

  static editTransaction(walletId: bigint) {
    return ApiUri.wallet + '/' + walletId + '/transaction/edit';
  }

  public static switchTransactionIsFinished(walletId: bigint, transactionId: bigint) {
    return ApiUri.wallet + '/' + walletId + '/transaction/switchIsFinished/' + transactionId;
  }

  private static getLinkWithParam(link: string, param: string, paramValue: any, linkHasAnyParam: boolean): string {
    return link + (linkHasAnyParam ? '&' : '?') + param + '=' + paramValue;
  }
}
