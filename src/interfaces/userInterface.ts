export interface User {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  profile: string;
  status: 'Active' | 'Inactive';
  [key: string]: unknown;
}
