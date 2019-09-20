import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../services/user.service';
import { ValidationService } from '../services/validation.service';

import Swal from 'sweetalert2';
//import * as $ from 'jquery';
declare var $: any;

export interface OPTION {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../login/login.component.css']
})
export class SignupComponent implements OnInit {

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
  public hidePassValidate;
  private type: number = 1;
  public form: FormGroup;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.hidePass = true;
    this.hidePassValidate = true;
    this.resetFormNatural();
  }

  showPass(value) {
    value == 0 ? this.hidePass = !this.hidePass : this.hidePassValidate = !this.hidePassValidate;
  }

  onSubmit(form: any) {
    Swal.fire({
      showCancelButton: false,
      showConfirmButton: false,
      background: 'transparent',
      html: '<div class = "animated fadeIn fa-child-ss" style="color:#ffffff"><i class="fas fa-circle-notch fa-spin fa-3x"></i></div>',
      allowOutsideClick: false
    });
    // console.log(form.value);
    if (form.valid) {
      try {
        this._userService.signup(form.value, this.type).subscribe(
          response => {
            Swal.close();
            Swal.fire('Success', response['message'], 'success').then(() => {
              this.type == 1 ? this.resetFormNatural() : this.resetFormJuridic();
              this._router.navigate(['/login']);
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
      Swal.fire("Invalid Data", "Please review the data entered.", 'warning');
    }

  }

  changeLogin(value) {
    value == 1 ? this.resetFormNatural() : this.resetFormJuridic();
    this.type = value;
  }
  
  resetFormJuridic() {
    this.form = this.formBuilder.group({
      opt_ci: [
        'V',
        [Validators.required]
      ],
      user_ci: [
        '',
        [Validators.required, ValidationService.numericValidator]
      ],
      email: [
        '',
        [Validators.required, ValidationService.emailValidator]
      ],
      password: [
        '',
        [Validators.required, ValidationService.passwordValidator]
      ],
      password_confirmation: [
        '',
        [Validators.required, ValidationService.passwordValidator]
      ],
      first_name: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(20)]
      ],
      middle_name: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(20)]
      ],
      first_surname: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(20)]
      ],
      second_surname: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(20)]
      ],
      q_recovery: [
        '',
        [Validators.required, Validators.maxLength(60)]
      ],
      a_recovery: [
        '',
        [Validators.required, Validators.maxLength(100)]
      ],
      phone: [
        '',
        [Validators.required, Validators.minLength(10), Validators.maxLength(10), ValidationService.numericValidator]
      ],
      address: [
        '',
        [Validators.required, Validators.maxLength(300)]
      ],
      opt_rif: [
        'J',
        [Validators.required]
      ],
      jusr_rif: [
        '',
        [Validators.required, ValidationService.numericValidator, Validators.maxLength(9)]
      ],
      jusr_company: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(60)]
      ],
      jusr_phone: [
        '',
        [Validators.required, Validators.minLength(10), Validators.maxLength(10), ValidationService.numericValidator]
      ],
      jusr_address: [
        '',
        [Validators.required, Validators.maxLength(300)]
      ]
    });
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
      email: [
        '',
        [Validators.required, ValidationService.emailValidator]
      ],
      password: [
        '',
        [Validators.required, ValidationService.passwordValidator]
      ],
      password_confirmation: [
        '',
        [Validators.required, ValidationService.passwordValidator]
      ],
      first_name: [
        '',
        [Validators.required, Validators.minLength(3)]
      ],
      middle_name: [
        '',
        [Validators.required, Validators.minLength(3)]
      ],
      first_surname: [
        '',
        [Validators.required, Validators.minLength(3)]
      ],
      second_surname: [
        '',
        [Validators.required, Validators.minLength(3)]
      ],
      q_recovery: [
        '',
        [Validators.required, Validators.maxLength(60)]
      ],
      a_recovery: [
        '',
        [Validators.required, Validators.maxLength(100)]
      ],
      phone: [
        '',
        [Validators.required, Validators.minLength(10), Validators.maxLength(10), ValidationService.numericValidator]
      ],
      address: [
        '',
        [Validators.required, Validators.maxLength(300)]
      ]
    });
  }

}
