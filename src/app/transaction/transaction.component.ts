import {Component, Input, OnInit} from '@angular/core';
import {Transaction} from '../models/transaction.model';
import {TransactionHttpService} from './transaction.http.service';

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

  constructor(private transactionHttpService: TransactionHttpService) {
    this.transactions = new Array<Transaction>();
  }

  ngOnInit(): void {
  }

  editTransaction(id: bigint) {

  }

  removeTransaction(transactionId: bigint): void {
    this.transactionHttpService.removeTransaction(this.walletId, transactionId).subscribe(success => {
      console.log(success);
    }, error => {
      console.log(error);
    });

  }
}
