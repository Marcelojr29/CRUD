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
import { Edit, Delete, Search, FilterList } from '@mui/icons-material';
import UserModal from './userModal';
import { User } from '../../interfaces/userInterface';
import DataTable from '../../components/table-simple';
import { Column } from '../../interfaces/tableSimpleInterface';

const paginationOptions = [10, 50, 100];
const newUserButtonText = 'New User';

const usersTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      firstname: 'Teste',
      lastname: 'Da Silva',
      email: 'testedasilva@gmail.com',
      profile: 'Admin',
      status: 'Active',
    },
    {
      id: 2,
      firstname: 'Teste',
      lastname: 'Da Silva Junior',
      email: 'testedasilvajunior@gmail.com',
      profile: 'Viewer',
      status: 'Inactive',
    },
  ]);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'delete'>(
    'create',
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleOpenModal = (mode: 'create' | 'edit' | 'delete', user?: User) => {
    setSelectedUser(user || null);
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveUser = (user: User) => {
    if (modalMode === 'create') {
      setUsers([...users, { ...user, id: users.length + 1 }]);
    } else if (modalMode === 'edit') {
      setUsers(users.map((u) => (u.id === user.id ? user : u)));
    } else if (modalMode === 'delete' && user.id) {
      setUsers(users.filter((u) => u.id !== user.id));
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

  const columns: Column<User>[] = [
    { key: 'firstname', header: 'First Name' },
    { key: 'lastname', header: 'Last Name' },
    { key: 'email', header: 'Email' },
    { key: 'profile', header: 'Profile' },
    { key: 'status', header: 'Status' },
    {
      key: 'actions',
      header: 'Actions',
      render: (row: User) => (
        <>
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

  const filteredUsers = users.filter(
    (user) =>
      user.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <Typography variant="h4" gutterBottom>
        User
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
            placeholder="Search User"
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
          {newUserButtonText}
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
      <DataTable<User>
        columns={columns}
        data={filteredUsers.slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage,
        )}
      />
      <TablePagination
        component="div"
        rowsPerPageOptions={[10, 50, 100]}
        count={filteredUsers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={() => {}}
      />
      <UserModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveUser}
        userData={selectedUser}
        mode={modalMode}
      />
    </>
  );
};

export default usersTable;
