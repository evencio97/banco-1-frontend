import { Component, OnInit } from '@angular/core';
import { BillsService } from '../../services/bills.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { MatDatepickerInputEvent } from '@angular/material/datepicker/typings/datepicker-input';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
    selector: 'app-facturas-vencidas',
    templateUrl: './facturas-vencidas.component.html',
    styleUrls: ['./facturas-vencidas.component.css']
})
export class FacturasVencidasComponent implements OnInit {

    startDate = null;
    endDate = null;
    maxDate: any = new Date();
    minDate = '2017-01-01';
    table = {
        loading: false,
        data: [],
        page: 1,
        next: 1,
        previous: 1,
        finalPage: 1
    }

    constructor(
        private _billsService: BillsService,
        private _userService: UserService
    ) { }

    ngOnInit() {
        this.maxDate = formatDate(this.maxDate.setDate(this.maxDate.getDate() + 1), 'yyyy-MM-dd', 'en');
        this.getExpBills();
    }

    getExpBills(showLoading = true, page = 1) {
        // this.initTable();
        this.table.loading = showLoading;
        let params = '?page=' + page + (this.startDate ? '&start=' + this.startDate : '') + (this.endDate ? '&end=' + this.endDate : '');
        this._billsService.getExpBills(params).subscribe(
            response => {
                if (response.bills) {
                    this.table.data = response.bills.data;
                    this.table.finalPage = response.bills.last_page;
                    this.table.page = response.bills.current_page;
                    this.table.next = (this.table.page + 1) < this.table.finalPage ? this.table.page + 1 : this.table.page;
                    this.table.previous = (this.table.page - 1) > 1 ? this.table.page - 1 : this.table.page;
                } else {
                    Swal.fire('Ups', 'Ocurrio un error, por favor intente de nuevo.', 'warning');
                }
                this.table.loading = false;
                // console.log({'table': this.table, 'bills': response.bills});
            },
            err => {
                this.table.loading = false;
                if (err.error['token_fail'] || err.error['token_exp'])
                    Swal.fire('Ups', err.error['message'], 'warning').then(() => {
                        this._userService.tokenFailsOrExp();
                    });
            }
        );
    }

    exportPdf() {
        var data = document.getElementById('content-pdf');  
        html2canvas(data).then(canvas => {  
          // Few necessary setting options  
          var imgWidth = 208;   
          var pageHeight = 295;    
          var imgHeight = canvas.height * imgWidth / canvas.width;  
          var heightLeft = imgHeight;  
      
          const contentDataURL = canvas.toDataURL('image/png')  
          let pdf = new jsPDF(); // A4 size page of PDF  
          var position = 0;  
          pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
          pdf.save('bills_exp.pdf'); // Generated PDF   
        });
    }

    initTable() {
        this.table = {
            loading: false,
            data: [],
            page: 1,
            next: 1,
            previous: 1,
            finalPage: 1
        };
    }

    setStartDate(event: MatDatepickerInputEvent<Date>) {
        this.startDate = formatDate(event.value, 'yyyy-MM-dd', 'en');
        // console.log(this.startDate);
    }

    setEndDate(event: MatDatepickerInputEvent<Date>) {
        this.endDate = formatDate(event.value, 'yyyy-MM-dd', 'en');
        // console.log(this.endDate);
    }
}
