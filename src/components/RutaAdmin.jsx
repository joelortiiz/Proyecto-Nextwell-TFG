// import React from 'react';
import { useAtuh } from '../context/AuthContext';
// import { Navigate } from 'react-router-dom';
import { useIsAdmin } from './../services/hooks/useIsAdmin'; // Importa el hook useIsAdmin

export const RutaAdmin = ({ children }) => {
    const usuario = useAtuh().usuario;
    const isAdmin = useIsAdmin(usuario); // Utiliza el hook useIsAdmin para determinar si el usuario es administrador

    if (usuario !== null && isAdmin) { // Verifica si el usuario está autenticado y si es administrador
        return children;
    } 
};
