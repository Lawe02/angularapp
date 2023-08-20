import { Component } from '@angular/core';
import { QuoteService } from '../QuoteService';
import { ThemeService } from '../themeService';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent {
  quotes: any[] = [];
  showAddForm: boolean = false;
  isDarkTheme: boolean = false;
  isAuthenticated: boolean = false;

  newQuote: any = {
    text: ''
  };

  constructor(private quoteService: QuoteService, private themeService: ThemeService, private appService: AppComponent) { }

  ngOnInit(){
    this.themeService.isDarkTheme$.subscribe(isDarkTheme => {
      this.isDarkTheme = isDarkTheme;
    });
    this.isAuthenticated = this.appService.checkAuthenticationStatusBool();
    this.getQuotes();
  }

  getQuotes() {
    this.quoteService.getQuotes().subscribe(data => {
      this.quotes = data;
    });
  }

  addQuote() {
    if (this.quotes.length < 5) {
      this.quoteService.addQuote(this.newQuote).subscribe(() => {
        this.newQuote = { text: '' }; // Clear the newQuote object
        this.hideAddForm();
        this.getQuotes(); // Refresh the quotes after adding
      });
    } else {
      alert("You can't add more than 5 favorite quotes.");
    }
  }

  showForm() {
    this.showAddForm = true;
  }

  hideAddForm() {
    this.showAddForm = false;
  }

  deleteQuote(id: string) {
    this.quoteService.deleteQuote(id).subscribe(() => {
      this.getQuotes();
    })
  } 
}
