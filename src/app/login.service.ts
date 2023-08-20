import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'https://localhost:7279/api'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    const credentials = { username, password };
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }
}
