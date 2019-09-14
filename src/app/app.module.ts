import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import  {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MainNavbarComponent } from './main-navbar/main-navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatRadioModule } from '@angular/material/radio';
import { ResumenComponent } from './resumen/resumen.component';
import { CreditCardComponent } from './credit-card/credit-card.component';
import { OperacionesComponent } from './operaciones/operaciones.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import { FacturasVencidasComponent } from './facturas/facturas-vencidas/facturas-vencidas.component';
import { FacturasPagadasComponent } from './facturas/facturas-pagadas/facturas-pagadas.component';
import { FacturasVigentesComponent } from './facturas/facturas-vigentes/facturas-vigentes.component';
import { CuentaRegistradaComponent } from './transferencia/cuenta-registrada/cuenta-registrada.component';
import { CuentaNoRegistradaComponent } from './transferencia/cuenta-no-registrada/cuenta-no-registrada.component';


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
    CuentaNoRegistradaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule
  ],
  providers: [MatDatepickerModule],
  bootstrap: [MainNavbarComponent]
})
export class AppModule { }
