import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { NoEncontradoComponent } from './componentes/no-encontrado/no-encontrado.component';
import { RepartidoresComponent } from './componentes/repartidores/repartidores.component';
import { VendedoresComponent } from './componentes/vendedores/vendedores.component';
import { ClientesComponent } from './componentes/clientes/clientes.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginVendedoresComponent } from './componentes/login-vendedores/login-vendedores.component';
import { LoginClientesComponent } from './componentes/login-clientes/login-clientes.component';
import { LoginRepartidoresComponent } from './componentes/login-repartidores/login-repartidores.component';
import { AcercaDeComponent } from './componentes/acerca-de/acerca-de.component';
import { AuthGuard } from './guardianes/auth-guard';


const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'login-vendedores', component: LoginVendedoresComponent },
  { path: 'login-clientes', component: LoginClientesComponent },
  { path: 'login-repartidores', component: LoginRepartidoresComponent },
  { path: 'acerca-de', component: AcercaDeComponent },
  { path: 'repartidores/:id', component: RepartidoresComponent, canActivate: [AuthGuard]},
  { path: 'vendedor/:rfc', component: VendedoresComponent, canActivate: [AuthGuard] },
  { path: 'clientes/:email', component: ClientesComponent, canActivate: [AuthGuard] },
  { path: '**', component: NoEncontradoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
