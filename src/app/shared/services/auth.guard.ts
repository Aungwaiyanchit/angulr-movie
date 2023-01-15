import { Injectable } from '@angular/core';
import {  CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router){}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let val = localStorage.getItem('userLoggedIn');
    if (val !== null && val === 'true') {
      return true
    } else {
      return this.router.navigate(['/login']);
    }
  }
}
