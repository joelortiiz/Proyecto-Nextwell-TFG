import React, { useState, useContext, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth'; 
import { auth } from '../firebase/firebaseConfig'; 

// Crea el contexto de autenticación
const AuthContext = React.createContext();

// Hook personalizado para acceder al contexto de autenticación
const useAtuh = () => {
    return useContext(AuthContext); // Usa useContext para acceder al valor del AuthContext
}

// Componente proveedor de autenticación
const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(); 
    // Estado para almacenar el usuario autenticado
    const [load, setLoading] = useState(true); 
    // Estado para manejar el estado de carga

    useEffect(() => {
        // Suscribirse a los cambios de estado de autenticación
        const logOut = onAuthStateChanged(auth, (usuario) => {
            setUsuario(usuario); 
            // Actualiza el estado del usuario cuando cambia el estado de autenticación
            setLoading(false); 
            // Establece el estado de carga como falso una vez que se verifica el estado del usuario
        });
        return logOut; 
        // Limpia el observador cuando el componente se desmonta
    }, []);

    return (
        // Provee el contexto de autenticación a los componentes hijos
        <AuthContext.Provider value={{ usuario: usuario }}>
            {!load && children} {/* Renderiza los hijos sólo cuando la carga ha finalizado */}
        </AuthContext.Provider>
    );
}

// Exporta el proveedor de autenticación, el contexto y el hook personalizado
export { AuthProvider, AuthContext, useAtuh };
