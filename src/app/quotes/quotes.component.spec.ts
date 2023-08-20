import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuotesComponent } from './quotes.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import HttpClientTestingModule

describe('QuotesComponent', () => {
  let component: QuotesComponent;
  let fixture: ComponentFixture<QuotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuotesComponent],
      imports: [HttpClientTestingModule], // Add HttpClientTestingModule to imports
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
