import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResumenComponent } from './resumen/resumen.component';
import { CreditCardComponent } from './credit-card/credit-card.component';
import { OperacionesComponent } from './operaciones/operaciones.component';
import { FacturasVencidasComponent } from './facturas/facturas-vencidas/facturas-vencidas.component';
import { FacturasPagadasComponent } from './facturas/facturas-pagadas/facturas-pagadas.component';
import { FacturasVigentesComponent } from './facturas/facturas-vigentes/facturas-vigentes.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {AuthGuardService as AuthGuard} from './services/auth-guard.service';
import {NotauthGuardService as NotauthGuard} from './services/notauth-guard.service';
import { ConfirmAccountComponent } from './confirm-account/confirm-account.component';
import { RequestPasswordComponent } from './request-password/request-password.component';
import { RecoveryPasswordComponent } from './recovery-password/recovery-password.component';
import { TransfersComponent } from './transfers/transfers.component';

const routes: Routes = [
  {path: '', component:ResumenComponent, canActivate: [AuthGuard] },
  {path: 'resumen', component: ResumenComponent, canActivate: [AuthGuard]},  
  {path: 'tarjetaCredito', component: CreditCardComponent, canActivate: [AuthGuard]},
  {path: 'operaciones', component: OperacionesComponent, canActivate: [AuthGuard]},  
  {path: 'facturas/pagadas', component: FacturasPagadasComponent, canActivate: [AuthGuard]},
  {path: 'facturas/vencidas', component: FacturasVencidasComponent, canActivate: [AuthGuard]},
  {path: 'facturas/vigentes', component: FacturasVigentesComponent, canActivate: [AuthGuard]},
  {path: 'transferir', component: TransfersComponent/*, canActivate: [AuthGuard]*/},
  {path: 'confirm-account/:token', component:ConfirmAccountComponent, canActivate:[NotauthGuard]},
  {path: 'reset-password', component:RequestPasswordComponent, canActivate:[NotauthGuard]},
  {path: 'reset-request/:token', component:RecoveryPasswordComponent, canActivate:[NotauthGuard]},
  {path: 'login', component: LoginComponent, canActivate:[NotauthGuard]},
  {path: 'signup', component: SignupComponent, canActivate:[NotauthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
