import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { CityInfo } from 'src/assets/DataStruct/dataStruct';
import { CityInfoService } from './city-info.service';

@Injectable({
  providedIn: 'root'
})
export class CityResolver implements Resolve<CityInfo> {

  constructor(private cityInfoService: CityInfoService) { }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<CityInfo> {
    const id = route.paramMap.get('id');
    // this.cityInfoService.getCityById(+id).subscribe(
    //   (data)=>{
    //     console.log(data)
    //   }
    // );
    return this.cityInfoService.getCityById(+id);
  }
}
