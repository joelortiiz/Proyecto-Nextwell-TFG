import { useState, useEffect } from 'react';
import { db } from './../../firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export const useGetOrdenadorById = (ordenadorId) => {
    const [ordenador, setOrdenador] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrdenadorById = async () => {
            try {
                if (!ordenadorId) {
                    setError('ID del ordenador no proporcionada');
                    return;
                }

                const docRef = doc(db, 'ordenadores', ordenadorId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setOrdenador({ id: docSnap.id, ...docSnap.data() });
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
    }, [ordenadorId]);

    return { ordenador, loading, error };
};
