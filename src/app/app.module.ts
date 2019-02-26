import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { CityComponent } from './component/city/city.component';
import { WeatherService } from './services/weather.service';
import { CityInfoService } from './services/city-info.service';
import { CityResolver } from './services/city-info.resolver';
import { ForecastComponentLoading } from './PreloadingStrategy/forecast-component-loading';
import { FooterComponent } from './component/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CityComponent,
    FooterComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    WeatherService,
    CityInfoService,
    CityResolver,
    ForecastComponentLoading
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
