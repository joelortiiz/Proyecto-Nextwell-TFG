import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import WebFont from 'webfontloader';
import Contenedor from './elements/Contenedor';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import IniciarSesion from './components/inicio_sesion';
import RegistroUsuarios from './components/registro_usuario';

import { Helmet } from 'react-helmet';

WebFont.load({
  google: {
    families: ['Work Sans: 400,500,700', 'sans-serif']
  }
});

const Index = () => {
  return (
    <>
    <Helmet>
      <title>NextWell</title>
    </Helmet>
    <BrowserRouter>
      <Contenedor>

        <Routes>
          <Route path='/iniciar-sesion' element={<IniciarSesion />} />
          <Route path='/crear-cuenta' element={<RegistroUsuarios />} />
          <Route path='/' element={<App />} />
        </Routes>

      </Contenedor>

    </BrowserRouter>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Index />
);
