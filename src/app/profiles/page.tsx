'use client';

import React, { useState } from 'react';
import {
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
  TablePagination,
  TextField,
  Box,
} from '@mui/material';
import {
  Edit,
  Delete,
  Search,
  FilterList,
  Visibility,
} from '@mui/icons-material';
import GenericModal from '@/components/genericModal';
import { Profile } from '@/interfaces/profileInterface';
import DataTable from '@/components/table-simple';
import { Column } from '@/interfaces/tableSimpleInterface';

const paginationOptions = [10, 50, 100];
const newProfileButtonText = 'New Profile';

const ProfilesTable: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([
    {
      id: 1,
      name: 'Admin',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Viewer',
      status: 'Inactive',
    },
  ]);

  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<
    'create' | 'edit' | 'delete' | 'view'
  >('create');
  const [searchTerm, setSearchTerm] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleOpenModal = (
    mode: 'create' | 'edit' | 'delete' | 'view',
    profile?: Profile,
  ) => {
    setSelectedProfile(profile || null);
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveProfile = (profile: Profile) => {
    if (modalMode === 'create') {
      setProfiles([
        ...profiles,
        { ...profile, id: profiles.length + 1, status: 'Active' },
      ]);
    } else if (modalMode === 'edit') {
      setProfiles(profiles.map((p) => (p.id === profile.id ? profile : p)));
    } else if (modalMode === 'delete' && profile.id) {
      setProfiles(profiles.filter((p) => p.id !== profile.id));
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (value: number) => {
    setRowsPerPage(value);
    setPage(0);
    setAnchorEl(null);
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseFilter = () => {
    setAnchorEl(null);
  };

  const columns: Column<Profile>[] = [
    { key: 'name', header: 'Profile' },
    {
      key: 'status',
      header: 'Status',
      render: (row: Profile) => (
        <Typography
          sx={{
            bgcolor: row.status === 'Active' ? '#6DA541' : '#D3D3D3',
            color: '#fff',
            padding: '5px 10px',
            borderRadius: '5px',
            display: 'inline-block',
            width: row.status === 'Active' ? '68px' : '77px',
            textAlign: 'center',
          }}
        >
          {row.status}
        </Typography>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (row: Profile) => (
        <>
          <IconButton
            onClick={() => handleOpenModal('view', row)}
            color="primary"
          >
            <Visibility />
          </IconButton>
          <IconButton
            onClick={() => handleOpenModal('edit', row)}
            color="primary"
          >
            <Edit />
          </IconButton>
          <IconButton
            onClick={() => handleOpenModal('delete', row)}
            color="secondary"
          >
            <Delete />
          </IconButton>
        </>
      ),
    },
  ];

  const filteredProfiles = profiles.filter((profile) =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        gap={1}
        margin="10px"
      >
        {searchOpen && (
          <TextField
            autoFocus
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Type to filter results"
            sx={{ width: '200px' }}
          />
        )}
        <IconButton onClick={() => setSearchOpen(!searchOpen)}>
          <Search />
        </IconButton>
        <IconButton onClick={handleFilterClick}>
          <FilterList />
        </IconButton>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenModal('create')}
          style={{ borderRadius: '20px' }}
        >
          {newProfileButtonText}
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseFilter}
        >
          {paginationOptions.map((option) => (
            <MenuItem
              key={option}
              onClick={() => handleChangeRowsPerPage(option)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <DataTable<Profile>
        columns={columns}
        data={filteredProfiles.slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage,
        )}
      />
      <TablePagination
        component="div"
        rowsPerPageOptions={[10, 50, 100]}
        count={filteredProfiles.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={(event) =>
          handleChangeRowsPerPage(parseInt(event.target.value, 10))
        }
      />
      <GenericModal<Profile>
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveProfile}
        data={selectedProfile}
        mode={modalMode}
        fields={[
          { key: 'name', label: 'Profile Name', type: 'text' },
          {
            key: 'status',
            label: 'Status',
            type: 'select',
            options: [
              { value: 'Active', label: 'Active' },
              { value: 'Inactive', label: 'Inactive' },
            ],
            disabled: modalMode === 'create',
          },
        ]}
        title={
          modalMode === 'create'
            ? 'New Profile'
            : modalMode === 'edit'
              ? 'Edit Profile'
              : 'Delete Profile'
        }
      />
    </>
  );
};

export default ProfilesTable;
