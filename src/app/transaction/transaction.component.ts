import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Transaction, TransactionStatisticsAndPagingAndSorting} from '../models/transaction.model';
import {TransactionHttpService} from './transaction.http.service';
import {Router} from '@angular/router';

@Component({
  selector: 'transactions-viewer',
  templateUrl: './transaction.component.html'
})
export class TransactionComponent implements OnChanges {

  transactions: Array<Transaction>;
  @Input()
  transactionSaPaS: TransactionStatisticsAndPagingAndSorting;
  @Output()
  updateWallet = new EventEmitter<boolean>();
  private lastPageSize;

  constructor(private transactionHttpService: TransactionHttpService, private router: Router) {
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.initWalletTransactions();
  }

  editTransaction(transactionId: bigint) {
    this.router.navigateByUrl('/transaction/edit?walletId=' + this.transactionSaPaS.walletId + '&transactionId=' + transactionId);
  }

  initWalletTransactions() {
    if (this.lastPageSize !== this.transactionSaPaS.pageSize) {
      this.transactionSaPaS.pageIndex = 0;
    }
    this.transactionHttpService.getWalletTransactions(this.transactionSaPaS).subscribe((success: Array<Transaction>) => {
      if (success.length > 0) {
        this.transactions = success;
        this.lastPageSize = this.transactionSaPaS.pageSize;
      } else {
        this.transactionSaPaS.pageIndex--;
      }
    }, error => {
    });
  }

  removeTransaction(transactionId: bigint): void {
    this.transactionHttpService.removeTransaction(this.transactionSaPaS.walletId, transactionId).subscribe(success => {
      this.transactions = this.transactions.filter(transaction => transaction.id !== transactionId);
      this.updateWallet.emit(true);
    }, error => {
    });

  }

  switchFinished(transactionId: bigint) {
    this.transactionHttpService.switchIsFinished(this.transactionSaPaS.walletId, transactionId).subscribe((success: Transaction) => {
      for (const i in this.transactions) {
        if (this.transactions[i].id === transactionId) {
          this.transactions[i] = success;
        }
      }
    });
  }

  isLoanOrBorrow(transaction: Transaction) {
    return transaction.category.transactionType === 'BORROW' || transaction.category.transactionType === 'LOAN';
  }
}
