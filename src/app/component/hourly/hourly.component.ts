import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { CityInfo } from 'src/assets/DataStruct/dataStruct';

@Component({
  selector: 'app-hourly',
  templateUrl: './hourly.component.html',
  styleUrls: ['./hourly.component.css']
})
export class HourlyComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();
  public cityWeatherInfo;
  public time = [];
  public longDate = [];
  public jsonObj = {};
  public key = [];

  constructor(private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.parent.parent.data.pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        this.onCityInfoRetrieved(data['cityInfo'])
      }
    )
  }
  private onCityInfoRetrieved(cityInfo: CityInfo) {
    this.cityWeatherInfo = cityInfo
    var j = -1
    for (var i = 0; i < cityInfo.list.length; i++) {
      var date = new Date(cityInfo.list[i].dt * 1000);
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var timeObj = hours+ ':' + minutes
      this.time.push(timeObj)
      if (date.toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "short", day: "numeric" }) != this.longDate[j]) {
        var k = 0;
        j = j + 1;
        this.longDate[j] = date.toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "short", day: "numeric" })
        this.jsonObj[this.longDate[j]] = []
      }
      this.jsonObj[this.longDate[j]][k] = cityInfo.list[i]
      k= k+1;
    }
    this.key = Object.keys(this.jsonObj)
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
