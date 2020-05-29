import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiUri} from '../api.uri';
import {Transaction} from '../models/transaction.model';

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
}
