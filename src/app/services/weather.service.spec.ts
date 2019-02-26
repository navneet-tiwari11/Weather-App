import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { WeatherService } from './weather.service';
import { CityInfo } from 'src/assets/DataStruct/dataStruct';

describe('WeatherService', () => {

  let service: WeatherService;
  let httpMock: HttpTestingController 

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService],
    });
    service = TestBed.get(WeatherService);
    httpMock = TestBed.get(HttpTestingController)
  });

  afterEach(()=>{
    httpMock.verify();
  })

  it('should be created', () => {
    expect(WeatherService).toBeTruthy();
  });

  it('should retreive post from API via GET', () => {
    const dummyPost: CityInfo = {
      message: 'Get Info Message',
      cod: 'cod',
      count: 40,
      list: []
    }
    service.getCityInfo('berlin').subscribe(post=> {
      expect(post).toEqual(dummyPost)
    });

    const request = httpMock.expectOne(`http://api.openweathermap.org/data/2.5/find?q=berlin&appid=7a3225c4433be6b4875e5b50daa5ce92&units=metric`)
    expect(request.request.method).toBe('GET');
    request.flush(dummyPost);
  })
});
