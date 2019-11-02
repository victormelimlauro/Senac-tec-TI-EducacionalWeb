import { ListaUsuariosComponent } from './usuarios/lista-usuarios/lista-usuarios.component';
import { AuthGuard } from './usuarios/shared/auth.guard';
import { ListaVisitasComponent } from './plantoes/visitas/lista-visitas/lista-visitas.component';
import { FormVisitasComponent } from './plantoes/visitas/form-visitas/form-visitas.component';
import { FormTurmasComponent } from './turmas/form-turmas/form-turmas.component';
import { ListaTurmasComponent } from './turmas/lista-turmas/lista-turmas.component';
import { FormMateriasComponent } from './materias/form-materias/form-materias.component';
import { ListaMateriasComponent } from './materias/lista-materias/lista-materias.component';
import { ListaPlantoesComponent } from './plantoes/lista-plantoes/lista-plantoes.component';
import { FormPlantoesComponent } from './plantoes/form-plantoes/form-plantoes.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';

import { LoginComponent } from './usuarios/login/login.component';
import { CriarContaComponent } from './usuarios/criar-conta/criar-conta.component';
import { EsqueciSenhaComponent } from './usuarios/esqueci-senha/esqueci-senha.component';
import { LoginLayoutComponent } from './layout/login-layout/login-layout.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { AngularFireAuth } from '@angular/fire/auth';


const routes: Routes = [
 {
  path: '',
  component: HomeLayoutComponent,
  canActivate: [AuthGuard],
  children:[
    { path: 'dashboard', component: DashboardComponent },
    { path: 'criar-conta', component:  CriarContaComponent},

    { path: 'plantoes', component:  ListaPlantoesComponent},
    { path: 'plantoes/novo', component:  FormPlantoesComponent},
    { path: 'plantoes/editar/:key', component:  FormPlantoesComponent},

    { path: 'plantoes/visitas', component:  ListaVisitasComponent},
    { path: 'plantoes/visitas/nova', component:  FormVisitasComponent},
    { path: 'plantoes/visitas/editar/:key', component:  FormVisitasComponent},

    { path: 'materias', component:  ListaMateriasComponent},
    { path: 'materias/nova', component:  FormMateriasComponent},
    { path: 'materias/editar/:key', component:  FormMateriasComponent},

    { path: 'turmas', component:  ListaTurmasComponent},
    { path: 'turmas/nova', component:  FormTurmasComponent},
    { path: 'turmas/editar/:key', component:  FormTurmasComponent},

    { path: 'usuarios', component:  ListaUsuariosComponent},
    { path: 'usuarios/novo', component:  CriarContaComponent},
    { path: 'usuarios/editar/:key', component:  CriarContaComponent},

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
