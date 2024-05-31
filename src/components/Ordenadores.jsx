import { Header } from '../elements/Header'
import { motion } from 'framer-motion'
import { useGetOrdenadores } from '../services/hooks/useGetOrdenadores';
import ListaOrdenadores from '../elements/ordenadores/OrdenadoresList';
import { HaveNoOrdenadores } from '../elements/ordenadores/HaveNoOrdenadores';
import { Link } from 'react-router-dom';
import React from 'react';

export const Ordenadores = (userId) => {

 
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
                        <Link to={"/ordenadores/newordenador"}> ¿Quieres añadir un nuevo equipo ? </Link>
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
         
        </>
    )
}
