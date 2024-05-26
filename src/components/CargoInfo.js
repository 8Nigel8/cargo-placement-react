import React from 'react';
import { Box, Typography, TextField } from '@mui/material';

function CargoInfo({ cargo, onChange, index }) {
  return (
    <Box
      sx={{
        mb: 2,
        p: 1,
        border: `2px solid ${cargo.color}`, // Встановлення кольору бордеру відповідно до кольору вантажу
        borderRadius: '4px',
        display: 'grid',
        gridTemplateColumns: '3fr 3fr 4fr',
        width:"700px"
      }}
    >
      <div style={{display: "flex", alignItems: "center", justifyContent: 'center', flexDirection:"column"}}>
        <Typography variant="subtitle1">{cargo.name}</Typography>
        <Typography variant="body2">Розміри: {cargo.width} x {cargo.length}</Typography>
        <Typography variant="body2">Вага: {cargo.weight} кг</Typography>
      </div>
      <div style={{display: "flex", alignItems: "center", justifyContent: 'center', flexDirection:"column"}}>
        <img src="Вантаж.png" alt="Container" style={{ width: '150px', height: 'auto' }} />
      </div>
      <div style={{display: "flex", alignItems: "center", justifyContent: 'center', flexDirection:"column"}}>
      <TextField
        type="number"
        label="Quantity"
        value={cargo.quantity}
        onChange={(e) => onChange(index, e.target.value)}
        sx={{ width: '100px', ml: 1 }}
        InputProps={{ inputProps: { min: 0 } }}
      />
      </div>
    </Box>
  );
}

export default CargoInfo;
