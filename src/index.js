import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import WebFont from 'webfontloader';
import Contenedor from './elements/Contenedor';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import IniciarSesion from './components/Inicio_sesion';
import RegistroUsuarios from './components/Registro_usuario';
import { AuthProvider } from './context/AuthContext';
import { Helmet } from 'react-helmet';

WebFont.load({
  google: {
    families: ['Roboto:400,500,700', 'Droid Sans:400,700']
  }
});

const Index = () => {
  return (
    <>
    <Helmet>
      <title>NextWell</title>
    </Helmet>
    <AuthProvider>
    <BrowserRouter>
      <Contenedor>

        <Routes >
          <Route path='/iniciar-sesion' element={<IniciarSesion />} />
          <Route path='/crear-cuenta' element={<RegistroUsuarios />} />
          <Route path='/' element={<App />} />
        </Routes>

      </Contenedor>
    </BrowserRouter>
    </AuthProvider>
  
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Index />
);
