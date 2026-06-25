import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/auth/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: 'dashboard', 
    canActivate: [authGuard],
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  { 
    path: 'deudas', 
    canActivate: [authGuard],
    loadComponent: () => import('./features/debts/debt-list/debt-list.component').then(m => m.DebtListComponent)
  },
  { 
    path: 'deudas/nueva', 
    canActivate: [authGuard],
    loadComponent: () => import('./features/debts/debt-form/debt-form.component').then(m => m.DebtFormComponent)
  },
  { 
    path: 'pagos/nuevo/:debtId', 
    canActivate: [authGuard],
    loadComponent: () => import('./features/payments/payment-form/payment-form.component').then(m => m.PaymentFormComponent)
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
];