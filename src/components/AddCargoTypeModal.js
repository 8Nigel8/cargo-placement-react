import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';

function AddCargoTypeModal({ open, handleClose, refreshCargoTypes }) {
  const [newType, setNewType] = useState({
    name: '',
    length: '',
    width: '',
    weight: '',
    color: '#000000'
  });

  const handleChange = (event) => {
    setNewType({ ...newType, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    const url = 'http://localhost:8080/cargo_type/create';
    const payload = {
      name: newType.name,
      length: parseFloat(newType.length),
      width: parseFloat(newType.width),
      weight: parseFloat(newType.weight),
      hex_color: newType.color.replace('#', '')
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('Success: New cargo type added');
      handleClose(); // Close modal after successful addition
      refreshCargoTypes(); // Refresh the list of cargo types
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="add-cargo-type-modal"
      aria-describedby="add-new-cargo-type"
    >
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h6" component="h2">
          Додати новий вид вантажу
        </Typography>
        <TextField label="Назва" variant="outlined" name="name" value={newType.name} onChange={handleChange} fullWidth />
        <TextField label="Довжина" type="number" variant="outlined" name="length" value={newType.length} onChange={handleChange} fullWidth />
        <TextField label="Ширина" type="number" variant="outlined" name="width" value={newType.width} onChange={handleChange} fullWidth />
        <TextField label="Вага" type="number" variant="outlined" name="weight" value={newType.weight} onChange={handleChange} fullWidth />
        <TextField type="color" variant="outlined" name="color" value={newType.color} onChange={handleChange} fullWidth sx={{ height: 56 }} />
        <Button onClick={handleSubmit} variant="contained" color="primary">Зберегти</Button>
      </Box>
    </Modal>
  );
}

export default AddCargoTypeModal;