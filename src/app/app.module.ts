import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';

import { MatDatepickerModule } from '@angular/material/datepicker';

import { MainNavbarComponent } from './main-navbar/main-navbar.component';
import { FacturasVencidasComponent } from './facturas/facturas-vencidas/facturas-vencidas.component';
import { FacturasPagadasComponent } from './facturas/facturas-pagadas/facturas-pagadas.component';
import { FacturasVigentesComponent } from './facturas/facturas-vigentes/facturas-vigentes.component';
import { CuentaRegistradaComponent } from './transferencia/cuenta-registrada/cuenta-registrada.component';
import { CuentaNoRegistradaComponent } from './transferencia/cuenta-no-registrada/cuenta-no-registrada.component';
import { ResumenComponent } from './resumen/resumen.component';
import { CreditCardComponent } from './credit-card/credit-card.component';
import { OperacionesComponent } from './operaciones/operaciones.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RequestPasswordComponent } from './request-password/request-password.component';
import { RecoveryPasswordComponent } from './recovery-password/recovery-password.component';
import { ConfirmAccountComponent } from './confirm-account/confirm-account.component';
import { TransfersComponent } from './transfers/transfers.component';


@NgModule({
  declarations: [    
    MainNavbarComponent, 
    ResumenComponent,     
    CreditCardComponent, 
    OperacionesComponent,    
    FacturasVencidasComponent, 
    FacturasPagadasComponent, 
    FacturasVigentesComponent, 
    CuentaRegistradaComponent, 
    CuentaNoRegistradaComponent,
    LoginComponent,
    SignupComponent,
    RequestPasswordComponent,
    RecoveryPasswordComponent,
    ConfirmAccountComponent,
    TransfersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDatepickerModule,
    SharedModule
  ],
  providers: [MatDatepickerModule],
  bootstrap: [MainNavbarComponent]
})
export class AppModule { }
