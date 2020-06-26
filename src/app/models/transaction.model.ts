import {Category} from './category.model';
import {Serializable} from './Serilizable';

export class Transaction extends Serializable {
  public id: bigint;
  public name: string;
  public description: string;
  public price: bigint;
  public category: Category;
  public dateOfPurchase: string;
  public transactionIdReference: bigint;
  public isFinished: boolean;
}

export class TransactionStatisticsAndPagingAndSorting {
  public pageSize: number;
  public pageIndex: number;
  public sortBy: string;
  public sortDirection: string;
  public transactionType: string;
  public dateOfPurchaseStart: string;
  public dateOfPurchaseEnd: string;
  public minPrice: number;
  public maxPrice: number;
  public walletId: bigint;
}
