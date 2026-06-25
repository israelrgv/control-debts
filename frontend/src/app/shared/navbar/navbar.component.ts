import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm" *ngIf="authService.currentUser$ | async as user">
      <div class="container">
        <a class="navbar-brand fw-bold" routerLink="/dashboard">Control Deudas</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <a class="nav-link" routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/deudas" routerLinkActive="active">Deudas</a>
            </li>
          </ul>
          <div class="d-flex align-items-center mt-3 mt-lg-0">
            <div class="bg-white bg-opacity-25 rounded-pill px-3 py-1 me-3 text-light border border-light border-opacity-25">
              <i class="bi bi-person-circle me-1"></i> {{ user.fullName }} 
              <span class="badge bg-light text-primary ms-2">{{ user.role }}</span>
            </div>
            <button class="btn btn-outline-light btn-sm" (click)="logout()">Salir</button>
          </div>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent {
  authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }
}