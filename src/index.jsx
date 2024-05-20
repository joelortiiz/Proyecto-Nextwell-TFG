import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import IniciarSesion from './components/Inicio_sesion';
import RegistroUsuarios from './components/Registro_usuario';
import { AuthProvider } from './context/AuthContext';
import { Helmet } from 'react-helmet';
import { RutaPrivada } from './components/RutaPrivada';



const Index = () => {
  return (
    <>
      <Helmet>
        <title>NextWell</title>
			  <link rel="icon" href="./assets/images/logos/favicon.png" type="image/png"/>
		
      </Helmet>
      <AuthProvider>
        <BrowserRouter>

            <Routes>
              <Route path='/iniciar-sesion' element={<IniciarSesion />} />
              <Route path='/crear-cuenta' element={<RegistroUsuarios />} />
              
              <Route path='/' element={
                <RutaPrivada>
                  <App />
                </RutaPrivada>
              } />
              {/* <Route path='/ordenadores/:id' element={
                <RutaPrivada>
                  <Ordenadores />
                </RutaPrivada>
              } /> */}

            </Routes>
        </BrowserRouter>
      </AuthProvider>

    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Index />
);
