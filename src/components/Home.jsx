import React, {useEffect} from 'react';
import styled from 'styled-components';
import { motion } from "framer-motion"
import { useAtuh } from './../context/AuthContext'
import { Header } from '../elements/global/Header';

import { Container, Typography } from '@mui/material';
import ImageCarousel from './../elements/home/ImageCarousel';
import ClientActions from './../elements/home/ClientActions';
import { useIsAdmin } from '../services/hooks/useIsAdmin';
import { Productos } from './Productos';
import { useNavigate } from 'react-router-dom';
import setup3 from './../assets/images/productos/setup2.jpg'
import setup1 from './../assets/images/productos/setup1 (1).jpg'
import setup2 from './../assets/images/productos/setup3.jpg'
import Footer from './../elements/global/Footer';

const images = [
	{
	  src: setup1,
	  text: 'El Set-up de tus sueños a tu alcance'
	},
	{
	  src: setup2,
	  text: 'Todos tus equipos en el mismo escritorio'
	},
	{
	  src: setup3,
	  text: ''
	},
  ];

const Home = () => {
	const { usuario } = useAtuh();
    const isAdmin = useIsAdmin(usuario);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAdmin) {
            navigate('/Admin');
        }
    }, [isAdmin, navigate]);
	return (
		<>
            <Header/>
			<Titulo>Bienvenido a NextWell </Titulo>
			{usuario ? (
				<motion.h3
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 2 }}
				>
					¡Hola {usuario.email}!
				</motion.h3>
			) : (
				<motion.h3
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1 }}
				>
					No has iniciado sesión
				</motion.h3>
			)}
			
			<Container>
   
      <ImageCarousel images={images} />
    </Container>
		<ClientActions/>
		<Container>
			<Productos/>
		</Container>
		<Footer/>
			</>
	);
}

const Titulo = styled.h2`
	margin-bottom: 10px;
`;
 
export default Home;