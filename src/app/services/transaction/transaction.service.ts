import { Injectable } from '@angular/core';
import { ConfigHelper } from 'src/app/helpers/ConfigHelper';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private url: string = ConfigHelper.Url;

  constructor(
    private http: HttpClient
  ) {

  }

  activations(limit?: number) {
    if (limit !== undefined) {
      return this.http.get<any>(`${this.url}/activations/${limit}`);
    }
    else {
      return this.http.get<any>(`${this.url}/activations`);
    }
  }

  invoicesResume() {
    return this.http.get<any>(`${this.url}/invoicesResume`);
  }

  invoice(token: string) {
    return this.http.get<any>(`${this.url}/invoice/${token}`);
  }

  withdrawsResume() {
    return this.http.get<any>(`${this.url}/withdrawsResume`);
  }
}
