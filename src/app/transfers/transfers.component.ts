import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TransfersService } from '../services/transfers.service';
import { MatTableDataSource } from '@angular/material';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

declare var jQuery: any;

@Component({
    selector: 'app-transfers',
    templateUrl: './transfers.component.html',
    styleUrls: ['./transfers.component.css']
})
export class TransfersComponent implements OnInit {

    sameBank = true;
    accounts: any = [];
    hidePass = true;

    constructor(
        private _transfersService: TransfersService,
        private _router: Router,
        private _userService: UserService
    ) { }

    ngOnInit() {
        this.getUserAccounts();
    }

    getUserAccounts(showLoading = true) {
        if (showLoading){
            Swal.fire({
                showCancelButton: false,
                showConfirmButton: false,
                background: 'transparent',
                html: '<div class="loading-sp"><div></div><div></div><div></div><div></div></div>',
                allowOutsideClick: false
            });
        }
        this._transfersService.getUserAccounts(1).subscribe(
            response => {
                if (showLoading) Swal.close();
                this.accounts = response['accounts'];
                if (!this.accounts.length) {
                    Swal.fire('Ups', 'No posee ninguna cuenta activa', 'warning');
                    this._router.navigate(['/']);
                }
                // console.log({'accounts': this.accounts});
            },
            err => {
                if (err.error['token_fail'] || err.error['token_exp']) this._userService.tokenFailsOrExp();
                Swal.fire('Ups', err.error['message'], 'warning');
                console.log(<any>err);
            }
        );
    }

    makeTransfer(f: NgForm) {
        Swal.fire({
            showCancelButton: false,
            showConfirmButton: false,
            background: 'transparent',
            html: '<div class="loading-sp"><div></div><div></div><div></div><div></div></div>',
            allowOutsideClick: false
        });
        if (f.invalid || !f.value) {
            Swal.fire('Ups', 'Hay un error con los datos introducidos.', 'warning');
            return;
        }
        let data = f.value;
        data.sameBank = this.sameBank;
        let account = this.accounts.find(function(element) {
            return element.aco_number == data.emitter;
        });
        // console.log({data: data, account: account});
        if (data.receiver.length != 20) {
            Swal.fire('Ups', 'La cuenta del beneficiario debe taner 20 digitos.', 'warning');
            return;
        }
        if (data.amount > account.aco_balance) {
            Swal.fire('Ups', 'El monto a transferir no puede ser mayor a los fondos de la cuenta.', 'warning');
            return;
        }
        if (data.amount == 0) {
            Swal.fire('Ups', 'El monto a transferir no puede ser 0.', 'warning');
            return;
        }
        this._transfersService.transfer(data).subscribe(
            response => {
                Swal.fire('Exito', 'Se ha procesado su transferencia exitosamente.', 'success');
                this.getUserAccounts(false);
            },
            err => {
                if (err.error['token_fail'] || err.error['token_exp']) this._userService.tokenFailsOrExp();
                Swal.fire('Ups', err.error['message'], 'warning');
                console.log(<any>err);
            }
        );
    }

    onlyNumericInput(e) {
        //188
        if (jQuery.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
              // Allow: Ctrl/cmd+A
          (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
          // Allow: Ctrl/cmd+C
          (e.keyCode === 67 && (e.ctrlKey === true || e.metaKey === true)) ||
          // Allow: Ctrl/cmd+X
          (e.keyCode === 88 && (e.ctrlKey === true || e.metaKey === true)) ||
          // Allow: home, end, left, right
          (e.keyCode >= 35 && e.keyCode <= 39)) {
          // let it happen, don't do anything
          return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105) && e.keyCode != 188 ) {
          //console.log(e);
          e.preventDefault();
        }
      }
}
