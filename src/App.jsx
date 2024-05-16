import React from 'react';
import styled from 'styled-components';
import { motion } from "framer-motion"
import { useAtuh } from './context/AuthContext'
import Boton from './elements/Boton';
import { LogOutButton } from './elements/LogOutButton';

const App = () => {
	const {usuario} = useAtuh();
	
	return (
		<Contenedor>
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
		</Contenedor>
	);
}

const Contenedor = styled.div`
	margin: 40px;
	width: 90%;
	max-width: 400px;
	background: #fff;
	padding: 40px;
	border-radius: 5px;
	text-align: center;
`;

const Titulo = styled.h2`
	margin-bottom: 10px;
`;
 
export default App;