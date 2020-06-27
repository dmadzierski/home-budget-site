import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Wallet} from '../../models/wallet.model';
import {WalletHttpService} from '../wallet.http.service';

@Component({
  selector: 'app-wallet-remover',
  templateUrl: './wallet-remover.component.html',
  styleUrls: ['./wallet-remover.component.css']
})
export class WalletRemoverComponent implements OnInit {

  private walletId: bigint;
  walletName = '';
  wallet: Wallet;
  errors: any;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private walletHttpService: WalletHttpService) {
    this.activatedRoute
      .queryParams
      .subscribe(params => {
        if (isNaN(Number(params['walletId']))) {
          router.navigateByUrl('/wallet');
        } else {
          this.walletId = params['walletId'];
          this.initWallet();
        }
      });
  }

  ngOnInit(): void {
  }

  initWallet() {
    this.walletHttpService.getWalletWithDetails(this.walletId).subscribe(success => {
      this.wallet = success;
    });
  }

  removeWallet() {
    if (this.walletName === this.wallet.name) {
      this.walletHttpService.remove(this.wallet.id).subscribe(success => {
        this.router.navigateByUrl('/wallet');
      });
    } else {
      this.errors = {name: ['Wrong wallet name']};
    }
  }
}
