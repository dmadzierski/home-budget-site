import {Component, Input, OnInit} from '@angular/core';
import {Transaction} from '../models/transaction.model';

@Component({
  selector: 'transactions-viewer',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  @Input()
  transactions: Array<Transaction>;

  constructor() {
    this.transactions = new Array<Transaction>();
  }

  ngOnInit(): void {
  }
}
