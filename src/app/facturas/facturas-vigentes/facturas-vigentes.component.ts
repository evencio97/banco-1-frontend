import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-facturas-vigentes',
  templateUrl: './facturas-vigentes.component.html',
  styleUrls: ['./facturas-vigentes.component.css']
})
export class FacturasVigentesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'f_emision', 'nombre_RS', 'tiempoOp', 'monto'];
  dataSource = new MatTableDataSource<facturasVencidas>(ELEMENT_DATA);

  constructor() { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

}

export interface facturasVencidas {
  id: string
  f_emision: string, 
  nombre_RS: string, 
  tiempoOp: string,
  monto: string  
}

const ELEMENT_DATA: facturasVencidas[] = [
  {
    id: "Compra por internet con TDC", 
    f_emision: '3/9/2019', 
    nombre_RS: 'Activo', 
    tiempoOp: '14.000',
    monto: '-12.000'    
  },{
    id: "Transferencia cuenta corriente", 
    f_emision: '28/11/2019', 
    nombre_RS: 'Bloqueado', 
    tiempoOp: '15.000',
    monto: '-9.000'    
  }  
];
