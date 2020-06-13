import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../models/user.model';
import {AuthService} from '../auth.service';
import {UserHttpService} from '../user/user.http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();

  errors: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private userHttpService: UserHttpService) {
  }

  ngOnInit(): void {
  }

  login() {
    this.authService.authenticate(this.user, () => {
      this.userHttpService.userProfile().subscribe(success => {
          this.router.navigateByUrl('/wallet/details?id=' + success['favoriteWalletId']);
        }
      );
    });
    if (this.authService.isAuthenticated() && this.user.password?.length > 0 && this.user.email?.length > 0) {
      this.errors = {email: ['Incompatibile user or password or both']};
    }
    return false;
  }
}
