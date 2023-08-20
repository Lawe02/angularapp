import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;

  constructor() { }

  checkAuthenticationStatusBool(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenExpiration = this.getTokenExpiration(token);
      const currentTime = new Date().getTime() / 1000;
      if (tokenExpiration && tokenExpiration > currentTime) {
        return true;
      } else {
        localStorage.removeItem('token');
        return false;
        }
    } else {
      return false;
    }
  }

  checkAuthenticationStatus(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenExpiration = this.getTokenExpiration(token);
      const currentTime = new Date().getTime() / 1000;
      if (tokenExpiration && tokenExpiration > currentTime) {
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
        localStorage.removeItem('token'); // Remove expired token
      }
    } else {
      this.isAuthenticated = false;
    }
  }


  isAuthenticatedbool(): boolean {
    return this.isAuthenticated;
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
}
