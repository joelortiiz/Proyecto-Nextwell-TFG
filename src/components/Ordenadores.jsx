import React from 'react'
import { Header } from '../elements/Header'
import { motion } from 'framer-motion'
export const Ordenadores = () => {
    return (
        <>
            <Header />
            <div className='container__ordenadores'>
                <section>
                    <article>
                        <motion.h2
                            className='h2'>
                            Ordenadores
                        </motion.h2>
                    </article>
                </section>

            </div>
        </>
    )
}
