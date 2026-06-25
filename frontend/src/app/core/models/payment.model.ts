export interface Payment {
  id?: string;
  debtId: string;
  amount: number;
  paymentMethod: 'EFECTIVO' | 'TRANSFERENCIA' | 'TARJETA';
  referenceNumber: string;
  notes: string;
  paymentDate?: string;
}