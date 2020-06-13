import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiUri} from '../api.uri';
import {Transaction} from '../models/transaction.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionHttpService {

  constructor(private http: HttpClient) {
  }

  public getTypes() {
    return this.http.get(ApiUri.transactionTypes);
  }

  save(transaction: Transaction, walletId: bigint, categoryId: bigint) {
    return this.http.put(ApiUri.addTransaction(walletId, categoryId), transaction);
  }

  removeTransaction(walletId: bigint, transactionId: bigint): Observable<any> {
    return this.http.delete(ApiUri.removeTransaction(walletId, transactionId));
  }


  getBorrowTransaction(walletId: bigint) {
    return this.http.get(ApiUri.getBorrowTransactions(walletId));
  }

  getLoanTransaction(walletId: bigint) {
    return this.http.get(ApiUri.getLoanTransaction(walletId));
  }

  getWalletTransactions(walletId: bigint) {
    return this.http.get(ApiUri.getWalletTransactions(walletId));
  }
}
