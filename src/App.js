import React from 'react';
import styled from 'styled-components';
import { motion } from "framer-motion"
import { useAtuh } from './context/AuthContext'

const App = () => {
	const {usuario} = useAtuh();
	
	return (
		<Contenedor>
			<Titulo>Bienvenido a NextWell </Titulo>
			<motion.div
  whileHover={{ scale: 1.2 }}
  whileTap={{ scale: 1.1 }}
  drag="x"
  dragConstraints={{ left: -100, right: 100 }}
/>
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