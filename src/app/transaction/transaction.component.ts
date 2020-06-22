import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Transaction} from '../models/transaction.model';
import {TransactionHttpService} from './transaction.http.service';
import {Router} from '@angular/router';

@Component({
  selector: 'transactions-viewer',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  @Input()
  transactions: Array<Transaction>;
  @Input()
  walletId: bigint;

  @Output()
  updateWallet = new EventEmitter<boolean>();

  constructor(private transactionHttpService: TransactionHttpService, private router: Router) {
    this.transactions = new Array<Transaction>();
  }

  ngOnInit(): void {
    this.initWalletTransactions();
  }

  editTransaction(transactionId: bigint) {
    this.router.navigateByUrl('/transaction/edit?walletId=' + this.walletId + '&transactionId=' + transactionId);
  }

  initWalletTransactions() {
    this.transactionHttpService.getWalletTransactions(this.walletId).subscribe((success: Array<Transaction>) => {
      this.transactions = success;
    }, error => {
    });
  }

  removeTransaction(transactionId: bigint): void {
    this.transactionHttpService.removeTransaction(this.walletId, transactionId).subscribe(success => {
      this.transactions = this.transactions.filter(transaction => transaction.id !== transactionId);
      this.updateWallet.emit(true);
    }, error => {
    });

  }

  switchFinished(transactionId: bigint) {
    this.transactionHttpService.switchIsFinished(this.walletId, transactionId).subscribe((success: Transaction) => {
      for (let i in this.transactions) {
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
