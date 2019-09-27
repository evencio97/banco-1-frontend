import { TransfersService } from '../services/transfers.service';
import { CardsService } from '../services/cards.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
    selector: 'Resumen',
    templateUrl: './resumen.component.html',
    styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {

    accounts = [];
    purchases = [];
    tdcs = [];

    constructor(
        private _transfersService: TransfersService,
        private _cardsService: CardsService
    ) { }

    ngOnInit() {
        Swal.fire({
            showCancelButton: false,
            showConfirmButton: false,
            background: 'transparent',
            html: '<div class="loading-sp"><div></div><div></div><div></div><div></div></div>',
            allowOutsideClick: false
        });
        this.getLastPurchases(true);
        this.getAccounts();
        this.getTDCs();
    }

    getLastPurchases(closeLoading = false) {
        this._cardsService.getLastPurchases().subscribe(
            response => {
                if (closeLoading) Swal.close();
                this.purchases = response.purchases;
                // console.log({'purchases': this.purchases});
            },
            err => {
                Swal.fire('Ups', err.error['message'], 'warning');
                console.log(<any>err);
            }
        );
    }

    getAccounts(closeLoading = false) {
        this._transfersService.getUserAccounts(null).subscribe(
            response => {
                if (closeLoading) Swal.close();
                this.accounts = response.accounts ? response.accounts : [];
                // console.log(this.accounts);
            },
            err => {
                Swal.fire('Ups', err.error['message'], 'warning');
                console.log(<any>err);
            }
        );
    }

    getTDCs(closeLoading = false) {
        this._cardsService.getTDCs(0).subscribe(
            response => {
                if (closeLoading) Swal.close();
                this.tdcs = response.tdcs;
                // console.log({'accounts': this.accounts, 'tdcs': this.tdcs});
            },
            err => {
                Swal.fire('Ups', err.error['message'], 'warning');
                console.log(<any>err);
            }
        );
    }
}