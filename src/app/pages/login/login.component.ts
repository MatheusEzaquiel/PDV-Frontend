import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginError: string | null = null;

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loginError = null;

    const { email, password } = this.form.getRawValue();

    this.authService.login(email, password)
    .subscribe({
      next: () => {
        if (this.authService.isAuthenticated()) {
          this.router.navigate(['/pdv']);
        } else {
          console.error('Login retornou sucesso, mas não autenticou');
          this.loginError = 'Erro inesperado ao autenticar. Tente novamente.';
        }
      },
      error: (error) => {
        if (error?.status === 401) {
          this.loginError = 'Email ou senha incorretos. Verifique suas credenciais.';
        } else {
          console.error('Login failed:', error);
          this.loginError = 'Não foi possível acessar o sistema no momento.';
        }
      }
    });
  }
}
