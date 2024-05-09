import React from 'react'
import {Helmet} from 'react-helmet'
import {Header, Titulo, ContenedorHeader, ContenedorBotones} from '../elements/Header'
import Boton from '../elements/Boton'
 const registro_usuarios = () => {
  return (
    <>
    <Helmet>
       <title> Registro de usuarios</title>
    </Helmet>

    <Header>
        <ContenedorHeader>
            <Titulo>Registro de usuarios</Titulo>
            <div>
                <Boton to={"/iniciar-sesion"}>Iniciar Sesion</Boton>
            </div>

        </ContenedorHeader>
    </Header>
    </>
  )
}

export default registro_usuarios