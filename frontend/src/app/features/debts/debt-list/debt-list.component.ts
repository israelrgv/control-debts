import { Component, inject, OnInit } from '@angular/core';
import { DebtService } from '../../../core/services/debt.service';
import { AuthService } from '../../../core/services/auth.service';
import { Debt } from '../../../core/models/debt.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-debt-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mt-4">
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
        <h2 class="text-primary fw-bold mb-3 mb-md-0">Listado de Deudas</h2>
        <button *ngIf="canManage()" class="btn btn-primary shadow-sm" routerLink="/deudas/nueva">
          <i class="bi bi-plus-circle me-2"></i>Nueva Deuda
        </button>
      </div>

      <div class="card shadow-sm border-0">
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-hover table-striped mb-0 align-middle">
              <thead class="table-light">
                <tr>
                  <th class="ps-4">ID</th>
                  <th>Tipo</th>
                  <th>Descripción</th>
                  <th>Monto</th>
                  <th>Emisión</th>
                  <th>Vencimiento</th>
                  <th>Estado</th>
                  <th>Saldo Pend./th>
                  <th *ngIf="canManage()" class="text-end pe-4">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let debt of debts">
                  <td class="ps-4">#{{ debt.id }}</td>
                  <td><span class="badge bg-secondary">{{ debt.debtType }}</span></td>
                  <td>{{ debt.description }}</td>
                  <td class="fw-bold">{{ debt.amount | currency }}</td>
                  <td>{{ debt.issueDate | date:'shortDate' }}</td>
                  <td>{{ debt.dueDate | date:'shortDate' }}</td>
                  <td>
                    <span class="badge rounded-pill" [ngClass]="{
                      'bg-warning text-dark': debt.status === 'PENDIENTE',
                      'bg-info text-dark': debt.status === 'PAGADO_PARCIAL',
                      'bg-success': debt.status === 'PAGADO'
                    }">{{ debt.status }}</span>
                  </td>
                  <td class="text-danger fw-bold">{{ debt.pendingBalance | currency }}</td>
                  <td *ngIf="canManage()" class="text-end pe-4">
                    <button class="btn btn-sm btn-outline-success" [routerLink]="['/pagos/nuevo', debt.id]">
                      Registrar Pago
                    </button>
                  </td>
                </tr>
                <tr *ngIf="debts.length === 0">
                  <td colspan="9" class="text-center py-5 text-muted">
                    <i class="bi bi-inbox fs-2 d-block mb-2"></i>
                    No hay deudas registradas
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DebtListComponent implements OnInit {
  private debtService = inject(DebtService);
  public authService = inject(AuthService);
  debts: Debt[] = [];

  ngOnInit() {
    this.loadDebts();
  }

  loadDebts() {
    const role = this.authService.getUserRole();
    if (role === 'ASOCIADO') {
      this.debtService.getMyDebts().subscribe(res => this.debts = res || []);
    } else {
      this.debtService.getAllDebts().subscribe(res => this.debts = res || []);
    }
  }

  canManage(): boolean {
    const role = this.authService.getUserRole();
    return role === 'ADMIN' || role === 'CAJERO';
  }
}