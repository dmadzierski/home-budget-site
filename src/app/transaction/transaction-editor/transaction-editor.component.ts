import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TransactionHttpService} from '../transaction.http.service';
import {Transaction} from '../../models/transaction.model';

@Component({
  selector: 'app-transaction-editor',
  templateUrl: './transaction-editor.component.html',
  styleUrls: ['./transaction-editor.component.css']
})
export class TransactionEditorComponent implements OnInit {
  transaction: Transaction;
  error: any;
  dateOfPurchase: string;
  private transactionId: bigint;
  private walletId: bigint;

  constructor(private activatedRoute: ActivatedRoute, private transactionHttpService: TransactionHttpService) {
    this.activatedRoute
      .queryParams
      .subscribe(params => {
        this.walletId = params['walletId'];
        this.transactionId = params['transactionId'];
      });
    this.initTransactions();
  }

  initTransactions() {
    this.transactionHttpService.getTransaction(this.walletId, this.transactionId).subscribe(success => {
      this.transaction = new Transaction().fromJSON(success);
      this.dateOfPurchase = success['dateOfPurchase'].substring(0, 16);
    }, error => {
    });
  }

  ngOnInit(): void {
  }

  editTransaction() {
    this.transaction.dateOfPurchase = this.dateOfPurchase + ':00.000000';
    this.transactionHttpService.edit(this.transaction, this.walletId).subscribe(success => {
      this.transaction = new Transaction().fromJSON(success);
      this.dateOfPurchase = success['dateOfPurchase'].substring(0, 16);
    }, error => {
      this.error = error.error.errors;
    });
  }
}
