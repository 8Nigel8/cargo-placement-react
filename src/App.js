import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Dashboard from "./components/Dashboard";
import CreateContainer from "./components/CreateContainer";
import ManualPlacement from "./components/ManualPlacement";
import AutoPlacement from "./components/AutoPlacement";
import Settings from "./components/Settings";
import EditContainer from "./components/EditContainer";

function App() {
  return (
    <Router>
      <AppBar position="fixed" sx={{
        backgroundColor: '#feb043', // сірий колір фону
        color: '#ffffff' // оранжевий колір тексту
      }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CargoPlace
          </Typography>
          <Button color="inherit" component={Link} to="/">Головна</Button>
          <Button color="inherit" component={Link} to="/create-container">Створити контейнер</Button>
          <Button color="inherit" component={Link} to="/settings">Налаштування</Button>
        </Toolbar>
      </AppBar>
      {/* Додавання відступу зверху для компенсації висоти AppBar */}
      <Container sx={{ marginTop: 8 }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create-container" element={<CreateContainer />} />
          <Route path="/manual-placement" element={<ManualPlacement />} />
          <Route path="/edit_container/:id" element={<EditContainer />} />
          <Route path="/auto-placement" element={<AutoPlacement />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
