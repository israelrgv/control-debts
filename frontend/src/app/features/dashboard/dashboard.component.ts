import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AsyncPipe, NgIf],
  template: `
    <div class="container mt-4">
      <div class="card shadow-sm border-0 bg-light">
        <div class="card-body p-5 text-center" *ngIf="authService.currentUser$ | async as user">
          <h2 class="display-5 text-primary mb-3">Bienvenido, {{ user.fullName }}</h2>
          <p class="lead">Sistema de Control de Deudas</p>
          <div class="my-4">
            <span class="badge rounded-pill bg-primary px-3 py-2 fs-6">Rol: {{ user.role }}</span>
          </div>
          <hr class="my-4">
          <p class="text-muted">Utiliza el menú de navegación en la parte superior para acceder a las opciones disponibles según tu rol.</p>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent {
  authService = inject(AuthService);
}