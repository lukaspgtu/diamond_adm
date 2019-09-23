import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate {
  constructor(
    private router: Router
  ) { }

  canActivate() {

    const token = localStorage.getItem('token');

    console.log(token);

    if (token) {
      return true;
    }

    this.router.navigate(['/login']);
  }
}