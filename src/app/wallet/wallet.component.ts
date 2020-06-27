import {Component, OnInit} from '@angular/core';
import {Wallet} from '../models/wallet.model';
import {WalletHttpService} from './wallet.http.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {UserHttpService} from '../user/user.http.service';

@Component({
  selector: 'app-wallet-creator',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  wallets: Array<Wallet> = new Array<Wallet>();
  favoriteWalletId: bigint;

  constructor(private http: HttpClient, private walletHttpService: WalletHttpService, private router: Router,
              private userHttpService: UserHttpService) {
    this.initWallets();
    this.initFavoriteWalletId();
  }


  initWallets(): void {
    this.walletHttpService.getWallets().subscribe(success => {
      this.wallets = success;
    }, error => {
    });
  }

  ngOnInit(): void {
  }

  showWalletsDetails(id: bigint) {
    this.router.navigateByUrl('/wallet/details?walletId=' + id);
  }

  changeFavoriteWallet(walletId: bigint) {
    if (walletId === this.favoriteWalletId) {
      this.userHttpService.setFavoriteWallet(null).subscribe(success => {
        this.favoriteWalletId = null;
      });
    } else {
      this.userHttpService.setFavoriteWallet(walletId).subscribe(success => {
        this.favoriteWalletId = walletId;
      });
    }
  }

  private initFavoriteWalletId() {
    this.userHttpService.userProfile().subscribe(success => {
      this.favoriteWalletId = success['favoriteWalletId'];
    });
  }

  goAddWallet() {
    this.router.navigateByUrl('/wallet/add');
  }
}
