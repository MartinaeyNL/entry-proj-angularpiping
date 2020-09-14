import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppStopwatchComponent} from './app-stopwatch/app-stopwatch.component';

const routes: Routes = [
  { path: 'stopwatch', component: AppStopwatchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
