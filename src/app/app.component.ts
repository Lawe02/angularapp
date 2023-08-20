import { Component, OnInit } from '@angular/core';
import { ThemeService } from './themeService';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public isAuthenticated: boolean = false;
  isDarkTheme: boolean | undefined;
  title: string = 'Welcome to angularapp!';

  constructor(private themeService: ThemeService, private authService: AuthService) { }

  ngOnInit() {
    this.authService.checkAuthenticationStatus();
    setInterval(() => this.authService.checkAuthenticationStatus(), 60000);
    this.themeService.isDarkTheme$.subscribe(isDarkTheme => {
      this.isDarkTheme = isDarkTheme;
    });
  }

  private getTokenExpiration(token: string): number | null {
    try {
      const tokenParts = token.split('.');
      if (tokenParts.length === 3) {
        const payload = JSON.parse(atob(tokenParts[1]));
        return payload.exp;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  checkAuthenticationStatusBool(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenExpiration = this.getTokenExpiration(token);
      const currentTime = new Date().getTime() / 1000;
      if (tokenExpiration && tokenExpiration > currentTime) {
        return true;
      } else {
        localStorage.removeItem('token');
        return false; // Remove expired token
      }
    } else {
      return false;
    }
  }


  toggleTheme() {
    this.themeService.toggleTheme();
  }

  login() {
    // Call your login service here and handle successful login
    // After successful login, set isAuthenticated to true
    this.isAuthenticated = true;
    // this.loadForecasts();
  }
}
