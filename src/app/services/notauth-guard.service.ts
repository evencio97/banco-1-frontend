import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class NotauthGuardService {

  constructor(public router: Router, public _userService:UserService) { }
  canActivate():boolean {
    if(!this._userService.getToken()){
      return true;
    }else{
      this.router.navigate(['/']);
      return false;
    }
  }
}
