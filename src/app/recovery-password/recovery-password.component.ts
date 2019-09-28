import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ValidationService } from '../services/validation.service';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['../login/login.component.css']
})
export class RecoveryPasswordComponent implements OnInit {

  public token;
  public hidePass;
  public hidePassValidate;
  public form: FormGroup;
  constructor(private _route: ActivatedRoute, private _userService: UserService, private _router: Router, private formBuilder: FormBuilder) { this.token = this._route.snapshot.paramMap.get('token'); }

  resetForm(tokenValid, q_recovery) {
    this.form = this.formBuilder.group({
      token: [tokenValid, []],
      q_recovery: [
        { value: q_recovery, disabled: true }
      ],
      a_recovery: [
        '',
        [Validators.required, Validators.maxLength(100)]
      ],
      password: [
        '',
        [ValidationService.passwordValidator]
      ],
      password_confirmation: [
        '',
        [ValidationService.passwordValidator]
      ],
      isChargerForm: [
        '1',
        []
      ]

    });
  }

  showPass(value) {
    value == 0 ? this.hidePass = !this.hidePass : this.hidePassValidate = !this.hidePassValidate;
  }

  ngOnInit() {
    Swal.fire({
      showCancelButton: false,
      showConfirmButton: false,
      background: 'transparent',
      html: '<div class="loading-sp"><div></div><div></div><div></div><div></div></div>',
      allowOutsideClick: false
    });
    this._userService.findTokenReset(this.token).subscribe(
      response => {
        if (response['resetToken']) {
          Swal.close();
          this.hidePass = true;
          this.hidePassValidate = true;
          this.resetForm(response['resetToken'].token, response['security_question']);
        }
      }, err => {
        Swal.close();
        console.log(<any>err);
        Swal.fire('Ups', err.error['message'], 'warning');
        this._router.navigate(['/']);
      }
    );
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
        this._userService.requestNewPassword(form.value).subscribe(
          response => {
            Swal.close();
            if (response['user']) {
              Swal.fire('Success', response['message'], 'success').then(() => {
                this._router.navigate(['/login']);
              })
            }
          },
          err => {
            Swal.close();
            console.log(<any>err);
            Swal.fire('Ups', err.error['message'], 'warning');
          }
        );
      } catch (e) {
        Swal.close();
        console.log(e);
        Swal.fire('Ups', "An unexpected error has occurred, please try again.", 'warning');
      }

    } else {
      Swal.close();
      Swal.fire("Invalid Data", "Please review the data entered.", 'warning');
    }

  }

}
