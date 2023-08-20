import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { ThemeService } from '../themeService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  isDarkTheme: boolean = false;

  constructor(private loginService: LoginService, private router: Router, private themeService: ThemeService) { }

  ngOnInit() {
    this.themeService.isDarkTheme$.subscribe(isDarkTheme => {
      this.isDarkTheme = isDarkTheme;
    });
  }

  onSubmit() {
    this.loginService.login(this.username, this.password).subscribe(
      response => {
        // Assuming the API returns a JWT token upon successful login
        const token = response.token;
        localStorage.setItem('token', token);
        // You can navigate to a protected route here if needed
        window.location.href = '/';
      },
      error => {
        console.error('Login failed', error);
      }
    );
  }
}
