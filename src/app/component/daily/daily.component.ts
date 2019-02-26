import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Chart } from 'chart.js';
import { CityInfo } from 'src/assets/DataStruct/dataStruct';

import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.css']
})
export class DailyComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();
  private date;
  private temp_min;
  private temp_max;
  private time = [];
  public LineChart = [];
  public cityName;
  public countryName;

  constructor(private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.parent.parent.data.pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        console.log(data);
        this.onCityInfoRetrieved(data['cityInfo'])
      }
    );
  }

  public captureScreen()
  {
    var data = document.getElementById('lineChart');
    html2canvas(data).then(canvas => {
      var imgWidth = 208;  
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('DailyWeather.pdf')
  });
  }

  private onCityInfoRetrieved(cityInfo: CityInfo) {
    this.cityName = cityInfo.city.name;
    this.countryName = cityInfo.city.country;
    this.date = cityInfo['list'].map(result => result.dt_txt)
    this.temp_min = cityInfo['list'].map(result => result.main.temp_min)
    this.temp_max = cityInfo['list'].map(result => result.main.temp_max)
    for (var i = 0; i < 8; i++) {
      this.time.push(this.date[i].substr(this.date[i].indexOf(' ') + 1))
    }

    var MinTempData = {
      label: 'Min_Temp (°С)',
      data: this.temp_min,
      backgroundColor: 'rgba(0, 99, 132, 0.6)',
      borderColor: 'rgba(0, 99, 132, 1)',
      yAxisID: "y-axis-temp"
    };
     
    var MaxTempData = {
      label: 'Max_Temp (°С)',
      data: this.temp_max,
      backgroundColor: 'rgba(99, 132, 0, 0.6)',
      borderColor: 'rgba(99, 132, 0, 1)',
    };
     
    var planetData = {
      labels: [...this.time],
      datasets: [MinTempData, MaxTempData]
    };
     
    var chartOptions = {
      scales: {
        xAxes: [{
          barPercentage: 1,
          categoryPercentage: 0.6
        }],
        yAxes: [{
          id: "y-axis-temp"
        },
      ]
      }
    };
     
    this.LineChart = new Chart('lineChart', {
      type: 'bar',
      data: planetData,
      options: chartOptions
    });
    

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
