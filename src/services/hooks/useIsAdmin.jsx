import React from 'react'
import { useState, useEffect } from 'react';
import { db } from './../../firebase/firebaseConfig';

export const useIsAdmin = (usuario) => {

    const [user, setUser] = useState(null);
    debugger
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const snapshot = await db.collection('usuarios').where('id', '==', usuario.id).get();
                if (!snapshot.empty) {
                    const userData = snapshot.docs.data().isAdmin;
                    setUser(userData);
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, [usuario]);
  return  user
}
