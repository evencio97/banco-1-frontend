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


const routes: Routes = [
  {path: 'resumen', component: ResumenComponent},  
  {path: 'tarjetaCredito', component: CreditCardComponent},
  {path: 'operaciones', component: OperacionesComponent},  
  {path: 'facturas/pagadas', component: FacturasPagadasComponent},
  {path: 'facturas/vencidas', component: FacturasVencidasComponent},
  {path: 'facturas/vigentes', component: FacturasVigentesComponent},
  {path: 'transferencias/registrada', component: CuentaRegistradaComponent},
  {path: 'transferencias/noRegistrada', component: CuentaNoRegistradaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
