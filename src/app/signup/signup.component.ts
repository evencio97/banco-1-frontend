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

  private type_account: OPTION[] = [
    { value: '1', viewValue: 'Ahorro' },
    { value: '2', viewValue: 'Corriente' }
  ]

  public message: string;
  public check = new FormControl(false);
  public hidePass = true;
  public hidePassValidate = true;
  public hidePassJusr = true;
  public hidePassJusrValidate = true;
  private type: number = 1;
  public form: FormGroup;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.resetFormNatural();
  }

  showPass(value) {
    value == 0 ? this.hidePass = !this.hidePass : this.hidePassValidate = !this.hidePassValidate;
  }

  showPassJusr(value) {
    value == 0 ? this.hidePassJusr = !this.hidePassJusr : this.hidePassJusrValidate = !this.hidePassJusrValidate;
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
      try {
        this._userService.signup(form.value, this.type, this.check.value).subscribe(
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

  onChange() {
    this.check.value ? this.resetFormJuridicCheck() : this.resetFormJuridic();
  }

  resetFormJuridicCheck() {
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
      ],
      opt_rif: [
        'J',
        [Validators.required]
      ],
      jusr_rif: [
        '',
        [Validators.required, ValidationService.numericValidator, Validators.maxLength(9)]
      ],
      jusr_email: [
        '',
        [Validators.required, ValidationService.emailValidator]
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
      ],
      jusr_q_recovery: [
        '',
        [Validators.required, Validators.maxLength(60)]
      ],
      jusr_a_recovery: [
        '',
        [Validators.required, Validators.maxLength(100)]
      ],
      jusr_password: [
        '',
        [Validators.required, ValidationService.passwordValidator]
      ],
      jusr_password_confirmation: [
        '',
        [Validators.required, ValidationService.passwordValidator]
      ]
    });
  }

  resetFormJuridic() {
    this.form = this.formBuilder.group({
      opt_ci: [
        'V',
        [Validators.required]
      ],
      type: [
        '',
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
      jusr_email: [
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
      ],
      jusr_q_recovery: [
        '',
        [Validators.required, Validators.maxLength(60)]
      ],
      jusr_a_recovery: [
        '',
        [Validators.required, Validators.maxLength(100)]
      ],
      jusr_password: [
        '',
        [Validators.required, ValidationService.passwordValidator]
      ],
      jusr_password_confirmation: [
        '',
        [Validators.required, ValidationService.passwordValidator]
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
      type: [
        '',
        [Validators.required]
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
