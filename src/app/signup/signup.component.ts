import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../services/user.service';
import { ValidationService } from '../services/validation.service';

import Swal from 'sweetalert2';
//import * as $ from 'jquery';
declare var $ : any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../login/login.component.css']
})
export class SignupComponent implements OnInit {

  public message: string;
  public hidePass;
  public hidePassValidate;
  private type:number = 0;
  public form: FormGroup;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private formBuilder: FormBuilder) { }

  resetForm() {
    this.form = this.formBuilder.group({
      opt_ci: [
        '',
        [Validators.required]
      ],
      user_ci: [
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
        [Validators.required]
      ],
      address: [
        '',
        [Validators.required, Validators.maxLength(300)]
      ]
    });
  }

  ngOnInit() {
    this.hidePass = true;
    this.hidePassValidate = true;
    this.resetForm();
  }

  showPass(value) {
    value == 0 ? this.hidePass = !this.hidePass: this.hidePassValidate = !this.hidePassValidate;
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
        this._userService.signup(form.value).subscribe(
          response => {
            Swal.close();
            Swal.fire('Success', response['message'], 'success').then(() => {
              this.resetForm();
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

  changeLogin(value){
    this.type=value;
  }

}
