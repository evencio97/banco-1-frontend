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
export class TransfersService {

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
        console.log(httpOptions);
    }

    getUserAccounts(status) {
        const requestUrl = this.apiUrl+'/account/user'+(status?'?status='+status:'');
        return <any> this._http.get(requestUrl, httpOptions);
    }

    transfer(data) {
        let requestUrl = `${this.apiUrl}/account/transfer`;
        if (!data.sameBank) requestUrl += '/other-bank';
        return <any> this._http.post(requestUrl, data, httpOptions);
    }

    getAccountMoves(body, page=1) {
        let requestUrl = this.apiUrl+'/account/moves?page='+page;
        return <any> this._http.post(requestUrl, body, httpOptions);
    }
}
