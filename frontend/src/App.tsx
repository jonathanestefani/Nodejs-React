import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemButton, ListItemText, Divider } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProducerForm from './components/ProducerForm';
import ProducerList from './components/ProducerList';
import Dashboard from './components/Dashboard';
import { Producer } from './interfaces/types';

const App: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Alterna o estado do Drawer (menu lateral)
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleEditProducer = (producer: Producer) => {
    // Lógica para editar o produtor
  };

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        {/* AppBar no topo */}
        <AppBar position="fixed">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Gestão de Produtores Rurais
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Menu Lateral (Drawer) */}
        <Drawer open={drawerOpen} onClose={toggleDrawer}>
          <div style={{ width: 250 }} onClick={toggleDrawer} onKeyDown={toggleDrawer}>
            <List>
              <ListItemButton component={Link} to="/dashboard">
                <ListItemText primary="Dashboard" />
              </ListItemButton>
              <ListItemButton component={Link} to="/cadastro">
                <ListItemText primary="Cadastro de Produtor" />
              </ListItemButton>
              <ListItemButton component={Link} to="/listagem">
                <ListItemText primary="Listagem de Produtores" />
              </ListItemButton>
            </List>
            <Divider />
          </div>
        </Drawer>

        {/* Conteúdo Principal */}
        <main style={{ flexGrow: 1, padding: '80px 20px' }}>
            <Routes>
            <Route path="/" element={<Dashboard />} />
              <Route path="/cadastro" element={<ProducerForm />} />
              <Route path="/listagem" element={<ProducerList onEdit={handleEditProducer} />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
