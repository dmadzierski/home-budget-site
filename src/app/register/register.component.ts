import {Component, OnInit} from '@angular/core';
import {RegisterHttpService} from './register.http.service';
import {Router} from '@angular/router';
import {User} from '../models/user.model';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  errors: any;
  repeatPassword = '';

  constructor(private registerHttpService: RegisterHttpService, private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
  }


  registerUser() {
    if (this.user.password === this.repeatPassword) {
      this.registerHttpService.registerUser(this.user).subscribe(post => {
        this.router.navigate(['/login']);
      }, error => {
        this.errors = error.error?.errors;
      });
    } else {
      this.errors = {password: ['Password are not the same']};
    }
  }
}
