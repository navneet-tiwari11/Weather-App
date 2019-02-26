import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CityInfo } from 'src/assets/DataStruct/dataStruct';

@Injectable({
  providedIn: 'root'
})
export class CityInfoService {

  constructor(private _http: HttpClient) { }

  getCityById(id): Observable<CityInfo>{
    return this._http.get<CityInfo>(`http://api.openweathermap.org/data/2.5/forecast?id=${id}&appid=7a3225c4433be6b4875e5b50daa5ce92&units=metric`)
  }
}
