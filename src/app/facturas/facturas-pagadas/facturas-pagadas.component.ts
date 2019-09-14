import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-facturas-pagadas',
  templateUrl: './facturas-pagadas.component.html',
  styleUrls: ['./facturas-pagadas.component.css']
})
export class FacturasPagadasComponent implements OnInit {
  displayedColumns: string[] = ['id', 'fecha', 'nombre_RS', 'tiempo', 'monto'];
  dataSource = new MatTableDataSource<facturasPagadas>(ELEMENT_DATA);

  constructor() { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

}

export interface facturasPagadas {
  id: string
  fecha: string, 
  nombre_RS: string, 
  tiempo: string,
  monto: string  
}

const ELEMENT_DATA: facturasPagadas[] = [
  {
    id: "Compra por internet con TDC", 
    fecha: '3/9/2019', 
    nombre_RS: 'Activo', 
    tiempo: '14.000',
    monto: '-12.000'    
  },{
    id: "Transferencia cuenta corriente", 
    fecha: '28/11/2019', 
    nombre_RS: 'Bloqueado', 
    tiempo: '15.000',
    monto: '-9.000'    
  }  
];
