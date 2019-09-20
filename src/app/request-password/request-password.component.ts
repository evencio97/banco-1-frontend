import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../services/user.service';
import { ValidationService } from '../services/validation.service';

import Swal from 'sweetalert2';
//import * as $ from 'jquery';
declare var $ : any;

@Component({
  selector: 'app-request-password',
  templateUrl: './request-password.component.html',
  styleUrls: ['../login/login.component.css']
})
export class RequestPasswordComponent implements OnInit {

  private form: FormGroup;
  private type:number = 1;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.resetForm();
  }

  changeLogin(value){
    this.type=value;
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
      html: '<div class = "animated fadeIn fa-child-ss" style="color:#ffffff"><i class="fas fa-circle-notch fa-spin fa-3x"></i></div>',
      allowOutsideClick: false
    });
    
    if (form.valid) {
      try {
        this._userService.resetPassword(form.value, this.type).subscribe(
          response => {
              Swal.close();
              Swal.fire('Perfecto!', response['message'], 'success').then(() => {
                this.resetForm();
                this._router.navigate(['/login']);
              });
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
      Swal.fire("Datos invalidos", "Porfavor revise los datos suministrados.", 'warning')
    }
  }

}
