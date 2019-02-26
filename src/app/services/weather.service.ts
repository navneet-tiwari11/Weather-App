import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CityInfo } from 'src/assets/DataStruct/dataStruct';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private _http: HttpClient) { }

  public getCityInfo(cityName:string): Observable<CityInfo>{
    return this._http.get<CityInfo>(`http://api.openweathermap.org/data/2.5/find?q=${cityName}&appid=7a3225c4433be6b4875e5b50daa5ce92&units=metric`);
  }
}
