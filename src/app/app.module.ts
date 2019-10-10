import { environment } from './../environments/environment.prod';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

//banco de dados
//storage de imagens
//autenticação
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';

//Layout e menus
import { NavbarComponent } from './core/navbar/navbar.component';
import { FooterComponent } from './core/footer/footer.component';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { LoginLayoutComponent } from './layout/login-layout/login-layout.component';


//Auth público
import { LoginComponent } from './usuarios/login/login.component';
import { EsqueciSenhaComponent } from './usuarios/esqueci-senha/esqueci-senha.component';


//Auth privado
import { CriarContaComponent } from './usuarios/criar-conta/criar-conta.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { ListaPlantoesComponent } from './plantoes/lista-plantoes/lista-plantoes.component';
import { FormPlantoesComponent } from './plantoes/form-plantoes/form-plantoes.component';
import { ListaMateriasComponent } from './materias/lista-materias/lista-materias.component';
import { FormMateriasComponent } from './materias/form-materias/form-materias.component';
import { FormTurmasComponent } from './turmas/form-turmas/form-turmas.component';
import { ListaTurmasComponent } from './turmas/lista-turmas/lista-turmas.component';
import { FormVisitasComponent } from './plantoes/visitas/form-visitas/form-visitas.component';
import { ListaVisitasComponent } from './plantoes/visitas/lista-visitas/lista-visitas.component';



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeLayoutComponent,
    LoginLayoutComponent,
    EsqueciSenhaComponent,
    CriarContaComponent,
    LoginComponent,
    NavbarComponent,
    DashboardComponent,
    ListaPlantoesComponent,
    FormPlantoesComponent,
    ListaMateriasComponent,
    FormMateriasComponent,
    FormTurmasComponent,
    ListaTurmasComponent,
    FormVisitasComponent,
    ListaVisitasComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
