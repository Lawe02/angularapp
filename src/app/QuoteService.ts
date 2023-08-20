import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  private apiUrl = 'https://localhost:7279';

  constructor(private http: HttpClient) { }

  getQuotes(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/Crud/GetQuotes`, { headers });
  }

  addQuote(quote: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.apiUrl}/Crud/AddQuote`,quote, { headers })
  }

  deleteQuote(id: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.apiUrl}/Crud/DeleteQuote?id=${id}`, { headers });
  }

  private getHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
  }
}
