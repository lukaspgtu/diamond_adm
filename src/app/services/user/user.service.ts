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
	//Listar planos disponiveis para usuario
	public availablePlan() {
		return this.http.get<any>(`${this.url}/plans/available`)
	}

	//Listar PLanos
	public listPlans() {
		return this.http.get<any>(`${this.url}/plans/all`)
	}

	//Link compartilhavel usuario
	public shared(token) {
		return this.http.get<any>(`${this.url}/check/manager/${token}`)
	}

	//Dados usuario
	public viewUser() {
		return this.http.get<any>(`${this.url}/auth`)
	}

	//Dados empresa
	dataServer() {
		return this.http.get<any>(`${this.url}/system/data`)
	}

	//Dados plano
	public dataPlan() {
		return this.http.get<any>(`${this.url}/user/plan`)
	}

	//Alterar perna chave binaria
	public changeKey(binary_key) {
		return this.http.post<any>(`${this.url}/user/change/key`, { binary_key: binary_key })
	}

	//Obter pagamento em aberto
	public paymentPlan() {
		return this.http.get<any>(`${this.url}/user/financial/open_payment`)
	}

	//Validate SMS
	public validatePhone(code: string, to: string) {
		var msg = `Código: ${code}`;
		return this.http.post<any>(`https://api.prosystemsc.com/v1/send/sms`, { send: { to: to, msg: msg } })
	}
}
