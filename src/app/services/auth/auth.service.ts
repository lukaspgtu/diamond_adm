import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LoadingService } from '../loading/loading.service';
import { ConfigHelper } from 'src/app/helpers/ConfigHelper';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserModel } from 'src/app/models/UserModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<UserModel>;

  public currentUser: Observable<UserModel>;

  private url: string = ConfigHelper.Url;

  constructor(
    private http: HttpClient,
    private spinner: LoadingService
  ) {
    this.currentUserSubject = new BehaviorSubject<UserModel>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserModel {
    return this.currentUserSubject.value;
  }

  verifyLogin() {
    return this.http.get<any>(`${this.url}/auth`);
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.url}/login`, { email, password })
      .pipe(map(res => {
        if (res && res.token) {
          localStorage.setItem(ConfigHelper.CurrentUser, JSON.stringify(res));
          this.currentUserSubject.next(res);
        }
        return res;
      }));
  }

  logout() {
    localStorage.removeItem(ConfigHelper.CurrentUser);
    this.currentUserSubject.next(null);
  }
}
