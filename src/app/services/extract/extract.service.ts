import { Injectable } from '@angular/core';
import { ConfigHelper } from 'src/app/helpers/ConfigHelper';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExtractService {

  private url: string = ConfigHelper.Url;

  constructor(
    private http: HttpClient
  ) {

  }

  lastBonusPayment() {
    return this.http.get<any>(`${this.url}/lastBonusPayment`);
  }

  lastIncomePayment() {
    return this.http.get<any>(`${this.url}/lastIncomePayment`);
  }
}
