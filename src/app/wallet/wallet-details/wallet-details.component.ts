import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {WalletHttpService} from '../wallet.http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Wallet} from '../../models/wallet.model';
import {TransactionStatisticsAndPagingAndSorting} from '../../models/transaction.model';
import {TransactionHttpService} from '../../transaction/transaction.http.service';

@Component({
  selector: 'app-wallet-details',
  templateUrl: './wallet-details.component.html',
  styleUrls: ['./wallet-details.component.css']
})
export class WalletDetailsComponent implements OnInit, OnChanges {


  public wallet: Wallet;
  walletId: bigint;
  transactionSaPaS = new TransactionStatisticsAndPagingAndSorting();

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private walletHttpService: WalletHttpService,
              private transactionHttpService: TransactionHttpService) {
    this.initTransactionTypes();
    this.initDefaultTransactionSaPaS();
    this.activatedRoute
      .queryParams
      .subscribe(params => {
        if (isNaN(Number(params['walletId']))) {
          router.navigateByUrl('/wallet');
        } else {
          this.walletId = params['walletId'];
          this.transactionSaPaS.walletId = this.walletId;
          this.initWallet();
        }
      });
  }

  transactionTypes: Array<string>;

  initTransactionTypes() {
    this.transactionHttpService.getTypes().subscribe((success: Array<string>) => {
      this.transactionTypes = success;
    }, error => {
    });
  }

  ngOnInit(): void {
    this.initDefaultTransactionSaPaS();
  }

  addTransaction() {
    this.router.navigateByUrl('/transaction/add?walletId=' + this.walletId);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('coś się zmieniło w parencie');
    this.initWallet();
  }

  initWallet() {
    this.walletHttpService.getWalletWithDetails(this.walletId).subscribe(success => {
      this.wallet = success;
    });
  }


  editWallet() {
    this.router.navigateByUrl('/wallet/edit?walletId=' + this.walletId);
  }

  refreshTransactions() {
    const tmpTransactionSaPaS = new TransactionStatisticsAndPagingAndSorting();
    tmpTransactionSaPaS.walletId = this.transactionSaPaS.walletId;
    tmpTransactionSaPaS.sortBy = this.transactionSaPaS.sortBy;
    tmpTransactionSaPaS.sortDirection = this.transactionSaPaS.sortDirection;
    tmpTransactionSaPaS.pageSize = this.transactionSaPaS.pageSize;
    tmpTransactionSaPaS.pageIndex = this.transactionSaPaS.pageIndex;
    tmpTransactionSaPaS.minPrice = this.transactionSaPaS.minPrice;
    tmpTransactionSaPaS.maxPrice = this.transactionSaPaS.maxPrice;
    tmpTransactionSaPaS.dateOfPurchaseStart = this.transactionSaPaS.dateOfPurchaseStart;
    tmpTransactionSaPaS.dateOfPurchaseEnd = this.transactionSaPaS.dateOfPurchaseEnd;
    tmpTransactionSaPaS.transactionType = this.transactionSaPaS.transactionType;
    this.transactionSaPaS = tmpTransactionSaPaS;
  }

  nextPage() {
    this.transactionSaPaS.pageIndex++;
    this.refreshTransactions();
  }

  previousPage() {
    if (this.transactionSaPaS.pageIndex > 0) {
      this.transactionSaPaS.pageIndex--;
      this.refreshTransactions();
    }
  }

  private initDefaultTransactionSaPaS(): void {
    this.transactionSaPaS.walletId = this.walletId;
    this.transactionSaPaS.sortBy = 'dateOfPurchase';
    this.transactionSaPaS.sortDirection = 'desc';
    this.transactionSaPaS.pageSize = 9;
    this.transactionSaPaS.pageIndex = 0;
    this.transactionSaPaS.transactionType = undefined;
  }

  removeWallet() {
    this.router.navigateByUrl('/wallet/remove?walletId=' + this.walletId);
  }

}
