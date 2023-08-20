import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'https://localhost:7279'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  getBooks(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/Crud`, { headers });
  }

  createBook(book: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.apiUrl}/Crud/Create`, book, { headers });
  }

  updateBook(book: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${this.apiUrl}/Crud/Update`, book, { headers });
  }

  deleteBook(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.apiUrl}/Crud/Delete?id=${id}`, { headers });
  }

  private getHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}` 
    });
  }
}
