import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpclientDemoComponent } from './httpclient-demo/httpclient-demo.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', component:HttpclientDemoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
