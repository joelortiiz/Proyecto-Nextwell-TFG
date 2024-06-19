import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from './../firebase/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Header } from '../elements/global/Header';
import './Ordenador.css'; 
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from '../elements/global/Footer';

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
            setOrdenador(formValues); 
            setShowConfirmation(true);
        } catch (error) {
            console.error('Error al actualizar el ordenador:', error);
        }
    };

    const handleCloseConfirmation = () => {
        setShowConfirmation(false);
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
        <div className=''>
        <section className='container__ordenadores'>
          <article className='text-center'>
            <div>
              <motion.h2 className='h2'>
                <em>Añadir un nuevo ordenador a tu </em>
              </motion.h2>
              <p>
                <Link to={"/ordenadores"}>Volver a todos tus Equipos </Link>
              </p>
            </div>
          </article>
        </section>
      </div>
      <div className='ccc'>
      <div className="ordenador-container"> 
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
      </div>
      
        <Footer/>
        </>
    );
};
