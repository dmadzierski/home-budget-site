import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiUri} from '../api.uri';

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {

  constructor(private http: HttpClient) {
  }

  userProfile() {
    return this.http.get(ApiUri.userProfile);
  }

  setFavoriteWallet(walletId: bigint) {
    return this.http.post(ApiUri.setFavoriteWallet, walletId);
  }
}
