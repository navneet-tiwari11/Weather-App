import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ForecastComponent } from './forecast.component';
import { CityResolver } from 'src/app/services/city-info.resolver';
import { MainComponent } from '../main/main.component';
import { ChartComponent } from '../chart/chart.component';

const routes: Routes = [
  {path:'', component: ForecastComponent,  resolve:{cityInfo: CityResolver}, children: [
    {path:'', redirectTo:'main', pathMatch: 'full',resolve:{cityInfo: CityResolver}},
    {path:'main', component:MainComponent},
    {path:'daily', loadChildren: '../daily/daily.module#DailyModule'},
    {path:'hourly', loadChildren:'../hourly/hourly.module#HourlyModule'},
    {path:'chart', component:ChartComponent},  
  ]},
]
@NgModule({
  declarations: [
    ForecastComponent,
    MainComponent,
    
    ChartComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ForecastModule { }
