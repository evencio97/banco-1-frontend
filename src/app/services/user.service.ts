import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' })
};

@Injectable({
	providedIn: 'root'
})
export class UserService {

	public apiUrl;
	constructor(
		private _http: HttpClient
	) {
		this.apiUrl = environment.apiUrl;
	}
	removeSession(){
		localStorage.removeItem('token');
        localStorage.removeItem('session');
	}
	saveSession(token, user){
		localStorage.setItem('token', JSON.stringify(token));
		localStorage.setItem('session', JSON.stringify(user));
	}
	login(user, type) {
		let params = JSON.stringify(user);
		return this._http.post(this.apiUrl + '/auth/login?type='+type, params, httpOptions);
	}
	signup(user, type) {
		let params = JSON.stringify(user);
		return this._http.post(this.apiUrl + '/auth/signup?type='+type, params, httpOptions);
	}
	getToken() {
		return JSON.parse(localStorage.getItem('token'));
	}
	getSession() {
		return JSON.parse(localStorage.getItem('session'));
	}
	resetPassword(email, type) {
		let params = JSON.stringify(email);
		return this._http.post(this.apiUrl + '/password/create?type='+type, params, httpOptions);
	}
	confirmAccount(token) {
		return this._http.get(this.apiUrl + '/auth/signup/activate/' + token, httpOptions);
	}
	requestNewPassword(password) {
		let params = JSON.stringify(password);
		return this._http.post(this.apiUrl + '/password/reset', params, httpOptions);
	}
	findTokenReset(token) {
		return this._http.get(this.apiUrl + '/password/find/' + token, httpOptions);
	}
	editProfile(user, token) {
		let params = JSON.stringify(user);
		return this._http.put(this.apiUrl + '/user/edit', params, {
			headers: new HttpHeaders({ 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Authorization': 'Bearer ' + token })
		})
	}
}
