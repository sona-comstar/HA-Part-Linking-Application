import { Component } from '@angular/core';
import {Router} from "@angular/router";


@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.component.css'
})
export class LoginComponentComponent {
  email: string = '';
  password: string = '';
  uemail = 'sona'
  upassword = 'Sona@123'

  constructor(private router: Router) {
  }
  onLogin() {
    if (this.email === this.uemail && this.password === this.upassword) {
      console.log('Login Successful:', { email: this.email, password: this.password });
      sessionStorage.setItem('isLoggedIn', 'true'); // Set logged-in flag
      this.router.navigate(['add-customer']); // Redirect to homepage
    } else {
      alert('Invalid UserName or Password');
    }
  }
}
