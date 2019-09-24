import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['../login/login.component.css']
})
export class ConfirmAccountComponent implements OnInit {

  public token;
  constructor(private _route: ActivatedRoute, private _userService: UserService, private _router: Router, ) { this.token = this._route.snapshot.paramMap.get('token'); }

  ngOnInit() {
    Swal.fire({
      showCancelButton: false,
      showConfirmButton: false,
      background: 'transparent',
      html: '<div class = "animated fadeIn fa-child-ss" style="color:#ffffff"><i class="fas fa-circle-notch fa-spin fa-3x"></i></div>',
      allowOutsideClick: false
    });
    this._userService.confirmAccount(this.token).subscribe(
      response => {
        if (response['user'] && response['access_token']) {
          this._userService.saveSession(response['access_token'], response['user']);
          Swal.close();
          this._router.navigate(['/']);
        }
      }, err => {
          Swal.close();
          Swal.fire('Ups', err.error['message'], 'warning').then(() => {
            this._router.navigate(['/login']);
          });
          console.log(<any>err);
        }
      );
  }

}
