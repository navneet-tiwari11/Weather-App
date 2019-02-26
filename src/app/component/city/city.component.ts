import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { WeatherService } from 'src/app/services/weather.service';
import { List } from 'src/assets/DataStruct/dataStruct';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

  cityInfo$: Observable<List[]>;
  searchTerm: string;
  data: any;

  constructor(private _weatherService: WeatherService) { }

  ngOnInit() { }

  onSubmit(form: NgForm) {
    this.searchTerm = form.value.cityName;
    console.log(this.searchTerm)
    this.cityInfo$ = this._weatherService.getCityInfo(this.searchTerm)
      .pipe(
        map((result) => result.list)
      )
  }


}
