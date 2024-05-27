import { Header } from '../elements/Header'
import { motion } from 'framer-motion'
import { getDatabase, ref, child, get } from "firebase/database";
import { useAtuh } from './../context/AuthContext'
import React, { useEffect, useState } from 'react';
import { db } from './../firebase/firebaseConfig';
import { useGetOrdenadores } from '../services/hooks/useGetOrdenadores';

export const Ordenadores = (userId) => {
    const ordenadores = useGetOrdenadores();
    console.log(ordenadores);
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
                    {ordenadores ? (
        <p>El usuario tiene ordenadores registrados.</p>
      ) : (
        <p>El usuario no tiene ordenadores registrados.</p>
      )}
                </section>

            </div>
        </>
    )
}
