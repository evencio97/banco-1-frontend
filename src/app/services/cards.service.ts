import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' })
};

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  public apiUrl;
	constructor(
		private _http: HttpClient
	) {
		this.apiUrl = environment.apiUrl;
  }
  
  getTDCsTable(sort: string, order: string, page: number): Observable<any> {
    const requestUrl = `${this.apiUrl}?sort=${sort}&order=${order}&page=${page + 1}`;
    return this._http.get(requestUrl, httpOptions);
  }

  getTDCs(accountsFlag = 0) {
    const requestUrl = `${this.apiUrl}/tdc?accounts=${accountsFlag}`;
    return this._http.get(requestUrl, httpOptions);
  }

  payTDC(data) {
    const requestUrl = `${this.apiUrl}/tdc/pay`;
    return this._http.post(requestUrl, data, httpOptions);
  }
}
