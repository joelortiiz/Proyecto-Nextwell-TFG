import  {useState, useEffect} from 'react'
import { db } from './../../firebase/firebaseConfig';
import { collection, onSnapshot, query } from 'firebase/firestore';

export const useGetUsuarios = () => {
    const [pedidos, setOrdenadores] = useState([]);

        useEffect(() => {
            
            const consulta = query(collection(db, 'usuarios'))

            const unsuscribe = onSnapshot(consulta, (snapshot) => {
               
               if(snapshot.docs.length > 0) {
                setOrdenadores(snapshot.docs[snapshot.docs.length -1])
                } else {

                }
            setOrdenadores(snapshot.docs.map(ordenador => {return {...ordenador.data(), id: ordenador.id}})
            )
            })
            return unsuscribe
        }, [])
  return [pedidos]
}
