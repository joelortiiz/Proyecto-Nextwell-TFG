import { Header } from '../elements/global/Header'
import { motion } from 'framer-motion'
import {ListaPedidos} from '../elements/pedidos/ListaPedidos';
import { HaveNoOrdenadores } from '../elements/ordenadores/HaveNoOrdenadores';
import { Link } from 'react-router-dom';
import React from 'react';
import Footer from '../elements/global/Footer';
import { useGetPedidosConfirmedUser } from '../services/hooks/useGetPedidosConfirmUser';
import { ListaPedidosConfirmed } from '../elements/pedidos/ListaPedidosConfirmed';

export const PedidosConfirmed = () => {

 
    const pedidos = useGetPedidosConfirmedUser();
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
                           <em>Estos son tus pedidos</em> 
                        </motion.h2>
                        <p >
                        <Link to={"/ordenadores/newordenador"}> ¿Quieres añadir un nuevo equipo ? </Link>
                        </p>
                        </div>
                     

                    </article>
                    {pedidos ? (
       <ListaPedidosConfirmed pedidos={pedidos} />
      ) : (
        <HaveNoOrdenadores />
      )}
                </section>

            </div>
            <Footer/>
        </>
    )
}
