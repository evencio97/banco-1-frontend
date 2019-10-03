import { Component, OnInit } from '@angular/core';
import { BillsService } from '../services/bills.service';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { MatDatepickerInputEvent } from '@angular/material/datepicker/typings/datepicker-input';
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';
import { AccountService } from '../services/account.service';
import { ValidationService } from '../services/validation.service';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';  

@Component({
    selector: 'app-bills',
    templateUrl: './bills.component.html',
    styleUrls: ['../credit-card/credit-card.component.css']
})
export class BillsComponent implements OnInit {

    public accounts;
    public form: FormGroup;
    public option = 0;
    public aux = 0;
    public user;
    public hidePass;
    startDate = null;
    endDate = null;
    maxDate: any = new Date();
    minDate = '2017-01-01';
    public minDateExp: any = new Date();
    public maxDateExp: any = new Date();
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
        private _accountService: AccountService,
        private formBuilder: FormBuilder,
        private _router: Router,
        private _userService: UserService
    ) { this.user = this._userService.getSession(); this.hidePass = true; }

    ngOnInit() {
        this.maxDate = formatDate(this.maxDate.setDate(this.maxDate.getDate() + 1), 'yyyy-MM-dd', 'en');
        this.minDateExp = formatDate(this.minDateExp.setDate(this.minDateExp.getDate() + 2), 'yyyy-MM-dd', 'en');
        this.maxDateExp = formatDate(this.maxDateExp.setDate(this.maxDateExp.getDate() + 30), 'yyyy-MM-dd', 'en');;
        this.resetForm();
        this.getBills();
        this.getAccounts();
    }

    showPass() {
        this.hidePass = !this.hidePass;
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
          pdf.save('bills.pdf'); // Generated PDF   
        });
    }

    resetForm() {
        this.form = this.formBuilder.group({
            emitter: [
                {
                    value: this.user.jusr_rif,
                    disabled: true
                },
                [Validators.required, Validators.minLength(10), Validators.maxLength(10)]
            ],
            receiver: [
                '',
                [Validators.required, Validators.minLength(10), Validators.maxLength(10)]
            ],
            amount: [
                '',
                [Validators.required]
            ],
            expdate: [
                {
                    value: '',
                    disabled: true
                },
                [Validators.required]
            ],
            password: [
                '',
                [Validators.required, ValidationService.passwordValidator]
            ]
        });
    }

    resetFormPay() {
        this.form = this.formBuilder.group({
            bill_ref_cod: [
                '',
                [Validators.required, Validators.minLength(8), Validators.maxLength(8)]
            ],
            account_emitter: [
                '',
                [Validators.required, Validators.minLength(20), Validators.maxLength(20)]
            ],
            account_receiver: [
                '',
                [Validators.required, Validators.minLength(20), Validators.maxLength(20)]
            ],
            password: [
                '',
                [Validators.required, ValidationService.passwordValidator]
            ]
        });
    }

    changeForm(value) {
        value == 0 ? this.resetForm() : this.resetFormPay();
        this.option = value;
    }

    getAccounts() {
        this._accountService.getAccounts(this._userService.getToken()).subscribe(
            res => {
                this.accounts = res['accounts'];
            },
            err => {
                console.log(err);
                Swal.fire('Ups', err.error['message'], 'warning');
            }
        );
    }

    getBills(showLoading = true, page = 1) {
        // this.initTable();
        this.table.loading = showLoading;
        let params = '?page=' + page + (this.startDate ? '&start=' + this.startDate : '') + (this.endDate ? '&end=' + this.endDate : '');
        this._billsService.getBills(params).subscribe(
            response => {
                // console.log(response);
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
                console.log(<any>err);
                if (err.error['token_fail'] || err.error['token_exp'])
                    Swal.fire('Ups', err.error['message'], 'warning').then(() => {
                        this._userService.tokenFailsOrExp();
                    });
            }
        );
    }

    onSubmit(form: any) {
        Swal.fire({
            showCancelButton: false,
            showConfirmButton: false,
            background: 'transparent',
            html: '<div class="loading-sp"><div></div><div></div><div></div><div></div></div>',
            allowOutsideClick: false
        });
        // console.log(form.value);
        if (form.valid) {
            if (this.option == 0) {
                try {
                    this._billsService.emitBill(form.getRawValue()).subscribe(
                        response => {
                            Swal.close();
                            Swal.fire('Success', response['message'], 'success').then(() => {
                                this.resetForm();
                                this._router.navigate(['/facturas/vigentes']);
                            });
                        },
                        err => {
                            console.log(<any>err);
                            Swal.fire('Ups', err.error['message'], 'warning');
                        }
                    );
                } catch (e) {
                    console.log(e);
                    Swal.fire('Ups', "An unexpected error has occurred, please try again.", 'warning');
                }
            } else {
                try {
                    this._billsService.payBill(form.value).subscribe(
                        response => {
                            Swal.close();
                            Swal.fire('Success', response['message'], 'success').then(() => {
                                this.resetFormPay();
                                this._router.navigate(['/facturas/pagadas']);
                            });
                        },
                        err => {
                            console.log(<any>err);
                            Swal.fire('Ups', err.error['message'], 'warning');
                        }
                    );
                } catch (e) {
                    console.log(e);
                    Swal.fire('Ups', "An unexpected error has occurred, please try again.", 'warning');
                }
            }
        } else {
            Swal.fire("Invalid Data", "Please review the data entered.", 'warning');
        }
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

    setDateFormat(event: MatDatepickerInputEvent<Date>) {
        this.form.controls['expdate'].setValue(formatDate(event.value, 'yyyy-MM-dd', 'en'));
        // console.log(this.startDate);
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
