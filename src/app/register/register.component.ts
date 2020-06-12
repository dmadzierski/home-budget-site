import {Component, OnInit} from '@angular/core';
import {RegisterHttpService} from './register.http.service';
import {Router} from '@angular/router';
import {User} from '../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  errors: any;
  repeatPassoword: string = '';

  constructor(private registerHttpService: RegisterHttpService, private router: Router) {
  }

  ngOnInit(): void {
  }


  registerUser() {
    if (this.user.password === this.repeatPassoword) {
      this.registerHttpService.registerUser(this.user).subscribe(post => {
        this.router.navigate(['/login']);
      }, error => {
        this.errors = error.error.errors;
        console.log(this.errors);
      });
    } else {
      this.errors = {password: ['Password are not the same']};
      console.log('elo');
    }
  }
}
