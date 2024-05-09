import React from 'react'
import { Helmet } from 'react-helmet'
import { Header, Titulo, ContenedorHeader, ContenedorBotones } from '../elements/Header'
import { ContenedorFiltros, Formulario, Input, InputGrande, ContenedorBoton } from '../elements/Form'
import Boton from '../elements/Boton'


export const inicio_sesion = () => {
  return (
    <>
      <Helmet>
        <title>Inicio Sesion</title>
      </Helmet>

      <Header>
        <ContenedorHeader>
          <Titulo>Iniciar Sesion</Titulo>
          <div>
            <Boton to={"/crear-cuenta"}>Registro Usuario</Boton>
          </div>

        </ContenedorHeader>
      </Header>
      <Formulario>
        <Input
          type='email'
          name='email'
          placeholder='Correo Electronico'
        />
        <Input
          type='password'
          name='password'
          placeholder='Repetir contraseña'
        />
        <ContenedorBoton>
          <Boton as="button" type='submit' primario>Iniciar Sesion</Boton>

        </ContenedorBoton>
      </Formulario>
    </>
  )
}
export default inicio_sesion