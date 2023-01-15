import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isUserLoggedIn: boolean = false;
  constructor(private router: Router) { }

  login(userName: string, password: string) {
    this.isUserLoggedIn = userName === 'admin' && password === 'admin';
    localStorage.setItem('userLoggedIn', this.isUserLoggedIn ? 'true': 'false');
    return of (this.isUserLoggedIn).pipe(delay(1000))
  }

  logout() {
    this.isUserLoggedIn = false;
    localStorage.removeItem('userLoggedIn');
    this.router.navigate(['/'])
  }

}
