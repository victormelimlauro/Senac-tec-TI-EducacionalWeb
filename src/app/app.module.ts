import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EntrarComponent } from './entrar/entrar.component';
import { MenuComponent } from './core/menu/menu.component';
import { FooterComponent } from './core/footer/footer.component';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { LoginLayoutComponent } from './layout/login-layout/login-layout.component';
import { EsqueciSenhaComponent } from './esqueci-senha/esqueci-senha.component';
import { UsuariosSharedComponent } from './usuarios-shared/usuarios-shared.component';

@NgModule({
  declarations: [
    AppComponent,
    EntrarComponent,
    MenuComponent,
    FooterComponent,
    HomeLayoutComponent,
    LoginLayoutComponent,
    EsqueciSenhaComponent,
    UsuariosSharedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
