import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function ContainerInfo({ container, N, onContainerDelete }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/edit_container/${container.id}`);
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        fetch(`http://localhost:8080/container/${container.id}`, {
            method: 'PUT'
        })
        .then(response => {
            if (response.ok) {
                console.log('Container deleted successfully');
                onContainerDelete(container.id);
                navigate('/');
            } else {
                alert('Failed to delete the container');
            }
        })
        .catch(error => {
            console.error('Error deleting container:', error);
        });
    };

    return (
        <div onClick={handleClick} style={{ cursor: 'pointer', marginBottom: "10px", display: 'grid', gridTemplateColumns: '3fr 4fr 2fr', gap: '10px', width: '800px', border: '1px solid #ddd', borderRadius: "10px", padding: '10px' }}>
            <div>
                <p><strong>№:</strong> {N}</p>
                <p><strong>Назва:</strong> {container.name}</p>
                <p><strong>Максимальна вага:</strong> {container.maxWeight} кг</p>
                <p><strong>Розмір:</strong> {container.width} см x {container.length} см</p>
            </div>
            <div>
                <img src={process.env.PUBLIC_URL+"/Контейнер.png"} alt="Container" style={{ width: '100%', height: 'auto' }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <Button onClick={handleDelete} color="error" startIcon={<DeleteIcon />} style={{ marginLeft: "auto" }}>
                </Button>
                <p>{new Date(container.createdAt).toLocaleString()}</p>
            </div>
        </div>
    );
}

export default ContainerInfo;
