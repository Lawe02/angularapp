import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkThemeSubject = new BehaviorSubject<boolean>(false);
  isDarkTheme$ = this.isDarkThemeSubject.asObservable();

  private localStorageKey = 'themePreference';

  constructor() {
    const savedThemePreference = localStorage.getItem(this.localStorageKey);
    if (savedThemePreference === 'dark') {
      this.isDarkThemeSubject.next(true);
    }
  }

  toggleTheme() {
    this.isDarkThemeSubject.next(!this.isDarkThemeSubject.value);

    localStorage.setItem(this.localStorageKey, this.isDarkThemeSubject.value ? 'dark' : 'light');
  }
}
