import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Rnd } from "react-rnd";
import { Box, CircularProgress } from '@mui/material';

function EditContainer() {
    const { id } = useParams();
    const [container, setContainer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`https://cargo-placement.azurewebsites.net/container/${id}`)
            .then(res => res.json())
            .then(data => {
                if (!data || !data.cargos) {
                    throw new Error("Invalid data structure from server");
                }
                const enhancedCargos = data.cargos.map(cargo => {
                    const color = cargo.cargoType && cargo.cargoType.hex_color ? parseHexColor(cargo.cargoType.hex_color) : { r: 0, g: 0, b: 0 };
                    return { ...cargo, color };
                });
                setContainer({ ...data, cargos: enhancedCargos });
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch container:', err);
                setError(err);
                setLoading(false);
            });
    }, [id]);

    const parseHexColor = (hex) => {
        if (!hex || hex.length !== 6) return { r: 0, g: 0, b: 0 };
        return {
            r: parseInt(hex.substring(0, 2), 16),
            g: parseInt(hex.substring(2, 4), 16),
            b: parseInt(hex.substring(4, 6), 16)
        };
    };

    if (loading) return <CircularProgress />;
    if (error) return <div>Помилка: {error}</div>;
    if (!container) return <div>Незнайдено контейнера</div>;

    const maxWidth = 900;
    const maxHeight = 400;
    const scaleWidth = maxWidth / container.width;
    const scaleHeight = maxHeight / container.length;
    const scale = Math.min(scaleWidth, scaleHeight);

    return (
        <div>
            <h2>{container.name}</h2>
            <p>Максимальна вага: {container.maxWeight} кг</p>
            <p>Розмір: {container.width} x {container.length} cm</p>
            <p>Дата створення: {new Date(container.createdAt).toLocaleString()}</p>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid gray', width: maxWidth, backgroundColor: "#cccccc" }}>
                <Box sx={{ width: `${container.width * scale}px`, height: `${container.length * scale}px`, position: 'relative', backgroundColor: "white" }}>
                    {container.cargos.map(cargo => (
                        console.log(cargo.cargoType),
                        <Rnd
                            key={cargo.id}
                            size={{ width: cargo.cargoType.width * scale, height: cargo.cargoType.length * scale }}
                            position={{ x: cargo.x*scale, y: cargo.y*scale }}
                            bounds="parent"
                            disableDragging={true}
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
                            {cargo.cargoType.name}
                        </Rnd>
                    ))}
                </Box>
            </Box>
        </div>
    );
}

export default EditContainer;
