import {Component, OnInit} from '@angular/core';
import {Transaction} from '../../models/transaction.model';
import {TransactionHttpService} from '../transaction.http.service';
import {ActivatedRoute} from '@angular/router';
import {Category} from '../../models/category.model';
import {CategoryHttpService} from '../../category/category.http.service';

@Component({
  selector: 'app-transaction-creator',
  templateUrl: './transaction-creator.component.html',
  styleUrls: ['./transaction-creator.component.css']
})
export class TransactionCreatorComponent implements OnInit {

  loanOrBorrowTransactions: Array<Transaction>;
  error: any;
  transaction: Transaction = new Transaction();
  categoryId: bigint;
  walletId: bigint;
  categories: Array<Category> = new Array<Category>();
  userChooseTransactionBack: boolean;

  constructor(private transactionHttpService: TransactionHttpService,
              private activatedRoute: ActivatedRoute,
              private categoryHttpService: CategoryHttpService) {
    this.activatedRoute
      .queryParams
      .subscribe(params => {
        this.walletId = params['id'];
      });
    this.initUserCategories();
  }

  ngOnInit(): void {
  }

  initUserCategories() {
    this.categoryHttpService.getUserCategories().subscribe(success => {
        this.categoryId = success[0]['id'];
        this.categories = success;
      }
      , error => {
      });
  }

  addTransaction() {
    if (!this.userChooseTransactionBack) {
      this.transaction.transactionIdReference = null;
    }
    this.transactionHttpService.save(this.transaction, this.walletId, this.categoryId).subscribe(success => {
      this.error = null;
    }, error => {
      this.error = error.error.errors;
    });
  }

  initLoanTransaction() {
    this.transactionHttpService.getLoanTransaction(this.walletId).subscribe((success: Array<Transaction>) => {
      if (success.length > 0) {
        this.transaction.transactionIdReference = success[0]['id'];
        this.loanOrBorrowTransactions = success;
      }
    }, error => {
    });
  }

  initBorrowTransaction() {
    this.transactionHttpService.getBorrowTransaction(this.walletId).subscribe((success: Array<Transaction>) => {
      if (success.length > 0) {
        this.transaction.transactionIdReference = success[0]['id'];
        this.loanOrBorrowTransactions = success;
      }
    }, error => {
    });
  }

  setUserChooseTransactionBack(): void {
    const tmpCategories: Array<Category> = this.categories;
    switch (tmpCategories.filter(c => c.id == this.categoryId).map(category => category.transactionType)[0]) {
      case 'LOAN_BACK': {
        this.initLoanTransaction();
        this.userChooseTransactionBack = true;
        break;
      }
      case 'BORROW_BACK': {
        this.initBorrowTransaction();
        this.userChooseTransactionBack = true;
        break;
      }
      default: {
        this.clearLoanOrBorrowTransactions();
        this.userChooseTransactionBack = false;
      }
    }
  }

  private clearLoanOrBorrowTransactions() {
    this.loanOrBorrowTransactions = new Array<Transaction>();
  }


}
