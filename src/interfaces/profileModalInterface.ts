import { Profile } from './profileInterface';

export interface ProfileModalInterface {
  isOpen: boolean;
  onClose: () => void;
  onSave: (profile: Profile) => void;
  profileData?: Profile | null;
  mode: 'create' | 'edit' | 'delete' | 'view';
}
