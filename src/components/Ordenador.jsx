import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from './../firebase/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Header } from '../elements/Header';
import './Ordenador.css'; // Importa tus estilos CSS

export const Ordenador = () => {
    const { id } = useParams();
    const [ordenador, setOrdenador] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formValues, setFormValues] = useState({});
    const [showConfirmation, setShowConfirmation] = useState(false); // Estado para mostrar la confirmación

    useEffect(() => {
        const fetchOrdenadorById = async () => {
            try {
                const docRef = doc(db, 'ordenadores', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setOrdenador({ id: docSnap.id, ...docSnap.data() });
                    setFormValues({ id: docSnap.id, ...docSnap.data() });
                } else {
                    setError('No se encontró el ordenador con la ID proporcionada');
                }
            } catch (error) {
                console.error('Error getting document:', error);
                setError('Error al obtener el documento');
            } finally {
                setLoading(false);
            }
        };

        fetchOrdenadorById();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const docRef = doc(db, 'ordenadores', id);
            await updateDoc(docRef, formValues);
            console.log('Ordenador actualizado con éxito');
            setOrdenador(formValues); // Actualizar el estado con los nuevos valores
            setShowConfirmation(true); // Mostrar la confirmación
        } catch (error) {
            console.error('Error al actualizar el ordenador:', error);
        }
    };

    const handleCloseConfirmation = () => {
        setShowConfirmation(false); // Ocultar la confirmación al cerrar
    };

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
        <Header />
        <div className="ordenador-container"> {/* Clase para estilos CSS */}
            <h2>Editar Ordenador</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre:
                    <input
                        type="text"
                        name="nombre"
                        value={formValues.nombre || ''}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Nombre:
                    <input
                        type="text"
                        name="gpu"
                        value={formValues.gpu || ''}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Nombre:
                    <input
                        type="text"
                        name="cpu"
                        value={formValues.cpu || ''}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    SSD:
                    <input
                        type="text"
                        name="ssd"
                        value={formValues.ssd || ''}
                        onChange={handleInputChange}
                    />
                </label>
                {/* Agregar más campos según la estructura de tu objeto 'ordenador' */}
                <button type="submit">Guardar Cambios</button>
            </form>
            {showConfirmation && (
                <div className="confirmation-message"> {/* Clase para estilos CSS */}
                    <p>¡Ordenador actualizado con éxito!</p>
                    <button onClick={handleCloseConfirmation}>Cerrar</button>
                </div>
            )}
        </div>
        </>
    );
};
