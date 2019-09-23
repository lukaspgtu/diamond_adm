import { Injectable } from '@angular/core';
import { ConfigHelper } from 'src/app/helpers/ConfigHelper';
import { HttpHeaders, HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class NetworkService {
    private url: string = ConfigHelper.Url;

    constructor(private http: HttpClient) { }

    // Puxar dados iniciais
    netWorkPrimary() {
        return this.http.get<any>(`${this.url}/network/binary`)
    }

    //Carregar network
    changeNetWork(username) {
        return this.http.get<any>(`${this.url}/network/binary/${username}`)
    }
}

