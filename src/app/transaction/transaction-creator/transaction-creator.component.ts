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

  error: any;
  transaction: Transaction = new Transaction();
  categoryId: bigint;
  walletId: bigint;
  categories: Array<Category> = new Array<Category>();

  constructor(private transactionHttpService: TransactionHttpService,
              private activatedRoute: ActivatedRoute,
              private categoryHttpService: CategoryHttpService) {
    this.activatedRoute
      .queryParams
      .subscribe(params => {
        this.walletId = params['id'];
      });
  }

  ngOnInit(): void {
    this.initUserCategories();
    ;
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
    console.log(this.transaction);
    this.transactionHttpService.save(this.transaction, this.walletId, this.categoryId).subscribe(success => {
    }, error => {
      console.log(error);
      this.error = error.error.errors;
    });

  }
}
