import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigHelper } from 'src/app/helpers/ConfigHelper';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  private url = ConfigHelper.Url;

  constructor(
    private http: HttpClient
  ) {

  }

  public ratioActivePlans() {
		return this.http.get<any>(`${this.url}/ratioActivePlans`);
	}

  public plans() {
		return this.http.get<any>(`${this.url}/plans`);
	}
}
