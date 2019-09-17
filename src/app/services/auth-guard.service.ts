import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(public router: Router) { }
  canActivate():boolean {
    if(JSON.parse(localStorage.getItem('token'))){
      return true;
    }else{
      this.router.navigate(['/']);
      return false;
    }
  }
}
