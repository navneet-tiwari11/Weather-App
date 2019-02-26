import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Chart } from 'chart.js';

import { CityInfo } from 'src/assets/DataStruct/dataStruct';

import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();
  private date;
  private temp;
  private time = [];
  public LineChart = [];

  constructor(private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.parent.data.pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        this.onCityInfoRetrieved(data['cityInfo'])
      }
    )
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
      pdf.save('MainWeather.pdf')
  });
  }

  private onCityInfoRetrieved(cityInfo: CityInfo) {
    this.date = cityInfo['list'].map(result => result.dt_txt)
    this.temp = cityInfo['list'].map(result => result.main.temp)
    for (var i = 0; i < 8; i++) {
      this.time.push(this.date[i].substr(this.date[i].indexOf(' ') + 1))
    }
    this.LineChart = new Chart('lineChart', {
      type: 'line',
      data: {
        labels: [...this.time],
        datasets: [
          {
            label: 'Temp in °С',
            data: this.temp,
            borderColor: '#f39c12',
            fill: false
          }
        ]
      },
      options: {
        title: {
          display: true,
        },
        legend: {
          display: true,
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Hours'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Temperature (°С)'
            }
          }],
        }
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
