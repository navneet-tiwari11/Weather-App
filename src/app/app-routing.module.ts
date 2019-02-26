import { NgModule } from '@angular/core';
import { Routes, RouterModule,PreloadingStrategy } from '@angular/router';
import { CityComponent } from './component/city/city.component';
import { ForecastComponentLoading } from './PreloadingStrategy/forecast-component-loading';

const routes: Routes = [
  {path:'', component:CityComponent},
  {path:'forecast/:id', loadChildren: './component/forecast/forecast.module#ForecastModule', data:{preload:true}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ preloadingStrategy: ForecastComponentLoading })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
