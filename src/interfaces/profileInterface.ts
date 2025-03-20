export interface Profile {
    id: number;
    name: string;
    status: 'Active' | 'Inactive';
    [key: string]: unknown;
  }
  