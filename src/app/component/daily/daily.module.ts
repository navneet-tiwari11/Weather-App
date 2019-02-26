import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { DailyComponent } from './daily.component';

const routes: Routes = [
  {path:'', component:DailyComponent}
]

@NgModule({
  declarations: [
    DailyComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
})
export class DailyModule { }
