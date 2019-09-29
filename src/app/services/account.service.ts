import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public apiUrl;

  constructor(
		private _router: Router,
		private _http: HttpClient
	) {
		this.apiUrl = environment.apiUrl;
  }

  getAccounts(token) {
		return this._http.get(this.apiUrl + '/account/user', {
			headers: new HttpHeaders({ 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': token })
		})
	}
  

}
