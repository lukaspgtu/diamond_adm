import { Injectable } from '@angular/core';
import { UserModel } from 'src/app/models/UserModel';
import { ConfigHelper } from 'src/app/helpers/ConfigHelper';
import { LoadingService } from '../loading/loading.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HttpResultModel } from 'src/app/models/HttpResultModel';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})

export class UserService {

	private url: string = ConfigHelper.Url;

	constructor(private http: HttpClient) {

  }

	public balanceInfo() {
		return this.http.get<any>(`${this.url}/balanceInfo`);
  }

  public clients() {
		return this.http.get<any>(`${this.url}/clients`);
  }

  public client(token: string) {
		return this.http.get<any>(`${this.url}/client/${token}`);
  }

}
