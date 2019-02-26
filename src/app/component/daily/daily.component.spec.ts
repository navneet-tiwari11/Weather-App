import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyComponent } from './daily.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DailyComponent', () => {
  let component: DailyComponent;
  let fixture: ComponentFixture<DailyComponent>;

  beforeEach(async(() => {
    // routeStub = {
    //   data: null
    // }
    TestBed.configureTestingModule({
      declarations: [ DailyComponent ],
      imports:[
        RouterTestingModule,
        HttpClientTestingModule
      ],
      // providers:[
      //   { provide: ActivatedRoute, useValue: routeStub }
      // ]

    }).compileComponents();
    fixture = TestBed.createComponent(DailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
