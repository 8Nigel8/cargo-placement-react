import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function CreateContainer() {
  const [container, setContainer] = useState({
    name: '',
    maxWeight: '',
    width: '',
    length: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setContainer({ ...container, [e.target.name]: e.target.value });
  };

  const validateContainer = () => {
    const { name, maxWeight, width, length } = container;
    if (!name.trim()) {
      alert("Назва не може бути порожньою.");
      return false;
    }
    if (maxWeight < 0 || width < 0 || length < 0) {
      alert("Вага, ширина та довжина не можуть бути від'ємними.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateContainer()) {
      console.log(container);
      navigate('/'); // Navigate to the dashboard or wherever appropriate after creation
    }
  };

  const handleManual = (e) => {
    e.preventDefault();
    if (validateContainer()) {
      navigate('/manual-placement', { state: { container } });
    }
  };
  
  const handleAuto = (e) => {
    e.preventDefault();
    if (validateContainer()) {
      navigate('/auto-placement', { state: { container } });
    }
  };

  return (
    <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Додати новий контейнер
      </Typography>
      <Box component="form" sx={{ mt: 2 }}>
        <TextField
          type="text"
          name="name"
          value={container.name}
          onChange={handleChange}
          label="Назва"
          variant="outlined"
          required
          fullWidth
          margin="normal"
        />
        <TextField
          type="number"
          name="maxWeight"
          value={container.maxWeight}
          onChange={handleChange}
          label="Максимальна вага"
          variant="outlined"
          required
          fullWidth
          margin="normal"
        />
        <TextField
          type="number"
          name="width"
          value={container.width}
          onChange={handleChange}
          label="Ширина"
          variant="outlined"
          required
          fullWidth
          margin="normal"
        />
        <TextField
          type="number"
          name="length"
          value={container.length}
          onChange={handleChange}
          label="Довжина"
          variant="outlined"
          required
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" onClick={handleManual} sx={{ mr: 2 }}>
          Ручне розміщення
        </Button>
        <Button type="submit" variant="contained" color="primary" onClick={handleAuto}>
          Автоматичне розміщення
        </Button>
      </Box>
    </Box>
  );
}

export default CreateContainer;
