import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WalletHttpService} from '../wallet.http.service';
import {Wallet} from '../../models/wallet.model';

@Component({
  selector: 'app-wallet-editor',
  templateUrl: './wallet-editor.component.html',
  styleUrls: ['./wallet-editor.component.css']
})
export class WalletEditorComponent implements OnInit {

  walletId: bigint;
  wallet: Wallet;
  error: any;

  constructor(private activatedRoute: ActivatedRoute, private walletHttpService: WalletHttpService,
              private router: Router) {
    this.activatedRoute
      .queryParams
      .subscribe(params => {
        this.walletId = params['walletId'];
      });
    this.initWallet();
  }

  ngOnInit(): void {
  }

  initWallet() {
    this.walletHttpService.getWalletWithDetails(this.walletId).subscribe(success => {
      this.wallet = success;
    });
  }

  editWallet() {
    this.walletHttpService.editWallet(this.wallet).subscribe((success: Wallet) => {
        this.wallet = success;
        this.router.navigateByUrl('/wallet/details?walletId=' + this.walletId);
      }, error => {
        this.error = error.error.errors;
        console.log(this.error);
      }
    );
  }
}
