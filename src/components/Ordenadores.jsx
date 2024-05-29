import { Header } from '../elements/Header'
import { motion } from 'framer-motion'
import { useGetOrdenadores } from '../services/hooks/useGetOrdenadores';
import ListaOrdenadores from '../elements/ordenadores/OrdenadoresList';
import { HaveNoOrdenadores } from '../elements/ordenadores/HaveNoOrdenadores';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const Ordenadores = (userId) => {

    const [gpus, setGpus] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/gpus');
                setGpus(response.data);
                console.log(response);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchData();
    }, []);



    const ordenadores = useGetOrdenadores();
    console.log(ordenadores);
    return (
        <>
            <Header />
            <div className='container__ordenadores'>
                <section>
                    <article className='text-center'>
                        <div>
                        <motion.h2
                            className='h2'
                            >
                           <em>Estos son tus equipos registrados</em> 
                        </motion.h2>
                        <p >
                        <Link to={"/ordenadores/newordenador"}>Hola </Link>
                        </p>
                        </div>
                     

                    </article>
                    {ordenadores ? (
       <ListaOrdenadores ordenadores={ordenadores} />
      ) : (
        <HaveNoOrdenadores />
      )}
                </section>

            </div>
            <div>
            <h1>GPU List</h1>
            <ul>
                {gpus.map((gpu, index) => (
                    <li key={index}>{gpu}</li>
                ))}
            </ul>
            </div>
        </>
    )
}
