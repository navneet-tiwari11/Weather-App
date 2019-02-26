import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { CityComponent } from './city.component';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { WeatherService } from 'src/app/services/weather.service';
import { List, Weather } from 'src/assets/DataStruct/dataStruct';
import { Observable, of } from 'rxjs';
import { and } from '@angular/router/src/utils/collection';

// describe('CityComponent', () => {
//   let component: CityComponent;
//   let fixture: ComponentFixture<CityComponent>;
//   let service: WeatherService
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [CityComponent],
//       imports: [
//         FormsModule,
//         RouterModule,
//         HttpClientModule
//       ],
//       providers: [WeatherService]
//     }).compileComponents();

//     fixture = TestBed.createComponent(CityComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//     service = TestBed.get(WeatherService);
//   }));

//   it('should create the city component', () => {
//     expect(component).toBeTruthy();
//   });

//   it('dependency Injection testing', () => {
//     inject([WeatherService], (injectService: WeatherService) => {
//       expect(injectService).toBe(service)
//     })
//   });

//   it('calling onSubmit func on button click', async(() => {
//     spyOn(component, 'onSubmit');
//     let button = fixture.debugElement.nativeElement.querySelector('button');
//     button.click();
//     fixture.whenStable().then(() => {
//       expect(component.onSubmit).toHaveBeenCalled();
//     });
//   }));

//   it('returning cityInfo data from getcityInfo func from service', () => {
//     const dummyPost: List[] = []
//     service.getCityInfo('berlin').subscribe((post) => {
//       expect(post.list).toBe(dummyPost)
//     })
//   });

// });


describe('City Component', ()=>{
  
  let component:CityComponent;
  let fakeService:any;
  let form:any;
  let dummyPost:Observable<List[]>;
  beforeEach(()=>{
    fakeService = {
      getCityInfo:()=>{
        return dummyPost
      }
    }

    // fakeService = jasmine.createSpyObj(fakeService,['getCityInfo']);
    // fakeService.getCityInfo.and.returnValue(dummyPost)

    component = new CityComponent(fakeService);
  });

  it('should set the cityInfo$ property when onsubmit func called', ()=>{
    form={
      value:{
        cityName:'berlin'
      }
    }
    var spy = spyOn(component,'onSubmit')
    component.onSubmit(form);
    expect(spy).toHaveBeenCalled();
    expect(component.cityInfo$).toEqual(dummyPost);
    spyOn(fakeService,'getCityInfo').and.callThrough();
  });
})