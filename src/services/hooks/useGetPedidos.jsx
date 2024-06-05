import { useState, useEffect } from 'react'
import { db } from './../../firebase/firebaseConfig';
import { collection, query, getDocs, where } from 'firebase/firestore';


export const useGetPedidos = () => {

    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        const fetchPedidos = async () => {
            try {

                const queryDoc = query(collection(db, 'cesta'), where('confirmado', '==', 'F'))
                const consulta = await getDocs(queryDoc);

                const pedidosArr = []
                consulta.forEach((doc) => {
                    // Verificamos si el usuario es administrador
                    pedidosArr.push(doc.data())
                     console.log(doc.data())
                });
                console.log(pedidosArr)
                setPedidos(pedidosArr)
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        fetchPedidos();

    }, [])
    return [pedidos]
}
