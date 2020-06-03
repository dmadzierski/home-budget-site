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

  emailErrors: Array<string> = new Array<string>();
  passwordErrors: Array<string> = new Array<string>();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private userHttpService: UserHttpService) {
  }

  ngOnInit(): void {
  }

  login() {
    this.authService.authenticate(this.user, () => {
      this.userHttpService.getUser().subscribe(success => {
          this.router.navigateByUrl('/wallet/details?id=' + success['favoriteWalletId']);
        }, error => {
          this.router.navigateByUrl('/');
        }
      );
    });
    return false;
  }
}
