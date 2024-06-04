import { useEffect, useState } from 'react';

const useComponentes = () => {
  const [componentes, setComponentes] = useState([]);

  useEffect(() => {
    const fetchComponentes = async () => {
      try {
        // Realizar la solicitud al backend para obtener los datos de los componentes
        const response = await fetch('http://localhost:3001/api/components'); // Asegúrate de ajustar la URL según la ruta de tu backend
        if (!response.ok) {
          throw new Error('Error al obtener los componentes');
        }
        const data = await response.json();
        setComponentes(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchComponentes();

  }, []);

  return componentes;
};

export default useComponentes;
