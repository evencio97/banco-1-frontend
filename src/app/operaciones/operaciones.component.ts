import { Component, OnInit } from '@angular/core';
import { TransfersService } from '../services/transfers.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { MatDatepickerInputEvent } from '@angular/material/datepicker/typings/datepicker-input';
import Swal from 'sweetalert2';

@Component({
    selector: 'Operaciones',
    templateUrl: './operaciones.component.html',
    styleUrls: ['./operaciones.component.css']
})
export class OperacionesComponent implements OnInit {

    startDate = null;
    endDate = null;
    maxDate: any = new Date();
    minDate = '2017-01-01';
    dateOption = "all";
    account = null;
    accounts = [];
    table = {
        account: null,
        loading: false,
        data: [],
        page: 1,
        next: 1,
        previous: 1,
        finalPage: 1
    }

    constructor(
        private _transfersService: TransfersService,
        private _router: Router
    ) { }

    ngOnInit() {
        this.maxDate = formatDate(this.maxDate.setDate(this.maxDate.getDate() + 1), 'yyyy-MM-dd', 'en');
        this.getAccounts();
    }

    getAccounts() {
        Swal.fire({
            showCancelButton: false,
            showConfirmButton: false,
            background: 'transparent',
            html: '<div class="loading-sp"><div></div><div></div><div></div><div></div></div>',
            allowOutsideClick: false
        });
        this._transfersService.getUserAccounts(null).subscribe(
            response => {
                Swal.close();
                this.accounts = response.accounts ? response.accounts : [];
                // console.log(this.accounts);
            },
            err => {
                Swal.fire('Ups', err.error['message'], 'warning');
                console.log(<any>err);
            }
        );
    }

    getAccountMoves(showLoading = true, page = 1) {
        this.table.loading = showLoading;
        let body = {
            number: this.account,
            option: this.dateOption,
            mindate: this.startDate,
            maxdate: this.endDate
        };
        this._transfersService.getAccountMoves(body, page).subscribe(
            response => {
                this.table.account = this.account;
                this.table.data = response.ccpayments.data.concat(response.transfers.data);
                this.table.data = this.table.data.sort(function (a, b) {
                    if (a.created_at > b.created_at) return -1;
                    if (a.created_at < b.created_at) return 1;
                    return 0;
                });
                this.table.finalPage = response.ccpayments.last_page > response.transfers.last_page ? response.ccpayments.last_page : response.transfers.last_page;
                this.table.page = response.ccpayments.current_page;
                this.table.next = (this.table.page + 1) < this.table.finalPage ? this.table.page + 1 : this.table.page;
                this.table.previous = (this.table.page - 1) > 1 ? this.table.page - 1 : this.table.page;
                this.table.loading = false;
                // console.log({'table': this.table.data, 'transfers': response.transfers.data, 'payments': response.ccpayments.data});
            },
            err => {
                this.table.loading = false;
                Swal.fire('Ups', err.error['message'], 'warning');
                console.log(<any>err);
            }
        );
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
