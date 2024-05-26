import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Rnd } from "react-rnd";
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CargoTypePanel from './CargoTypePanel';

function ManualPlacement() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [container, setContainer] = useState(state ? state.container : { length: 100, width: 100, maxWeight: 1000 });
  const [cargoTypes, setCargoTypes] = useState([]);
  const [cargos, setCargos] = useState([]);

  const maxWidth = 900;
  const maxHeight = 500;
  const scaleWidth = maxWidth / container.width;
  const scaleHeight = maxHeight / container.length;
  const scale = Math.min(scaleWidth, scaleHeight);

  const fetchCargoTypes = () => {
    fetch('https://cargo-placement.azurewebsites.net/cargo_type/get_all')
      .then(response => response.json())
      .then(data => setCargoTypes(data.map(type => ({
        ...type,
        color: {
          r: parseInt(type.hex_color.substring(0, 2), 16),
          g: parseInt(type.hex_color.substring(2, 4), 16),
          b: parseInt(type.hex_color.substring(4, 6), 16)
        }
      }))))
      .catch(error => console.error('Error fetching cargo types:', error));
  };

  useEffect(() => {
    fetchCargoTypes(); // Fetch on mount
  }, []);

  const savePlacement = () => {
    const payload = {
      name: container.name,
      maxWeight: container.maxWeight,
      length: container.length,
      width: container.width,
      cargos: cargos.map(cargo => ({
        x: cargo.x / scale, // Convert back to original dimensions
        y: cargo.y / scale,
        cargoType: {
          id:cargo.typeId
        }  // Ensure this is the correct identifier for the cargo type
      }))
    };

    fetch('https://cargo-placement.azurewebsites.net/container/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Save successful:', data);
      alert('Cargo placement saved successfully!');
      navigate('/');
    })
    .catch(error => {
      console.error('Error saving cargo placement:', error);
      alert('Failed to save cargo placement.');
    });
  };

  const addCargo = (typeId) => {
    const type = cargoTypes.find(type => type.id === typeId);
    if (type) {
      const newCargo = {
        ...type,
        typeId: type.id,
        x: 50 * scale,
        y: 50 * scale,
        id: Date.now(),
        scale: scale
      };
      setCargos([...cargos, newCargo]);
    }
  };

  return (
    <div>
      <Box sx={{ display: 'flex', height: 'calc(100vh - 120px)' }}>
        <CargoTypePanel cargoTypes={cargoTypes} onAddCargo={addCargo} refreshCargoTypes={fetchCargoTypes}/>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid gray', width: maxWidth, backgroundColor: "#cccccc" }}>
          <Box sx={{ width: `${container.width * scale}px`, height: `${container.length * scale}px`, position: 'relative', backgroundColor: "white" }}>
            {cargos.map(cargo => (
              <Rnd
                key={cargo.id}
                size={{ width: cargo.width * cargo.scale, height: cargo.length * cargo.scale }}
                position={{ x: cargo.x, y: cargo.y }}
                bounds="parent"
                onDragStop={(e, d) => setCargos(cargos.map(c => c.id === cargo.id ? { ...c, x: d.x, y: d.y } : c))}
                style={{
                  display: 'flex',
                  alignItems: "center",
                  justifyContent: 'center',
                  color: `rgba(${cargo.color.r}, ${cargo.color.g}, ${cargo.color.b}, 0.5)`,
                  fontWeight: 'bold',
                  backgroundColor: `rgba(${cargo.color.r}, ${cargo.color.g}, ${cargo.color.b}, 0.3)`,
                  borderColor: `rgba(${cargo.color.r}, ${cargo.color.g}, ${cargo.color.b}, 0.5)`,
                  borderWidth: '7px',
                  borderStyle: 'solid',
                  zIndex: 1000
                }}
                enableResizing={false}
              >
                {cargo.name}
              </Rnd>
            ))}
          </Box>
        </Box>
      </Box>
      <Button variant="contained" color="primary" onClick={savePlacement} sx={{ mt: 2, float: "right", margin: "8px" }}>
        Зберегти розміщення
      </Button>
    </div>
  );
}

export default ManualPlacement
