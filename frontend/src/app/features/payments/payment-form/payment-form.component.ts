import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { PaymentService } from '../../../core/services/payment.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  template: `
    <div class="container mt-4 mb-5">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="card shadow-sm border-0">
            <div class="card-header bg-success text-white p-3">
              <h4 class="mb-0">Registrar Pago para Deuda #{{debtId}}</h4>
            </div>
            <div class="card-body p-4">
              <form [formGroup]="paymentForm" (ngSubmit)="onSubmit()">
                <div class="row g-3">
                  <div class="col-md-6 mb-3">
                    <label class="form-label fw-bold">Monto a Pagar</label>
                    <div class="input-group">
                      <span class="input-group-text">$</span>
                      <input type="number" class="form-control" formControlName="amount">
                    </div>
                  </div>
                  <div class="col-md-6 mb-3">
                    <label class="form-label fw-bold">Método de Pago</label>
                    <select class="form-select" formControlName="paymentMethod">
                      <option value="EFECTIVO">Efectivo</option>
                      <option value="TRANSFERENCIA">Transferencia Bancaria</option>
                      <option value="TARJETA">Tarjeta de Crédito/Débito</option>
                    </select>
                  </div>
                </div>
                
                <div class="mb-3">
                  <label class="form-label fw-bold">Número de Referencia (Opcional)</label>
                  <input type="text" class="form-control" formControlName="referenceNumber" placeholder="Nro de operación o voucher...">
                </div>
                
                <div class="mb-4">
                  <label class="form-label fw-bold">Notas</label>
                  <textarea class="form-control" formControlName="notes" rows="2" placeholder="Observaciones adicionales..."></textarea>
                </div>

                <hr class="mt-4 mb-4">

                <div class="d-flex justify-content-end gap-3">
                  <button type="button" class="btn btn-outline-secondary" (click)="cancel()">Cancelar</button>
                  <button type="submit" class="btn btn-success px-4" [disabled]="paymentForm.invalid">
                    Confirmar Pago
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class PaymentFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private paymentService = inject(PaymentService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  debtId: string = '';

  paymentForm: FormGroup = this.fb.group({
    amount: ['', [Validators.required, Validators.min(1)]],
    paymentMethod: ['EFECTIVO', Validators.required],
    referenceNumber: [''],
    notes: ['']
  });

  ngOnInit() {
    this.debtId = this.route.snapshot.paramMap.get('debtId') || '';
  }

  onSubmit() {
    if (this.paymentForm.valid) {
      const paymentData = { ...this.paymentForm.value, debtId: this.debtId };
      this.paymentService.registerPayment(paymentData).subscribe({
        next: () => {
          this.router.navigate(['/deudas']);
        },
        error: (err) => {
          console.error(err);
          this.router.navigate(['/deudas']);
        }
      });
    }
  }

  cancel() {
    this.router.navigate(['/deudas']);
  }
}