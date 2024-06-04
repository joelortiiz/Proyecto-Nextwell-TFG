import { Header } from '../elements/global/Header'
import { motion } from 'framer-motion'
import { useGetPedidosConfirmed } from './../services/hooks/useGetPedidosConfirmed';
import {ListaPedidos} from '../elements/pedidos/ListaPedidos';
import { HaveNoOrdenadores } from '../elements/ordenadores/HaveNoOrdenadores';
import { Link } from 'react-router-dom';
import React from 'react';

export const PedidosConfirmed = () => {

 
    const pedidos = useGetPedidosConfirmed();
    console.log(pedidos);
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
                    {pedidos ? (
       <ListaPedidos pedidos={pedidos} />
      ) : (
        <HaveNoOrdenadores />
      )}
                </section>

            </div>
         
        </>
    )
}
