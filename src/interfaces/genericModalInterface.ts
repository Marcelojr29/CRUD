export interface GenericModalProps<T> {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: T) => void;
    data: T | null;
    mode: 'create' | 'edit' | 'delete' | 'view';
    fields: {
      key: string;
      label: string;
      type: 'text' | 'select';
      options?: { value: string; label: string }[];
      disabled?: boolean;
    }[];
    title: string;
  }
  