import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { ConfigHelper } from '../helpers/ConfigHelper';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private url: string = ConfigHelper.Url;

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.url.includes(`${this.url}/login`)) {
      return next.handle(request);
    }

    let currentUser = this.authService.currentUserValue;

    if (currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`,
          'X-Requested-With': ' XMLHttpRequest'
        }
      });
    }

    return next.handle(request);
  }
}
