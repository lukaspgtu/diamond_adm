import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ConfigHelper } from 'src/app/helpers/ConfigHelper';

@Injectable({
  providedIn: 'root'
})
export class ExtractService {
  private url: string = ConfigHelper.Url;

  constructor(private http: HttpClient) { }


  //Listar todos os extratos
  listExtract(filters?: string) {
    if (filters) {
      return this.http.get<any>(`${this.url}/extracts?${filters}`);
    }
    else {
      return this.http.get<any>(`${this.url}/extracts`);
    }
  }

  //Listar todos transacões
  listTransactions(filters?: string) {
    if (filters) {
      return this.http.get<any>(`${this.url}/transactions?${filters}`);
    }
    else {
      return this.http.get<any>(`${this.url}/transactions`);
    }
  }

  //Ver detalhes extrato
  viewExtract(id) {
    return this.http.get<any>(`${this.url}/extract/${id}`);
  }

  //Ver detalhes Transações
  viewTransaction(id) {
    return this.http.get<any>(`${this.url}/transaction/${id}`);
  }

  //Listar diretos
  listDirects(filters?: string) {

    if (filters) {

      return this.http.get<any>(`${this.url}/network/directs?${filters}`);
    }
    else {
      return this.http.get<any>(`${this.url}/network/directs`);
    }
  }

}
