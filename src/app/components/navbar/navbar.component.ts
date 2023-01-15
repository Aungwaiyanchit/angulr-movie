import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  isUserLoggedIn!: boolean;
  isNavOpen: boolean = false;

  constructor(private authService: AuthService, private router: Router){}

  ngOnInit(): void {
    let val = localStorage.getItem('userLoggedIn');
    this.isUserLoggedIn = val !== null && val === 'true';

  }

  handleLogout() {
    this.isUserLoggedIn = false;
    this.isNavOpen = false;
    this.authService.logout();
  }

  openMobileNavbar() {
    this.isNavOpen = !this.isNavOpen;
    if (this.isNavOpen) {
      document.body.style.overflow = 'hidden';
    }
  }

  toggleLink(path: string) {
    this.isNavOpen = false;
    this.router.navigate([path]);
    document.body.style.overflow = 'unset';
  }

}
