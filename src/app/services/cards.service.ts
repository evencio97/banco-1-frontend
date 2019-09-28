import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

let httpOptions = {
    headers: null
};

@Injectable({
    providedIn: 'root'
})
export class CardsService {

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

    getTDCsTable(sort: string, order: string, page: number): Observable<any> {
        const requestUrl = `${this.apiUrl}?sort=${sort}&order=${order}&page=${page + 1}`;
        return <any>this._http.get(requestUrl, httpOptions);
    }

    getTDCs(accountsFlag = 0) {
        const requestUrl = `${this.apiUrl}/tdc?accounts=${accountsFlag}`;
        return <any>this._http.get(requestUrl, httpOptions);
    }

    getLastPurchases() {
        const requestUrl = `${this.apiUrl}/tdc/purchases/last`;
        return <any>this._http.get(requestUrl, httpOptions);
    }

    payTDC(data) {
        const requestUrl = `${this.apiUrl}/tdc/pay`;
        return <any>this._http.post(requestUrl, data, httpOptions);
    }
}
