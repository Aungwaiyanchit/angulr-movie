import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy, OnInit{
  private userName: string = '';
  private password: string = '';
  private loginSubscription!: Subscription;
  isLoading: boolean = false;

  formData: FormGroup = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl('')
  })
  
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    let val = localStorage.getItem('userLoggedIn');
    let isUserLoggedIn = val !== null && val === 'true';
    console.log(isUserLoggedIn)
    if (isUserLoggedIn) {
      this.router.navigate(['/'])
    }
  }

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
  }

  handleSubmit(data: { userName: string, password: string }) {
    this.userName = data.userName;
    this.password = data.password;
    this.isLoading = true;
    this.loginSubscription = this.authService.login(this.userName, this.password).subscribe({
      next: ((res) => {
        console.log(res)
        if(res) {
          this.isLoading = false;
          this.router.navigate(['/'])
          window.location.reload();
        } else {
          this.isLoading = false;
        }
      }),
    })
  }
}
