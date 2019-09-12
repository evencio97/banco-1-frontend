import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { of } from 'rxjs';

@Component({
  selector: 'CreditCard',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent implements OnInit {

  displayedColumns: string[] = ['id', 'f_pagar', 'status', 'limite', 'deuda', 'disponible'];
  dataSource = new MatTableDataSource<creditCars>(ELEMENT_DATA);
  form: FormGroup;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private formBuilder: FormBuilder) {        
    of(this.getdataSources()).subscribe(dataSource => {
      this.dataSource = dataSource;
    });
  }

  getdataSources() {
    return this.dataSource;
  }

}

export interface creditCars {
    id: number, 
    f_pagar: string, 
    status: string, 
    limite: string,
    deuda: string,
    disponible: string
}

const ELEMENT_DATA: creditCars[] = [
  {
    id: 1, 
    f_pagar: '3/9/2019', 
    status: 'Activo', 
    limite: '14.000',
    deuda: '-12.000',
    disponible: '10.000'
  },{
    id: 2, 
    f_pagar: '28/11/2019', 
    status: 'Bloqueado', 
    limite: '15.000',
    deuda: '-9.000',
    disponible: '100.000'
  }  
];