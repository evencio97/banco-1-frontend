import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { CardsService } from '../services/cards.service';
import { MatTableDataSource } from '@angular/material';
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';

@Component({
    selector: 'CreditCard',
    templateUrl: './credit-card.component.html',
    styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent implements OnInit {

    displayedColumns: string[] = ['cc_number', 'cc_exp_date', 'cc_status', 'cc_limit', 'cc_balance', 'cc_free'];
    data: MatTableDataSource<any>;
    tdcs: any = [];
    accounts: any = [];
    public hidePass = true;
    form = {
        number: <any>null,
        account: <any>null,
        amount: 0,
        minimum: false,
        password: null
    };

    constructor(
        private _cardsService: CardsService,
        private _userService: UserService
    ) { }

    ngOnInit() {
        this.getTDCsAndAccounts();
    }

    getTDCsAndAccounts(showLoading = true) {
        if (showLoading) {
            Swal.fire({
                showCancelButton: false,
                showConfirmButton: false,
                background: 'transparent',
                html: '<div class="loading-sp"><div></div><div></div><div></div><div></div></div>',
                allowOutsideClick: false
            });
        }
        this._cardsService.getTDCs(1).subscribe(
            response => {
                if (showLoading) Swal.close();
                this.data = new MatTableDataSource(response['tdcs']);
                this.tdcs = response['tdcs'];
                this.form.number = this.tdcs.length ? this.tdcs[0] : null;
                this.form.amount = this.form.number ? (this.form.number.cc_balance * (this.form.number.cc_minimum_payment / 100)) + (this.form.number.cc_balance * (this.form.number.cc_interests / 100)) : null;
                this.accounts = response['accounts'];
                this.form.account = this.accounts.length ? this.accounts[0] : null;
                // console.log({'accounts': this.accounts, 'tdcs': this.tdcs});
            },
            err => {
                console.log(<any>err);
                if (err.error['token_fail'] || err.error['token_exp'])
                    Swal.fire('Ups', err.error['message'], 'warning').then(() => {
                        this._userService.tokenFailsOrExp();
                    });
            }
        );
    }

    applyFilter(filterValue: string) {
        this.data.filter = filterValue.trim().toLowerCase();
    }

    selectTdc(number) {
        this.form.number = this.tdcs.find(aux => aux.cc_number === number);
        this.form.amount = this.form.number ? this.form.number.cc_minimum_payment : this.form.amount;
        // console.log(this.form.number);
    }

    selectAccount(number) {
        this.form.account = this.accounts.find(aux => aux.aco_number === number);
        // console.log(this.form.account);
    }

    toggleMinimum() {
        this.form.amount = this.form.number ? (this.form.number.cc_balance * (this.form.number.cc_minimum_payment / 100)) + (this.form.number.cc_balance * (this.form.number.cc_interests / 100)) : null;
        this.form.minimum = !this.form.minimum;
    }

    showPass() {
        this.hidePass = !this.hidePass;
    }

    payTdc(f: NgForm) {
        Swal.fire({
            showCancelButton: false,
            showConfirmButton: false,
            background: 'transparent',
            html: '<div class="loading-sp"><div></div><div></div><div></div><div></div></div>',
            allowOutsideClick: false
        });
        if (f.invalid) {
            Swal.fire('Ups', 'Hay un error con los datos introducidos.', 'warning');
            return;
        }
        if (this.form.amount > this.form.account.aco_balance) {
            Swal.fire('Ups', 'No tiene suficientes fondos en la cuenta seleccionada.', 'warning');
            return;
        }
        if (this.form.number.cc_balance == 0) {
            Swal.fire('Ups', 'La tarjeta seleccionada no tiene deudas que pagar.', 'warning');
            return;
        }
        if (this.form.amount < this.form.number.cc_minimum_payment || this.form.amount > this.form.number.cc_balance) {
            Swal.fire('Ups', 'El monto a pagar no puede ser menor que el pago minimo o el total de la deuda.', 'warning');
            return;
        }
        let data = {
            number: this.form.number.cc_number,
            account: this.form.account.aco_number,
            amount: this.form.minimum ? this.form.number.cc_minimum_payment : this.form.amount,
            password: this.form.password
        };
        this._cardsService.payTDC(data).subscribe(
            response => {
                Swal.fire('Exito', 'La tarjeta seleccionada se ha pagado correctamente.', 'success');
                this.getTDCsAndAccounts(false);
            },
            err => {
                console.log(<any>err);
                if (err.error['token_fail'] || err.error['token_exp'])
                    Swal.fire('Ups', err.error['message'], 'warning').then(() => {
                        this._userService.tokenFailsOrExp();
                    });
            }
        );
    }
}