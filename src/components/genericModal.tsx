'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material';
import { GenericModalProps } from '@/interfaces/genericModalInterface';

const GenericModal = <T extends Record<string, unknown>>({
  isOpen,
  onClose,
  onSave,
  data,
  mode,
  fields,
  title,
}: GenericModalProps<T>) => {
  const [formData, setFormData] = useState<T>({} as T);

  useEffect(() => {
    if (mode === 'create') {
      setFormData({ ...data, status: 'Active' } as unknown as T);
    } else {
      setFormData((data ?? {}) as T);
    }
  }, [data, mode]);

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>,
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {mode === 'delete' ? (
          <Typography>Are you sure you want to delete this item?</Typography>
        ) : (
          fields.map((field) => (
            <FormControl fullWidth margin="dense" key={field.key}>
              {field.type === 'text' && (
                <TextField
                  fullWidth
                  label={field.label}
                  name={field.key}
                  value={String(formData[field.key] || '')}
                  onChange={handleInputChange}
                  margin="dense"
                  required
                  disabled={field.disabled || mode === 'view'}
                />
              )}
              {field.type === 'select' && (
                <>
                  <InputLabel>{field.label}</InputLabel>
                  <Select
                    fullWidth
                    label={field.label}
                    name={field.key}
                    value={String(formData[field.key] || 'Active')}
                    onChange={handleInputChange}
                    margin="dense"
                    disabled={field.disabled || mode === 'view'}
                    sx={{
                      bgcolor:
                        formData[field.key] === 'Active'
                          ? '#6DA541'
                          : '#D3D3D3',
                      color: '#fff',
                      borderRadius: '5px',
                      width:
                        formData[field.key] === 'Active' ? '125px' : '125px',
                    }}
                  >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                  </Select>
                </>
              )}
            </FormControl>
          ))
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        {mode !== 'view' && (
          <Button onClick={handleSubmit} color="primary" variant="contained">
            {mode === 'delete' ? 'Confirm' : 'Save'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default GenericModal;
