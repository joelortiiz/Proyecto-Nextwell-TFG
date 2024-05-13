import React, {useState} from 'react'
import { Helmet } from 'react-helmet'
import {auth} from './../firebase/firebaseConfig';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import { Header, Titulo, ContenedorHeader, ContenedorBotones } from '../elements/Header'
import { ContenedorFiltros, Formulario, Input, InputGrande, ContenedorBoton } from '../elements/Form'
import Boton from '../elements/Boton'
import {useNavigate} from 'react-router-dom'
import Alert from '../elements/Alert';

const Registro_usuarios = () => {
  const navigate = useNavigate()
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [estadoAlerta, changeAlertStatus] = useState(false)
  const [alert, changeAlert] = useState({})


  const handleChange = (e) => {
    switch (e.target.name) {
      case 'email':
        setCorreo(e.target.value)
        break;
        case 'password':
        setPassword(e.target.value)
        break;
        case 'password2':
        setPassword2(e.target.value)
        break;
    default:
      break;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    changeAlertStatus(false)
    changeAlert({})
    const validateEmail = 	/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;

    if(!validateEmail.test(correo)){
      changeAlertStatus(true)
     changeAlert({
      type: 'error',
      mensaje: "Por favor ingrese un correo electronico valido"
     })
      return
    }
    if(correo === '' || password === '' || password2 === '')
      {changeAlertStatus(true)
      changeAlert({
       type: 'error',
       mensaje: "Todos los campos son obligatorios"
      })
      return
    }
    if(password !== password2){
      changeAlertStatus(true)
      changeAlert({
       type: 'error',
       mensaje:"Las contraseñas no son iguales"
      })
      return
    }

    try {
      await createUserWithEmailAndPassword(auth, correo, password)
      console.log('usuario registrado')
      navigate('/')
    } catch (error) {
      changeAlertStatus(true)
      let message;
      switch(error.code){
        case 'auth/wrong-password':
					message = 'La contraseña no es correcta.'
					break;
				case 'auth/email-already-in-use':
					message = 'Este correo electrónico ya está registrado.'
					break;
				default:
					message = 'Hubo un error al intentar crear la cuenta.'
				break;
      }
      changeAlert({
        type: 'error',
        mensaje: message
      })
    }
     
    }

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
      <Formulario onSubmit={handleSubmit}>
        <Input
          type='email'
          name='email'
          placeholder='Correo Electronico'
      value={correo}
      onChange={handleChange}
        />
        <Input
          type='password'
          name='password'
          placeholder='Repetir contraseña'
          value={password}
          onChange={handleChange}

        />
        <Input
          type='password'
          name='password2'
          placeholder='Repetir contraseña'
          value={password2}
          onChange={handleChange}

        />
        <ContenedorBoton>
          <Boton as="button" type='submit' >Crear cuenta</Boton>

        </ContenedorBoton>
      </Formulario>
      <Alert
      type={alert.type}
      mensaje={alert.mensaje}
      statusAlert={estadoAlerta}
      changeAlert={changeAlertStatus}
      />
    </>
  )

}
export default Registro_usuarios