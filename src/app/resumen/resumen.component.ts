import { TransfersService } from '../services/transfers.service';
import { CardsService } from '../services/cards.service';
import { UserService } from '../services/user.service';
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
    public token;

    constructor(
        private _transfersService: TransfersService,
        private _cardsService: CardsService,
        private _userService: UserService
    ) { }

    ngOnInit() {
        Swal.fire({
            showCancelButton: false,
            showConfirmButton: false,
            background: 'transparent',
            html: '<div class="loading-sp"><div></div><div></div><div></div><div></div></div>',
            allowOutsideClick: false
        });
        this.token = new Promise((resolve, reject) => {
            resolve(this._userService.getToken());
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
                if (err.error['token_fail'] || err.error['token_exp'])
                    this._userService.tokenFailsOrExp();

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
                if (err.error['token_fail'] || err.error['token_exp'])
                    this._userService.tokenFailsOrExp();

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
                if (err.error['token_fail'] || err.error['token_exp'])
                    this._userService.tokenFailsOrExp();

            }
        );
    }
}