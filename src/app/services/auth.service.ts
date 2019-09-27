import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public apiUrl;

  constructor(private _http: HttpClient, public router: Router) { this.apiUrl = environment.apiUrl; }

  isAuthenticated(token) {
    return this._http.get(this.apiUrl + '/auth/user', {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': token })
    });
  }

  logout(token){
    return this._http.get(this.apiUrl + '/auth/logout', {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': token })
    });
  }
}