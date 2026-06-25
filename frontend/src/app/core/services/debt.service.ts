import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Debt } from '../models/debt.model';

@Injectable({
  providedIn: 'root'
})
export class DebtService {
  private http = inject(HttpClient);
  
  getMyDebts(): Observable<Debt[]> {
    return this.http.get<Debt[]>(`${environment.apiUrl}/debts/my-debts`);
  }

  getAllDebts(): Observable<Debt[]> {
    return this.http.get<Debt[]>(`${environment.apiUrl}/debts/all`);
  }

  getDebtsByUser(userId: string): Observable<Debt[]> {
    return this.http.get<Debt[]>(`${environment.apiUrl}/debts/user/${userId}`);
  }

  createDebt(debt: Partial<Debt>): Observable<Debt> {
    return this.http.post<Debt>(`${environment.apiUrl}/debts`, debt);
  }
}