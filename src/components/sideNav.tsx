'use client';

import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton,
  Divider,
  Typography,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  People as PeopleIcon,
  Person as PersonIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
  Assignment as AssignmentIcon,
  Event as EventIcon,
  Business as BusinessIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import Link from 'next/link';

const SideNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openAdmin, setOpenAdmin] = useState(false);
  const [openPlantao, setOpenPlantao] = useState(false);
  const [openEmpresas, setOpenEmpresas] = useState(false);
  const [openConfiguracoes, setOpenConfiguracoes] = useState(false);

  const toggleSideNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Ícone do menu hambúrguer */}
      <IconButton
        onClick={toggleSideNav}
        sx={{ position: 'fixed', top: 16, left: 16, zIndex: 1200 }}
      >
        <MenuIcon />
      </IconButton>

      {/* Drawer lateral */}
      <Drawer
        open={isOpen}
        onClose={toggleSideNav}
        sx={{
          width: isOpen ? 240 : 0,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: isOpen ? 240 : 0,
            boxSizing: 'border-box',
          },
        }}
      >
        <Typography variant="h6" sx={{ p: 2, textAlign: 'center' }}>
          New Age
        </Typography>
        <Divider />

        <List>
          {/* ADMIN */}
          <ListItemButton onClick={() => setOpenAdmin(!openAdmin)}>
            <ListItemIcon>
              <AdminPanelSettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Admin" />
            {openAdmin ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>
          <Collapse in={openAdmin} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link href="/profiles" passHref>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItemButton>
              </Link>
              <Link href="/users" passHref>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText primary="User" />
                </ListItemButton>
              </Link>
            </List>
          </Collapse>

          {/* PLANTÕES */}
          <ListItemButton onClick={() => setOpenPlantao(!openPlantao)}>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Plantões" />
            {openPlantao ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>
          <Collapse in={openPlantao} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link href="/meus-plantoes" passHref>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <EventIcon />
                  </ListItemIcon>
                  <ListItemText primary="Meus Plantões" />
                </ListItemButton>
              </Link>
              <Link href="/criar-plantao" passHref>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <EventIcon />
                  </ListItemIcon>
                  <ListItemText primary="Criar Plantão" />
                </ListItemButton>
              </Link>
            </List>
          </Collapse>

          {/* EMPRESAS */}
          <ListItemButton onClick={() => setOpenEmpresas(!openEmpresas)}>
            <ListItemIcon>
              <BusinessIcon />
            </ListItemIcon>
            <ListItemText primary="Empresas" />
            {openEmpresas ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>
          <Collapse in={openEmpresas} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link href="/empresas" passHref>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <BusinessIcon />
                  </ListItemIcon>
                  <ListItemText primary="Minhas Empresas" />
                </ListItemButton>
              </Link>
              <Link href="/nova-empresa" passHref>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <BusinessIcon />
                  </ListItemIcon>
                  <ListItemText primary="Nova Empresa" />
                </ListItemButton>
              </Link>
            </List>
          </Collapse>

          {/* CONFIGURAÇÕES */}
          <ListItemButton onClick={() => setOpenConfiguracoes(!openConfiguracoes)}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Configurações" />
            {openConfiguracoes ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>
          <Collapse in={openConfiguracoes} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link href="/configuracoes" passHref>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Ajustes Gerais" />
                </ListItemButton>
              </Link>
            </List>
          </Collapse>
        </List>
      </Drawer>
    </>
  );
};

export default SideNav;
