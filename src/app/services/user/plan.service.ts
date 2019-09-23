import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ConfigHelper } from 'src/app/helpers/ConfigHelper';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  private url: string = ConfigHelper.Url;

  constructor(private http: HttpClient) {
  }

  //Alterar plano usuario 
  upgradePlan(plan: string) {
    return this.http.post<any>(`${this.url}/plan/hire`, { plan: plan })
  }

  //Puxar dados plano carreira
  carreirPlan(){
    return this.http.get<any>(`${this.url}/plans/career`)
  }
}
