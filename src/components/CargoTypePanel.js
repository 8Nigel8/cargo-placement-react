// src/components/CargoTypePanel.js
import React, { useState } from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddCargoTypeModal from './AddCargoTypeModal';

const CargoTypePanel = ({ cargoTypes, onAddCargo, onAddType }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{
        width: 200,
        height: '100%',
        overflowY: 'auto', // Enables scrolling
        borderRight: '1px solid #ccc',
        p: 2,
        boxSizing: 'border-box',
        '&::-webkit-scrollbar': {
          display: 'none' // Hides the scrollbar on WebKit browsers
        },
        scrollbarWidth: 'none', // For Firefox
        msOverflowStyle: 'none' // For Internet Explorer and Edge
      }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxSizing: 'border-box' }}>
        <Typography variant="h6" gutterBottom>
          Типи вантажів
        </Typography>
        <IconButton onClick={handleOpen} color="primary" aria-label="add new type">
          <AddIcon />
        </IconButton>
      </Box>
      <AddCargoTypeModal open={open} handleClose={handleClose} />
      {cargoTypes.map(type => (
        <Box key={type.id} sx={{ mb: 2, p: 1, border: '1px solid #ddd', borderColor: `rgba(${type.color.r}, ${type.color.g}, ${type.color.b}, 0.5)`, borderRadius: '4px' }}>
          <Typography variant="body1" color="text.primary">
            {type.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Розміри: {type.width} x {type.length} см
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Вага: {type.weight} кг
          </Typography>
          <Button variant="outlined" size="small" onClick={() => onAddCargo(type.id)} sx={{ mt: 1 }}>
            Додати
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default CargoTypePanel;
