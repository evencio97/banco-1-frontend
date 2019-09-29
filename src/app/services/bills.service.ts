import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserService } from './user.service';

const httpOptions = {
    headers: null
};

@Injectable({
    providedIn: 'root'
})
export class BillsService {

    public apiUrl;
    constructor(
        private _http: HttpClient,
        private _userService: UserService
    ) {
        this.apiUrl = environment.apiUrl;
        httpOptions.headers = new HttpHeaders({ 
            'Content-Type': 'application/json', 
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': _userService.getToken() 
        });
    }

    getBills(params) {
        const requestUrl = `${this.apiUrl}/bill${params}`;
        return <any> this._http.get(requestUrl, httpOptions);
    }

    getPayBills(params) {
        const requestUrl = `${this.apiUrl}/bill/pay${params}`;
        return <any> this._http.get(requestUrl, httpOptions);
    }

    getOpenBills(params) {
        const requestUrl = `${this.apiUrl}/bill/open${params}`;
        return <any> this._http.get(requestUrl, httpOptions);
    }

    getExpBills(params) {
        const requestUrl = `${this.apiUrl}/bill/expired${params}`;
        return <any> this._http.get(requestUrl, httpOptions);
    }

    emitBill(bill){
        let params = JSON.stringify(bill);
		return this._http.post(this.apiUrl + '/bill', params, httpOptions);
    }

    payBill(bill){
        let params = JSON.stringify(bill);
		return this._http.post(this.apiUrl + '/bill/pay', params, httpOptions);
    }
}
