import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResumenComponent } from './resumen/resumen.component';
import { TransferenciaComponent } from './transferencia/transferencia.component';
import { CreditCardComponent } from './credit-card/credit-card.component';
import { OperacionesComponent } from './operaciones/operaciones.component';
import { FacturasComponent } from './facturas/facturas.component';


const routes: Routes = [
  {path: 'resumen', component: ResumenComponent},
  {path: 'transferencias', component: TransferenciaComponent},
  {path: 'tarjetaCredito', component: CreditCardComponent},
  {path: 'operaciones', component: OperacionesComponent},
  {path: 'facturas', component: FacturasComponent}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
