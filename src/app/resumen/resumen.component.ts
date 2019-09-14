import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'Resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {

  displayedColumns: string[] = ['operacion', 'fecha', 'status', 'negocio', 'monto'];
  dataSource = new MatTableDataSource<ultMov>(ELEMENT_DATA);  

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor() { }

  ngOnInit() {  
      this.dataSource.paginator = this.paginator;  
  }

}

export interface ultMov {
  operacion: string, 
  fecha: string, 
  status: string, 
  negocio: string,
  monto: string  
}

const ELEMENT_DATA: ultMov[] = [
  {
    operacion: 'compra por internet', 
    fecha: '3/9/2019', 
    status: 'Activo', 
    negocio: 'Tienda 1',
    monto: '12.000',    
  },{
    operacion: 'Transferencia con TDC', 
    fecha: '28/11/2019', 
    status: 'Bloqueado', 
    negocio: 'Distribuidor 1',
    monto: '9.000',    
  }  
];

