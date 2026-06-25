import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Payment } from '../models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private http = inject(HttpClient);

  registerPayment(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(`${environment.apiUrl}/payments`, payment);
  }

  getPaymentsByDebt(debtId: string): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${environment.apiUrl}/payments/${debtId}`);
  }
}