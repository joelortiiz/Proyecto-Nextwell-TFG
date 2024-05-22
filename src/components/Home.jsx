import React from 'react';
import styled from 'styled-components';
import { motion } from "framer-motion"
import { useAtuh } from './../context/AuthContext'
import { LogOutButton } from './../elements/LogOutButton';
import { Header } from './../elements/Header';

import { Container, Typography } from '@mui/material';
import ImageCarousel from './../elements/home/ImageCarousel';

const images = [
	{
	  src: 'https://via.placeholder.com/800x400?text=Image+1',
	  text: 'Texto sobre la imagen 1'
	},
	{
	  src: 'https://via.placeholder.com/800x400?text=Image+2',
	  text: 'Texto sobre la imagen 2'
	},
	{
	  src: 'https://via.placeholder.com/800x400?text=Image+3',
	  text: 'Texto sobre la imagen 3'
	},
  ];

const Home = () => {
	const {usuario} = useAtuh();

	
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
			<LogOutButton></LogOutButton>
			<Container>
      <Typography variant="h4" align="center" gutterBottom>
        Image Carousel with Material-UI
      </Typography>
      <ImageCarousel images={images} />
    </Container>
			</>
	);
}

const Titulo = styled.h2`
	margin-bottom: 10px;
`;
 
export default Home;