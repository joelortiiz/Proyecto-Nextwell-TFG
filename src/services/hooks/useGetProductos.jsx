import { useEffect, useState } from 'react';
const useProductos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        // Realizar la solicitud al backend para obtener los datos de los componentes
        const response = await fetch('http://localhost:3001/api/productos'); // Asegúrate de ajustar la URL según la ruta de tu backend
        if (!response.ok) {
          throw new Error('Error al obtener los componentes');
        }
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchProductos();

  }, []);

  return productos;
};

export default useProductos;
