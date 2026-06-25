import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  template: `
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-4">
          <div class="card shadow-sm">
            <div class="card-body p-4">
              <h3 class="text-center mb-4">Iniciar Sesión</h3>
              <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
                <div class="mb-3">
                  <label for="username" class="form-label">Usuario</label>
                  <input type="text" class="form-control" id="username" formControlName="username">
                  <div *ngIf="loginForm.get('username')?.invalid && loginForm.get('username')?.touched" class="text-danger small">
                    El usuario es requerido
                  </div>
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Contraseña</label>
                  <input type="password" class="form-control" id="password" formControlName="password">
                  <div *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched" class="text-danger small">
                    La contraseña es requerida
                  </div>
                </div>
                <button type="submit" class="btn btn-primary w-100" [disabled]="loginForm.invalid || loading">
                  {{ loading ? 'Ingresando...' : 'Entrar' }}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  loading = false;

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        }
      });
    }
  }
}