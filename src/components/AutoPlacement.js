import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import CargoInfo from './CargoInfo';
import { useNavigate } from 'react-router-dom';
function AutoPlacement() {
  const location = useLocation();
  const container = location.state.container; // Retrieve container details passed via state

  const [cargoTypes, setCargoTypes] = useState([]); // Stores cargo types without user inputs
  const [cargoSelections, setCargoSelections] = useState([]); // Stores user inputs
  const navigate = useNavigate();
  useEffect(() => {
    fetch('http://localhost:8080/cargo_type/get_all')
      .then(response => response.json())
      .then(data => {
        const typesWithColors = data.map(type => ({
          ...type,
          quantity: 0,
          color: `rgb(${parseInt(type.hex_color.substring(0, 2), 16)}, ${parseInt(type.hex_color.substring(2, 4), 16)}, ${parseInt(type.hex_color.substring(4, 6), 16)})`
        }));
        setCargoTypes(typesWithColors);
        setCargoSelections(typesWithColors); 
      })
      .catch(error => console.error('Error fetching cargo types:', error));
  }, []);

  const handleChange = (index, value) => {
    console.log("Index:", index, "Value:", value);  // Debugging line
    const updatedSelections = [...cargoSelections];
    updatedSelections[index].quantity = Number(value);
    setCargoSelections(updatedSelections);
};


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(cargoSelections);
    const payload = {
      container: container,
      
      cargosTypeAndCount: cargoSelections.map(cargo => ({
        
        typeID: cargo.id,
        count: cargo.quantity
      }))
      
    };
    console.log(JSON.stringify(payload))
    fetch('https://cargo-placement.azurewebsites.net/container/auto_placement', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      navigate('/');
    })
    .catch(error => {
      console.error('Error submitting cargo placement:', error);
    });
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6">Автоматичне розміщення</Typography>
      <form onSubmit={handleSubmit}>
        {cargoSelections.map((cargo, index) => (
          <CargoInfo key={cargo.id} cargo={cargo} onChange={handleChange} index={index} />
        ))}
        <Button type="submit" variant="contained" color="primary">Згенерувати</Button>
      </form>
    </Box>
  );
}

export default AutoPlacement;
