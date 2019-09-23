import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpResultModel } from 'src/app/models/HttpResultModel';

@Injectable({
	providedIn: 'root'
})

export class HttpService {

	constructor(
		private http: HttpClient
	) {

	}

	public get(url: string): Observable<HttpResultModel> {

		let token = localStorage.getItem('token');

		let httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'X-Requested-With': 'XMLHttpRequest',
				'Authorization': `Bearer ${token}`
			})
		};

		return this.http.get<HttpResultModel>(url, httpOptions)
			.pipe(map(res => {
				return res;
			}));
	}

	public post(url: string, model: any): Observable<HttpResultModel> {

		let token = localStorage.getItem('token');

		let httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'X-Requested-With': 'XMLHttpRequest',
				'Authorization': `Bearer ${token}`
			})
		};

		return this.http.post<HttpResultModel>(url, model, httpOptions)
			.pipe(map(res => {
				return res;
			}));
	}
}
