import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';

describe('AppComponent', () => {
  let fixture: AppComponent;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        HeaderComponent
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent)
  }));

  it('should create the app', async(() => {
    expect(AppComponent).toBeTruthy();
}));

  

});
