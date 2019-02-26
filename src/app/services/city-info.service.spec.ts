import { TestBed } from '@angular/core/testing';

import { CityInfoService } from './city-info.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CityInfo } from 'src/assets/DataStruct/dataStruct';

describe('CityInfoService', () => {
  let service: CityInfoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CityInfoService]
    });
    service = TestBed.get(CityInfoService);
    httpMock = TestBed.get(HttpTestingController)
  });

  afterEach(()=>{
    httpMock.verify();
  })

  it('should be created', () => {
    expect(CityInfoService).toBeTruthy();
  });

  it('should retreive city info via GET request', ()=>{
    const dummyPost: CityInfo = {
      message: 'Get Info Message',
      cod: 'cod',
      count: 40,
      list: []
    }
    service.getCityById(500).subscribe((data)=>{
      expect(data).toEqual(dummyPost)
    });

    const request = httpMock.expectOne('http://api.openweathermap.org/data/2.5/forecast?id=500&appid=7a3225c4433be6b4875e5b50daa5ce92&units=metric')
    expect(request.request.method).toBe('GET');
    request.flush(dummyPost);
  })

});
