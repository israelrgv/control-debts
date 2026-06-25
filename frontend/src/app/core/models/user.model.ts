export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: 'ADMIN' | 'CAJERO' | 'ASOCIADO';
  isActive: boolean;
}