import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';  

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';  

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    
    const isAuthenticated = this.authService.login(this.username, this.password);

    if (isAuthenticated) {
      
      this.router.navigate(['/inicio']);
    } else {
      
      this.errorMessage = 'Credenciales incorrectas. Por favor, inténtalo de nuevo.';
    }
  }
}