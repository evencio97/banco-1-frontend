import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../services/user.service';
import { ValidationService } from '../services/validation.service';

import Swal from 'sweetalert2';
//import * as $ from 'jquery';
declare var $: any;

@Component({
  selector: 'app-request-password',
  templateUrl: './request-password.component.html',
  styleUrls: ['../login/login.component.css']
})
export class RequestPasswordComponent implements OnInit {

  public form: FormGroup;
  public type: number = 1;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.resetForm();
  }

  changeLogin(value) {
    this.type = value;
  }

  resetForm() {
    this.form = this.formBuilder.group({
      email: [
        '',
        [Validators.required, ValidationService.emailValidator]
      ]
    });
  }

  onSubmit(form: any) {
    Swal.fire({
      showCancelButton: false,
      showConfirmButton: false,
      background: 'transparent',
      html: '<div class="loading-sp"><div></div><div></div><div></div><div></div></div>',
      allowOutsideClick: false
    });

    if (form.valid) {
      try {
        this._userService.resetPassword(form.value, this.type).subscribe(
          response => {
            Swal.fire('Perfecto!', response['message'], 'success').then(() => {
              this.resetForm();
              this._router.navigate(['/login']);
            });
          },
          err => {
            Swal.fire('Ups', err.error['message'], 'warning');
            console.log(<any>err);
          }
        );
      } catch (e) {
        console.log(e);
        Swal.fire('Ups', e.error['message'], 'warning');
      }
    } else {
      Swal.fire("Datos invalidos", "Porfavor revise los datos suministrados.", 'warning')
    }
  }

}
