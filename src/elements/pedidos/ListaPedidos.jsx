import React, { useState } from 'react';
import del from './../../assets/images/logos/delete.png';
import { useNavigate } from 'react-router-dom';
import { doc, deleteDoc } from "firebase/firestore";
import { db } from './../../firebase/firebaseConfig';

export const ListaPedidos = ({ pedidos, setOrdenadores }) => {
  
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("¿Estás seguro de que deseas eliminar este ordenador?");
    if (confirmed) {
      try {
        const docRef = doc(db, "pedidos_realizados", id);
        await deleteDoc(docRef);
        // Actualizar el estado de los ordenadores después de eliminar
        setOrdenadores(prevOrdenadores => 
          prevOrdenadores.filter(ordenador => ordenador.id !== id)
        );
        // Mostrar mensaje de confirmación
        setShowConfirmation(true);
        setTimeout(() => {
          setShowConfirmation(false);
          navigate('/'); // Redirigir a la página principal (puedes cambiar la ruta)
        }, 2000); // Mostrar el mensaje durante 2 segundos
      } catch (error) {
        console.error('Error eliminando el ordenador:', error);
      }
    }
  };

  return (
    <>
      {pedidos.map((subArr, index) => (
        <div key={index}>
    {   subArr.map((pedido, index) =>(
        pedido.tipo === "ordenador" ? 
        <>
          <h2>
                Tabla Ordenadores
            </h2>
 <table className="ordenador-table" key={index}>
          
          <thead>
            <tr>
              <th>Categoria</th>
              <th>Modelo</th>
              <th>Fecha</th>
              <th>Precio</th>
              <th>Generar Factura</th>
            </tr>
          </thead>
          <tbody>
            <tr key={pedido.id}>
              <td>{pedido.tipo}</td>
              <td>{pedido.cpu}</td>
              <td>{pedido.ram}</td>
              <td>{pedido.ssd}</td>
              <td>
                <img 
                  src={del} 
                  alt="Eliminar" 
                  onClick={() => handleDelete(pedido.id)} 
                  style={{ cursor: 'pointer' }} 
                />
              </td>
            </tr>
          </tbody>
        </table>
        </> : (
            <div>
<h2>
                Tabla Pedidos
            </h2>
            
        <table className="ordenador-table" key={index}>
            
          <thead>
          <tr>
              <th>Categoria</th>
              <th>Modelo</th>
              <th>Fecha</th>
              <th>Precio</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr key={pedido.id}>
              <td>{pedido.tipo}</td>
              <td>{pedido.cpu}</td>
              <td>{pedido.ram}</td>
              <td>{pedido.ssd}</td>
              <td>
                <img 
                  src={del} 
                  alt="Eliminar" 
                  onClick={() => handleDelete(pedido.id)} 
                  style={{ cursor: 'pointer' }} 
                />
              </td>
            </tr>
          </tbody>
        </table>
        </div>
        )
        
))}
        </div>
      ))}
      {showConfirmation && (
        <div className="confirmation-message">
          <p>El pedido ha sido eliminado.</p>
        </div>
      )}
    </>
  );
};
