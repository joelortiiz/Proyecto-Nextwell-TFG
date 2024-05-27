import React from 'react'
import { Header } from '../elements/Header'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
export const NewOrdenador = () => {
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
         
        </section>

    </div>
</>
  )
}
