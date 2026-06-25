export interface Debt {
  id: string;
  userId: string;
  userName: string;
  debtType: string;
  description: string;
  amount: number;
  originalAmount: number;
  interestRate: number;
  issueDate: string;
  dueDate: string;
  status: 'PENDIENTE' | 'PAGADO_PARCIAL' | 'PAGADO';
  totalPaid: number;
  pendingBalance: number;
}