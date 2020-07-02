import {Component} from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent {


  constructor(private auth: AuthService) {
    auth.authenticate(undefined, undefined);
  }

  isAuth() {
    return this.auth.isAuthenticated();
  }


  getEmail(): string {
    return this.auth.getEmail();
  }

  logout(): void {
    this.auth.logout();
  }
}
