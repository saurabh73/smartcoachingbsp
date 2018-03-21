import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {BookDemoPageComponent, HomePageComponent, ApplyJobPageComponent } from './pages';


const routes: Routes = [
  {
    path: 'home', component: HomePageComponent
  },
  {
    path: 'book-demo', component: BookDemoPageComponent
  }, {
    path: 'apply-job', component: ApplyJobPageComponent
  }, {
    path: '', redirectTo: '/home', pathMatch: 'full'
  }, {
    path: '**', component: HomePageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
