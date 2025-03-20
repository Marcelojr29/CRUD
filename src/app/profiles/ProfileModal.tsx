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
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material';
import { Profile } from '@/interfaces/profileInterface';
import { ProfileModalInterface } from '@/interfaces/profileModalInterface';

const ProfileModal: React.FC<ProfileModalInterface> = ({
  isOpen,
  onClose,
  onSave,
  profileData,
  mode,
}) => {
  const [profile, setProfile] = useState<Profile>({
    id: 0,
    name: '',
    status: 'Active',
  });

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

  useEffect(() => {
    if (profileData) {
      setProfile(profileData);
    } else {
      setProfile({
        id: 0,
        name: '',
        status: 'Active',
      });
    }
  }, [profileData]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setProfile((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleStatusChange = (
    event: SelectChangeEvent<'Active' | 'Inactive'>,
  ) => {
    setProfile((prev) => ({
      ...prev,
      status: event.target.value as 'Active' | 'Inactive',
    }));
  };

  const handleSubmit = () => {
    onSave(profile);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>
        {mode === 'create'
          ? 'New Profile'
          : mode === 'edit'
            ? 'Edit Profile'
            : mode === 'view'
              ? 'View Profile'
              : 'Delete Profile'}
      </DialogTitle>
      <DialogContent>
        {mode === 'delete' ? (
          <p>Are you sure you want to delete this profile?</p>
        ) : (
          <>
            <TextField
              fullWidth
              label="Profile Name"
              name="name"
              value={profile.name}
              onChange={handleInputChange}
              margin="dense"
              required
              disabled={mode === 'view'}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Status</InputLabel>
              <Select
                fullWidth
                name="status"
                value={profile.status}
                onChange={handleStatusChange}
                margin="dense"
                disabled={mode === 'create' || mode === 'view'}
                sx={{
                  bgcolor: profile.status === 'Active' ? '#6DA541' : '#D3D3D3',
                  color: '#fff',
                  borderRadius: '5px',
                  width: profile.status === 'Active' ? '125px' : '125px',
                }}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        {mode !== 'view' && (
          <Button onClick={handleSubmit} color="primary" variant="contained">
            {saveButtonText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ProfileModal;
