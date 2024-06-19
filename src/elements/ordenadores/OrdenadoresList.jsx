import React, { useState } from 'react';
import './OrdenadorTable.css';
import del from './../../assets/images/logos/delete.png';
import edit from './../../assets/images/logos/edit.png';
import { Link, useNavigate } from 'react-router-dom';
import { doc, deleteDoc } from "firebase/firestore";
import { db } from './../../firebase/firebaseConfig';
import ConfirmModal from './ConfirmModal';

const OrdenadorTable = ({ ordenadores, setOrdenadores }) => {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showModal, setShowModal] = useState(false)
  const [ordenadorToDelete, setOrdenadorToDelete] = useState(null);

  const handleDelete = async (id) => {
    try {
      const docRef = doc(db, "ordenadores", id);
      await deleteDoc(docRef);

      // Mostrar mensaje de confirmación
      setShowConfirmation(true);

      // Actualizar el estado de los ordenadores después de eliminar
      setOrdenadores(prevOrdenadores =>
        prevOrdenadores.filter(ordenador => ordenador.id !== id)
      );

      setTimeout(() => {
        setShowConfirmation(false);
        navigate('/'); // Redirigir a la página principal (puedes cambiar la ruta)
      }, 2000); // Mostrar el mensaje durante 2 segundos
    } catch (error) {
      console.error('Error eliminando el ordenador:', error);
    }
  };

  const confirmDelete = (id) => {
    setOrdenadorToDelete(id);
    setShowModal(true);
  };

  const onConfirmDelete = () => {
    handleDelete(ordenadorToDelete);
    setShowModal(false);
    setOrdenadorToDelete(null);
  };

  const onCancelDelete = () => {
    setShowModal(false);
    setOrdenadorToDelete(null);
  };

  return (
    <>
      <table className="ordenador-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Procesador</th>
            <th>RAM</th>
            <th>Disco / Ssd</th>
            <th>Tarjeta Gráfica</th>
            <th>Sistema Operativo</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {ordenadores.map((subArray, subIndex) => (
            subArray.map(ordenador => (
              <tr key={ordenador.id}>
                <td>{ordenador.nombre}</td>
                <td>{ordenador.cpu}</td>
                <td>{ordenador.ram}</td>
                <td>{ordenador.ssd}</td>
                <td>{ordenador.gpu}</td>
                <td>{ordenador.so}</td>
                <td>
                  <>
                    <img
                      src={del}
                      alt="Eliminar"
                      onClick={() => confirmDelete(ordenador.id)}
                      style={{ cursor: 'pointer' }}
                    />
                    <Link to={`/ordenador/${ordenador.id}`}>
                      <img src={edit} alt="Editar" />
                    </Link>
                  </>
                </td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
      <ConfirmModal
        show={showModal}
        message="¿Estás seguro de que deseas eliminar este ordenador?"
        onConfirm={onConfirmDelete}
        onCancel={onCancelDelete}
      />
      {showConfirmation && (
        <div className="confirmation-message">
          Ordenador eliminado con éxito.
        </div>
      )}
     
    </>
  );
};


export default OrdenadorTable;