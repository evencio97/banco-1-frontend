import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../services/user.service';
import { ValidationService } from '../services/validation.service';

import Swal from 'sweetalert2';
//import * as $ from 'jquery';
declare var $ : any;

export interface OPTION {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  private ci_op: OPTION[] = [
    { value: 'V', viewValue: 'V' },
    { value: 'E', viewValue: 'E' }
  ];

  private rif_op: OPTION[] = [
    { value: 'J', viewValue: 'J' },
    { value: 'G', viewValue: 'G' },
    { value: 'C', viewValue: 'C' }
  ]
  public message: string;
  public hidePass;
  public form: FormGroup;
  public type:number = 1;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.hidePass = true;
    this.resetFormNatural();
  }
  
  resetFormNatural() {
    this.form = this.formBuilder.group({
      opt_ci: [
        'V',
        [Validators.required]
      ],
      user_ci: [
        '',
        [Validators.required, ValidationService.numericValidator]
      ],
      password: [
        '',
        [Validators.required, ValidationService.passwordValidator]
      ]
    });
  }
  resetFormJuridic() {
    this.form = this.formBuilder.group({
      opt_rif: [
        'J',
        [Validators.required]
      ],
      jusr_rif: [
        '',
        [Validators.required, ValidationService.numericValidator, Validators.maxLength(9)]
      ],
      password: [
        '',
        [Validators.required, ValidationService.passwordValidator]
      ]
    });
  }
    
  showPass() {
    this.hidePass = !this.hidePass;
  }

  onSubmit(form: any) {
    Swal.fire({
      showCancelButton: false,
      showConfirmButton: false,
      background: 'transparent',
      html: '<div class = "animated fadeIn fa-child-ss" style="color:#ffffff"><i class="fas fa-circle-notch fa-spin fa-3x"></i></div>',
      allowOutsideClick: false
    });
    if (form.valid) {
      try {
        this._userService.login(form.value, this.type).subscribe(
          response => {
            if (response['user'] && response['access_token']) {
              this._userService.saveSession(response['access_token'],response['user'])
              Swal.close();
              this._router.navigate(['/']);
            } else {
              Swal.close();
              Swal.fire('Ups', response['message'], 'warning')
            }
          },
          err => {
            Swal.close();
            Swal.fire('Ups', err.error['message'], 'warning');
            console.log(<any>err);
          }
        );
      } catch (e) {
        console.log(e);
        Swal.close();
        Swal.fire('Ups', e.error['message'], 'warning');
      }
    } else {
      Swal.fire("Invalid Data", "Please review the data entered.", 'warning')
    }
  }

  changeLogin(value){
    value == 1 ? this.resetFormNatural(): this.resetFormJuridic();
    this.type=value;
  }

}
