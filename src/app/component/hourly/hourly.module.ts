import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HourlyComponent } from './hourly.component';

const routes : Routes = [
  {path:'', component:HourlyComponent}
]

@NgModule({
  declarations: [
    HourlyComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class HourlyModule { }
