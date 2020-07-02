import {Category} from './category.model';
import {Serializable} from './Serilizable';

export class Transaction extends Serializable {
  id: bigint;
  name: string;
  description: string;
  price: bigint;
  category: Category;
  dateOfPurchase: string;
  transactionIdReference: bigint;
  isFinished: boolean;
}

export class TransactionStatisticsAndPagingAndSorting {
  pageSize: number;
  pageIndex: number;
  sortBy: string;
  sortDirection: string;
  transactionType: string;
  dateOfPurchaseStart: string;
  dateOfPurchaseEnd: string;
  minPrice: number;
  maxPrice: number;
  walletId: bigint;
}
