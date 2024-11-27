import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const isRegistered = !!localStorage.getItem('registered'); 

    if (!isRegistered) {
      this.router.navigate(['/error']);
      return false;
    }
    return true;
  }
}