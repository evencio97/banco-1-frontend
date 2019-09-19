import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResumenComponent } from './resumen/resumen.component';
import { CuentaRegistradaComponent } from './transferencia/cuenta-registrada/cuenta-registrada.component';
import { CuentaNoRegistradaComponent } from './transferencia/cuenta-no-registrada/cuenta-no-registrada.component';
import { CreditCardComponent } from './credit-card/credit-card.component';
import { OperacionesComponent } from './operaciones/operaciones.component';
import { FacturasVencidasComponent } from './facturas/facturas-vencidas/facturas-vencidas.component';
import { FacturasPagadasComponent } from './facturas/facturas-pagadas/facturas-pagadas.component';
import { FacturasVigentesComponent } from './facturas/facturas-vigentes/facturas-vigentes.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {AuthGuardService as AuthGuard} from './services/auth-guard.service';

const routes: Routes = [
  {path:'', component:ResumenComponent, canActivate: [AuthGuard] },
  {path: 'resumen', component: ResumenComponent, canActivate: [AuthGuard]},  
  {path: 'tarjetaCredito', component: CreditCardComponent, canActivate: [AuthGuard]},
  {path: 'operaciones', component: OperacionesComponent, canActivate: [AuthGuard]},  
  {path: 'facturas/pagadas', component: FacturasPagadasComponent, canActivate: [AuthGuard]},
  {path: 'facturas/vencidas', component: FacturasVencidasComponent, canActivate: [AuthGuard]},
  {path: 'facturas/vigentes', component: FacturasVigentesComponent, canActivate: [AuthGuard]},
  {path: 'transferencias/registrada', component: CuentaRegistradaComponent, canActivate: [AuthGuard]},
  {path: 'transferencias/noRegistrada', component: CuentaNoRegistradaComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
