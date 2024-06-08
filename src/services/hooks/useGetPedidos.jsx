import { useState, useEffect, useCallback } from 'react';
import { db } from './../../firebase/firebaseConfig';
import { collection, query, getDocs, where } from 'firebase/firestore';

export const useGetPedidos = () => {
    const [pedidos, setPedidos] = useState([]);

    const fetchPedidos = useCallback(async () => {
        try {
            const queryDoc = query(collection(db, 'cesta'), where('confirmado', '==', 'F'));
            const consulta = await getDocs(queryDoc);

            const pedidosArr = [];
            consulta.forEach((doc) => {
                pedidosArr.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            setPedidos(pedidosArr);
        } catch (error) {
            console.error('Error fetching pedidos:', error);
        }
    }, []);

    useEffect(() => {
        fetchPedidos();
    }, [fetchPedidos]);

    return [pedidos, fetchPedidos];
};
