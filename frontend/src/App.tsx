import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import ProducerForm from './components/ProducerForm';
import ProducerList from './components/ProducerList';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Alterna o estado do Drawer (menu lateral)
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
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
              <ListItem button component={Link} to="/cadastro">
                <ListItemText primary="Cadastro de Produtor" />
              </ListItem>
              <ListItem button component={Link} to="/listagem">
                <ListItemText primary="Listagem de Produtores" />
              </ListItem>
              <ListItem button component={Link} to="/dashboard">
                <ListItemText primary="Dashboard" />
              </ListItem>
            </List>
            <Divider />
          </div>
        </Drawer>

        {/* Conteúdo Principal */}
        <main style={{ flexGrow: 1, padding: '80px 20px' }}>
          <Switch>
            <Route path="/cadastro">
              <ProducerForm />
            </Route>
            <Route path="/listagem">
              <ProducerList />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route exact path="/">
              <Typography variant="h4" component="h2">
                Bem-vindo ao Sistema de Gestão de Produtores Rurais
              </Typography>
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default App;
