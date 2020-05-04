import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
//import { AngularFirestoreSettingsToken } from '@angular/fire/firestore'
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabeceroComponent } from './componentes/cabecero/cabecero.component';
import { ClientesComponent } from './componentes/clientes/clientes.component';
import { VendedoresComponent } from './componentes/vendedores/vendedores.component';
import { RepartidoresComponent } from './componentes/repartidores/repartidores.component';
import { PiePaginaComponent } from './componentes/pie-pagina/pie-pagina.component';
import { NoEncontradoComponent } from './componentes/no-encontrado/no-encontrado.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginClientesComponent } from './componentes/login-clientes/login-clientes.component';
import { LoginVendedoresComponent } from './componentes/login-vendedores/login-vendedores.component';
import { LoginRepartidoresComponent } from './componentes/login-repartidores/login-repartidores.component';
import { LoginComponent } from './componentes/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    CabeceroComponent,
    ClientesComponent,
    VendedoresComponent,
    RepartidoresComponent,
    PiePaginaComponent,
    NoEncontradoComponent,
    InicioComponent,
    LoginClientesComponent,
    LoginVendedoresComponent,
    LoginRepartidoresComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firestore, "mikimexi-app"),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    // AngularFirestoreSettingsToken,
    FlashMessagesModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
