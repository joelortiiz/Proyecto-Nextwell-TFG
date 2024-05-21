import React, {useState} from 'react'
import { Helmet } from 'react-helmet'
import {auth} from '../firebase/firebaseConfig';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import { collection, addDoc } from "firebase/firestore"; 
import {db} from "./../firebase/firebaseConfig";
import { Header, Titulo, ContenedorHeader } from '../elements/Header'
import { Formulario, Input, ContenedorBoton } from '../elements/Form'
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
      message: "Por favor ingrese un correo electronico valido"
     })
      return
    }
    if(correo === '' || password === '' || password2 === '')
      {changeAlertStatus(true)
      changeAlert({
       type: 'error',
       message: "Todos los campos son obligatorios"
      })
      return
    }
    if(password !== password2){
      changeAlertStatus(true)
      changeAlert({
       type: 'error',
       message:"Las contraseñas no son iguales"
      })
      return
    }

    try {
      await createUserWithEmailAndPassword(auth, correo, password)
      await addDoc(collection(db, "usuario"), {
        nombre: correo.split('@')[0],
        correo: correo,
        rol: 'cliente',
        password: password
    })
      console.log('usuario registrado')
      navigate('/sign-in')
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
        message: message
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
            <Boton to={"/sig-in"}>Sign - In</Boton>
          </div>

        </ContenedorHeader>
      </Header>
      <Formulario onSubmit={handleSubmit}>
        <Input
          type='email'
          name='email'
          placeholder='Email'
      value={correo}
      onChange={handleChange}
        />
        <Input
          type='password'
          name='password'
          placeholder='Repeat password'
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
          <Boton as="button" type='submit' >Create Account !</Boton>

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
export default Registro_usuarios