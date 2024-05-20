import React, {useState} from 'react'
import { Helmet } from 'react-helmet'
import { Titulo, ContenedorHeader } from '../elements/Header'
import Boton from '../elements/Boton'
import {useNavigate} from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import {auth} from '../firebase/firebaseConfig';
import Alert from '../elements/Alert'
import './Inicio_sesion.css'

import { motion } from "framer-motion" 

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

<div>
    
     <header className='header'>
        <ContenedorHeader>
        <motion.h2
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Titulo>Iniciar Sesion</Titulo>
      </motion.h2>
          <div>
            <Boton to={"/crear-cuenta"}>Registro Usuario</Boton>
          </div>

        </ContenedorHeader>
      </header>
      <main>
        <section>

      <motion.form
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className='form'
    >
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <input
          className='input'
          type='email'
          name='email'
          placeholder='Mail'
          value={correo}
          onChange={handleOnChange}
        />
              </motion.div>
              <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <input
        className='input'
          type='password'
          name='password'
          placeholder='Password'
          value={password}
          onChange={handleOnChange}
        />
              </motion.div>

        <motion.div
        className='container__button'>
        <Boton as="button" type='submit' primario>Iniciar Sesion</Boton>

        </motion.div>
          

    </motion.form>
    </section>

    </main>

    </div>

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