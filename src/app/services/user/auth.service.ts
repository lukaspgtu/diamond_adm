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
  dateRegister: any
  manager: any
  plan: any

  private url: string = ConfigHelper.Url;

  constructor(private http: HttpClient,
    private spinner: LoadingService
  ) {
    this.currentUserSubject = new BehaviorSubject<UserModel>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserModel {
    return this.currentUserSubject.value;
  }

  headers: HttpHeaders = new HttpHeaders({

    "X-Requested-With": "XMLHttpRequest"
  });

  //Logar conta usuairo
  login(username: string, password: string) {
    return this.http.post<any>(`${this.url}/login`, { username, password })
      .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }

  //Registrar novo usuario
  register() {
    this.dateRegister = JSON.parse(localStorage.getItem("register"));
    this.manager = JSON.parse(localStorage.getItem("manager"));
    this.plan = JSON.parse(localStorage.getItem("plan"));
    let dd = this.dateRegister.date.substring(0, 2);
    let mm = this.dateRegister.date.substring(2, 4);
    let yy = this.dateRegister.date.substring(4, 8);
    this.dateRegister.date = `${dd}/${mm}/${yy}`

    this.spinner.show('Registrando...')

    return this.http.post<any>(`${this.url}/register`, {
      name: this.dateRegister.name,
      username: this.dateRegister.username,
      email: this.dateRegister.email,
      birth: this.dateRegister.date,
      password: this.dateRegister.password,
      phone: this.dateRegister.phone,
      plan: this.plan,
      manager: this.manager
    },
      { headers: this.headers })
      .pipe(map(user => {
        this.spinner.hide()
        return user;
      }
      ));
  }

  //Verificar se username ja existe
  verifyUser(username) {
    return this.http.get<any>(`${this.url}/check/username/${username}`)
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem("token");
    localStorage.removeItem("manager");
    this.currentUserSubject.next(null);
  }
}
