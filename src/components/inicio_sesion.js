import React, {useState} from 'react'
import { Helmet } from 'react-helmet'
import { Header, Titulo, ContenedorHeader } from '../elements/Header'
import {  Formulario, Input,  ContenedorBoton } from '../elements/Form'
import Boton from '../elements/Boton'
import {useNavigate} from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import {auth} from './../firebase/firebaseConfig';
import Alert from '../elements/Alert'

export const Inicio_sesion = () => {
  const navigate = useNavigate()
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [estadoAlerta, changeAlertStatus] = useState(false)
  const [alert, changeAlert] = useState({})


  const handleOnChange = (e) => {
    if(e.target.name === 'email'){
      setCorreo(e.target.value)
    } else if(e.target.name === 'password'){
      setPassword(e.target.value)
    }
  } 

  const handleSubmit = async (e) => {
    e.preventDefault()
    debugger
    changeAlertStatus(false)
    changeAlert({})
    const validateEmail = 	/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;

    if(!validateEmail.test(correo)){
      changeAlertStatus(true)
     changeAlert({
      type: 'error',
      message: "Por favor ingrese un correo electronico valido"
     })
      return
    }
    if(correo === '' || password === '' ) {
      changeAlertStatus(true)
      changeAlert({
       type: 'error',
       message: "Todos los campos son obligatorios"
      })
      return
    }
  

    try {
      await signInWithEmailAndPassword(auth, correo, password)
      navigate('/')
    } catch (error) {
      changeAlertStatus(true)
      let message;
      console.log(error.code)
      switch(error.code){
        case 'auth/invalid-credential':
					message = 'El usuario o contraseña no son correctos.'
					break;
				case 'auth/user-not-found':
          message = 'El usuario o contraseña no son correctos.'
					break;
				default:
					message = 'Hubo un error al intentar iniciar sesión.'
				break;
      }
      changeAlert({
        type: 'error',
        message: message
      })
    }
     
    }
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
      <Formulario onSubmit={handleSubmit}>
        <Input
          type='email'
          name='email'
          placeholder='Correo Electronico'
          value={correo}
          onChange={handleOnChange}
        />
        <Input
          type='password'
          name='password'
          placeholder='contraseña'
          value={password}
          onChange={handleOnChange}
        />
        <ContenedorBoton>
          <Boton as="button" type='submit' primario>Iniciar Sesion</Boton>

        </ContenedorBoton>
      </Formulario>
      <Alert
      type={alert.type}
      message={alert.message}
      statusAlert={estadoAlerta}
      changeAlert={changeAlertStatus}
      />
    </>
  )
}
export default Inicio_sesion