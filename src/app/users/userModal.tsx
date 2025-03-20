'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material';
import { User } from '@/interfaces/userInterface';
import { UserModalInterface } from '@/interfaces/userModalInterface';

const UserModal: React.FC<UserModalInterface> = ({
  isOpen,
  onClose,
  onSave,
  userData,
  mode,
}) => {
  const profileOptions = [
    {
      value: 'admin',
      label: 'Admin',
    },
    {
      value: 'user',
      label: 'User',
    },
  ];

  // const statusOptions = [
  //   {
  //     value: 'active',
  //     label: 'Active',
  //   },
  //   {
  //     value: 'inactive',
  //     label: 'Inactive',
  //   },
  // ];

  const saveButtonText = mode === 'delete' ? 'Confirm' : 'Save';

  const [user, setUser] = useState<User>({
    firstname: '',
    lastname: '',
    email: '',
    profile: '',
    status: 'Active',
  });

  useEffect(() => {
    if (userData) {
      setUser(userData);
    } else {
      setUser({
        firstname: '',
        lastname: '',
        email: '',
        profile: '',
        status: 'Active',
      });
    }
  }, [userData]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setUser((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = () => {
    onSave(user);
    onClose();
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setUser((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleStatusChange = (
    event: SelectChangeEvent<'Active' | 'Inactive'>,
  ) => {
    setUser((prev) => ({
      ...prev,
      status: event.target.value as 'Active' | 'Inactive',
    }));
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>
        {mode === 'create'
          ? 'New User'
          : mode === 'edit'
            ? 'Edit User'
            : 'Delete User'}
      </DialogTitle>
      <DialogContent>
        {mode === 'delete' ? (
          <p>Are you sure you want to delete this user?</p>
        ) : (
          <>
            <TextField
              fullWidth
              label="First Name"
              name="firstname"
              value={user.firstname}
              onChange={handleInputChange}
              margin="dense"
              required
            />
            <TextField
              fullWidth
              label="Last Name"
              name="lastname"
              value={user.lastname}
              onChange={handleInputChange}
              margin="dense"
              required
            />
            <TextField
              fullWidth
              label="E-mail"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              margin="dense"
              required
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Profile</InputLabel>
              <Select
                fullWidth
                label="Profile"
                name="profile"
                value={user.profile}
                onChange={handleSelectChange}
                margin="dense"
                required
              >
                {profileOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {mode === 'edit' && (
              <FormControl fullWidth margin="dense">
                <InputLabel>Status</InputLabel>
                <Select
                  fullWidth
                  label="Status"
                  name="status"
                  value={user.status}
                  onChange={handleStatusChange}
                  margin="dense"
                  sx={{
                    bgcolor: user.status === 'Active' ? '#6DA541' : '#D3D3D3',
                    color: '#fff',
                    borderRadius: '5px',
                    width: user.status === 'Active' ? '125px' : '125px',
                  }}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            )}
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          {saveButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserModal;
