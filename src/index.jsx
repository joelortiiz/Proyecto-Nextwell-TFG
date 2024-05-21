import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import IniciarSesion from './components/Inicio_sesion';
import RegistroUsuarios from './components/Registro_usuario';
import { AuthProvider } from './context/AuthContext';
import { Helmet } from 'react-helmet';
import { RutaPrivada } from './components/RutaPrivada';
import { Ordenadores } from './components/Ordenadores';
import { Ordenador } from './components/Ordenador';



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
              <Route path='/sign-in' element={<IniciarSesion />} />
              <Route path='/sign-up' element={<RegistroUsuarios />} />
              
              <Route path='/home' element={
                <RutaPrivada>
                  <Home />
                </RutaPrivada>
              } />
               <Route path='/ordenadores/' element={
                <RutaPrivada>
                 <Ordenadores/>
                </RutaPrivada>
              } /> 
               <Route path='/ordenador/:id' element={
                <RutaPrivada>
                 <Ordenador/>
                </RutaPrivada>
              } /> 

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
