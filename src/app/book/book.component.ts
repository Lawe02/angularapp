import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { AppComponent } from '../app.component';
import { ThemeService } from '../themeService';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  books: any[] = [];
  isUpdateFormVisible: boolean = false;
  isAddFormVisible: boolean = false;
  selectedBook: any = {}; // Store the selected book for update
  isDarkTheme: boolean = false;
  isAuthenticated: boolean = false;


  newBook: any = {
    title: '',
    author: '',
    publicityDate: ''
  };

  constructor(private bookService: BookService, private themeService: ThemeService, private appService: AppComponent) { }

  ngOnInit() {
    this.themeService.isDarkTheme$.subscribe(isDarkTheme => {
      this.isDarkTheme = isDarkTheme;
    });
    this.getBooks();
    this.isAuthenticated = this.appService.checkAuthenticationStatusBool();
  }

  showAddForm() {
    this.isAddFormVisible = true;
    this.newBook = {
      title: '',
      author: '',
      publicityDate: ''
    };
  }

  addBook() {
    this.bookService.createBook(this.newBook).subscribe(
      () => {
        this.getBooks();
        this.isAddFormVisible = false;
      },
      error => {
        console.error('Error adding book:', error);
      }
    );
  }

  getBooks() {
    this.bookService.getBooks().subscribe(data => {
      this.books = data;
    });
  }

  deleteBook(id: number) {
    this.bookService.deleteBook(id).subscribe(() => {
        this.getBooks();
    });
  }

  showUpdateForm(book: any) {
    this.isUpdateFormVisible = true;
    this.selectedBook = { ...book }; // Copy the book object
  }

  hideUpdateForm() {
    this.isUpdateFormVisible = false;
    this.selectedBook = {}; // Clear the selected book
  }

  hideAddForm() {
    this.isAddFormVisible = false;
  }

  updateBook() {
    // Implement the logic to update the book
    this.bookService.updateBook(this.selectedBook).subscribe(() => {
      /*this.books[this.selectedBook.bookId] = this.selectedBook;*/
      this.hideUpdateForm();
      this.getBooks();
    });
  }
}
