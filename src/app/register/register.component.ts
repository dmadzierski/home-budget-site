import {Component} from '@angular/core';
import {RegisterHttpService} from './register.http.service';
import {Router} from '@angular/router';
import {User} from '../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  user = {} as User;
  errors: any;
  repeatPassword = '';

  constructor(private registerHttpService: RegisterHttpService, private router: Router) {
  }

  registerUser() {
    // if (this.user.password === this.repeatPassword) {
      this.registerHttpService.registerUser(this.user).subscribe(post => {
        this.router.navigate(['/login']);
      }, error => {
        this.errors = error.error?.errors;
      });
    // } else {
    //   this.errors = {password: ['Password are not the same']};
    // }
  }
}
