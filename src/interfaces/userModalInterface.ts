import { User } from '@/interfaces/userInterface';

export interface UserModalInterface {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: User) => void;
  userData?: User | null;
  mode: 'create' | 'edit' | 'delete';
}
