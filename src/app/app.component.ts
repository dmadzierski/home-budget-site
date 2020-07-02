import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  private protectedRoutes: Array<string> = [
    '/wallet',
    '/category',
    '/user',
    '/transaction'
  ];

  constructor(private router: Router, private authService: AuthService) {
  }

  userHasAccess() {
    const routerUrl = this.router.routerState.snapshot.url;
    if (this.isProtectedRouter(routerUrl) && !this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/');
    } else {
      return true;
    }
  }

  private isProtectedRouter(routerUrl: string): boolean {
    return this.protectedRoutes.some(k => routerUrl.match(k));
  }
}
