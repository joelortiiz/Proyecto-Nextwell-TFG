import  {useState, useEffect} from 'react'
import { db } from './../../firebase/firebaseConfig';
import { useAtuh } from '../../context/AuthContext';
import { collection, onSnapshot, query, orderBy, where, limit } from 'firebase/firestore';

export const useGetOrdenadores = () => {
    const {usuario} = useAtuh();
    const [ordenadores, setOrdenadores] = useState([]);

        useEffect(() => {
            
            const consulta = query(collection(db, 'ordenadores'), where('userId', '==', usuario.uid))

            const unsuscribe = onSnapshot(consulta, (snapshot) => {
               
               if(snapshot.docs.length > 0) {
                setOrdenadores(snapshot.docs[snapshot.docs.length -1])
                } else {

                }
            setOrdenadores(snapshot.docs.map(ordenador => {return {...ordenador.data(), id: ordenador.id}})
            )
            })
            return unsuscribe
        }, [usuario])
  return [ordenadores]
}
