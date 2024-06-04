import { useEffect, useState } from 'react';
import { db } from './../../firebase/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

export const useIsAdmin = (usuario) => {
    const [isAdmin, setIsAdmin] = useState(false); // Estado para almacenar si el usuario es administrador

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const q = query(collection(db, 'usuarios'), where('id', '==', usuario.uid));
                const consulta = await getDocs(q);

                consulta.forEach((doc) => {
                    // Verificamos si el usuario es administrador
                    if (doc.data().isAdmin === true) {
                        setIsAdmin(true);
                    }
                });
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        // Llamar a la función fetchUser
        fetchUser();
    }, [usuario]); // La dependencia del efecto es el objeto usuario

    return isAdmin; // Devuelve el estado isAdmin para que pueda ser utilizado en el componente que llama a useIsAdmin
};
