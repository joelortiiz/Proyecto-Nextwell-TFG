import React, { useState, useContext, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

const AuthContext = React.createContext();

//Hook to acess to the context 

const useAtuh = () => {
    return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState();
    const [load, setLoading] = useState(true);


    useEffect(() => {
        const logOut = onAuthStateChanged(auth, (usuario) => {
            setUsuario(usuario)
            setLoading(false)
        });
        return logOut
    }, []);
    return (
        <AuthContext.Provider value={{ usuario: usuario }}>
            {!load && children}
        </AuthContext.Provider>
    )
}

export { AuthProvider, AuthContext, useAtuh }