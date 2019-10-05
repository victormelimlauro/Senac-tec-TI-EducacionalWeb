import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './usuarios/login/login.component';
import { CriarContaComponent } from './usuarios/criar-conta/criar-conta.component';
import { EsqueciSenhaComponent } from './usuarios/esqueci-senha/esqueci-senha.component';
import { LoginLayoutComponent } from './layout/login-layout/login-layout.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';


const routes: Routes = [
 {
  path: '',
  component: HomeLayoutComponent,
  canActivate: [AuthGuard],
  children:[
    { path: 'dashboard', component: DashboardComponent },


    { path: 'criar-conta', component:  CriarContaComponent},
    { path: '', redirectTo:  '/dashboard', pathMatch: 'full' }
    ]
  },
{
  path: '',
  component: LoginLayoutComponent,
  children: [
    { path: 'login', component: LoginComponent },

    { path: 'esqueci-senha', component:  EsqueciSenhaComponent}
  ]
},

{ path: '**', redirectTo:  '' }

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
