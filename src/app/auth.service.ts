import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiUri} from './api.uri';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  email: string;
  private authenticated = false;
  private atLastOneAuth = false;

  constructor(private http: HttpClient) {
  }

  public isAuthenticated(): boolean {
    return this.authenticated;
  }

  authenticate(user, callback): void {
    if (localStorage.getItem('email') !== undefined && localStorage.getItem('email') !== null
      && localStorage.getItem('basicauth') !== undefined && localStorage.getItem('basicauth') !== null
      && user === undefined && this.atLastOneAuth) {
      this.authenticated = true;
      return;
    }
    const authString = user ? 'Basic ' + btoa(user.email + ':' + user.password) : '';
    this.http.get(ApiUri.user, {
      headers: {Authorization: authString}
    }).subscribe(response => {
      try {
        response['name'];
      } catch (e) {
        return undefined;
      }
      if (response['name'] !== null) {
        if (user !== undefined) {
          this.atLastOneAuth = true;
          localStorage.setItem('email', user.email);
          localStorage.setItem('basicauth', authString);
        }
        this.authenticated = true;
        return callback && callback();
      }
      return undefined;
    }, error => {
      this.authenticated = false;
    });
  }

  logout(): void {
    localStorage.clear();
    this.authenticated = false;
  }

  getEmail() {
    return localStorage.getItem('email');
  }
}
