import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'Operaciones',
  templateUrl: './operaciones.component.html',
  styleUrls: ['./operaciones.component.css']
})
export class OperacionesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'fecha', 'status', 'negocio', 'monto'];
  dataSource = new MatTableDataSource<operaciones>(ELEMENT_DATA);

  constructor() { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

}

export interface operaciones {
  id: string
  fecha: string, 
  status: string, 
  negocio: string,
  monto: string  
}

const ELEMENT_DATA: operaciones[] = [
  {
    id: "Compra por internet con TDC", 
    fecha: '3/9/2019', 
    status: 'Activo', 
    negocio: '14.000',
    monto: '-12.000'    
  },{
    id: "Transferencia cuenta corriente", 
    fecha: '28/11/2019', 
    status: 'Bloqueado', 
    negocio: '15.000',
    monto: '-9.000'    
  },{
    id: "Transferencia cuenta corriente", 
    fecha: '28/11/2019', 
    status: 'Bloqueado', 
    negocio: '15.000',
    monto: '-9.000'    
  }  ,{
    id: "Transferencia cuenta corriente", 
    fecha: '28/11/2019', 
    status: 'Bloqueado', 
    negocio: '15.000',
    monto: '-9.000'    
  }    
];
