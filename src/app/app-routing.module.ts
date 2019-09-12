import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { EntrarComponent } from './entrar/entrar.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
 {
  path: '',
  component: HomeLayoutComponent,
  canActivate: [],
  children:[
  { path: 'entrar', component: EntrarComponent },
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
