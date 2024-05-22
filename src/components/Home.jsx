import React from 'react';
import styled from 'styled-components';
import { motion } from "framer-motion"
import { useAtuh } from './../context/AuthContext'
import { LogOutButton } from './../elements/LogOutButton';
import { Header } from './../elements/Header';

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
			</>
	);
}

const Titulo = styled.h2`
	margin-bottom: 10px;
`;
 
export default Home;