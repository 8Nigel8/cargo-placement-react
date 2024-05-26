import React, { useState, useEffect } from 'react';
import ContainerInfo from './ContainerInfo'; // Ensure this is correctly imported

function ContainerTable() {
    const [containers, setContainers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const removeContainerFromList = (id) => {
      setContainers(containers.filter(container => container.id !== id));
    };
    useEffect(() => {
        fetch('https://cargo-placement.azurewebsites.net/container/get_all')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setContainers(data);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div>Завантаження...</div>;
    }

    if (error) {
        return <div>Помилка: {error}</div>;
    }

    return (
        <div>
            <h2>Контейнери</h2>
            {containers.map((container, index) => (
                <ContainerInfo
                key={container.id}
                container={container}
                N={index + 1}
                onContainerDelete={removeContainerFromList} // Ensure this is a function
              />
            ))}
        </div>
    );
}

export default ContainerTable;
