import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/user/auth.service';
import { ConfigHelper } from '../helpers/ConfigHelper';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }
    private url: string = ConfigHelper.Url;


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (request.url.includes(`${this.url}/login`)) {
            return next.handle(request);
        }
        // add authorization header with jwt token if available
        let currentUser = this.authService.currentUserValue;
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    // auth: currentUser.token,
                    Authorization: `Bearer ${currentUser.token}`,
                    'X-Requested-With': ' XMLHttpRequest'
                }
            });
        }

        return next.handle(request);
    }
}