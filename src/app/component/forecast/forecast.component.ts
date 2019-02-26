import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CityInfo } from 'src/assets/DataStruct/dataStruct';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>()
  public description: string = 'Cloudy';
  public currentCityInfo;
  public windDescription: string;
  public cloudDescription: string;
  constructor(private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this._route.data.pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        this.onCityInfoRetrieved(data['cityInfo'])
      }
    );
  }

  private onCityInfoRetrieved(cityInfo: CityInfo): void {
    this.currentCityInfo = cityInfo;
    if (this.currentCityInfo.list[0].wind.speed < 5) {
      this.windDescription = 'Light Breeze';
    }
    else {
      this.windDescription = 'Heavy Breeze';
    }
    if (this.currentCityInfo.list[0].clouds.all == 0) {
      this.cloudDescription = 'No Clouds';
    }
    else if (this.currentCityInfo.list[0].clouds.all < 5) {
      this.cloudDescription = 'Few Clouds';
    }
    else {
      this.cloudDescription = 'Heavy Clouds';
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    console.log("unsubscribe forecast Component");
  }

}
