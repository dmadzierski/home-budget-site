import {Component, OnChanges, OnInit} from '@angular/core';
import {WalletHttpService} from '../wallet.http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Wallet} from '../../models/wallet.model';

@Component({
  selector: 'app-wallet-details',
  templateUrl: './wallet-details.component.html',
  styleUrls: ['./wallet-details.component.css']
})
export class WalletDetailsComponent implements OnInit, OnChanges {

  public wallet: Wallet;
  walletId: bigint;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private walletHttpService: WalletHttpService) {
    this.activatedRoute
      .queryParams
      .subscribe(params => {
        this.walletId = params['walletId'];
      });
    this.initWallet();
  }

  ngOnInit(): void {
  }

  addTransaction() {
    this.router.navigateByUrl('/transaction/add?walletId=' + this.walletId);
  }

  ngOnChanges(): void {
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
}
