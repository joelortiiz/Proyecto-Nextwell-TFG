import React, {useState} from 'react'
import { Helmet } from 'react-helmet'
import {auth} from '../firebase/firebaseConfig';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import { collection, addDoc } from "firebase/firestore"; 
import {db} from "./../firebase/firebaseConfig";
import { Formulario, Input, ContenedorBoton } from '../elements/Form'
import Boton from '../elements/Boton'
import {useNavigate} from 'react-router-dom'
import Alert from '../elements/Alert';
import advantages1 from "./../assets/images/advantages/customer-service-agent.png"
import { motion } from "framer-motion"
import logo from './../assets/images/logos/logo.jpeg'

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
      // await addDoc(collection(db, "usuario"), {
      //   nombre: correo.split('@')[0],
      //   correo: correo,
      //   rol: 'cliente',
      //   password: password
   // })
   
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
          console.log(error.code)
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

      <div className='container'>
    
    <header className='header'>
   
    <div className='card'> 
    <img src={logo} alt="" className='logo2 animated-image' />

    </div>
     </header>
     <main className='main'>
       <section className='section'>
       <article className='article'>
       <motion.h2
       className='form__title'
       initial={{ y: -50, opacity: 0 }}
       animate={{ y: 0, opacity: 1 }}
       transition={{ delay: 0.2, duration: 0.5 }}
     >
       <em> Register zone</em>
     </motion.h2>
     <motion.div>
       
     </motion.div>
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
         placeholder='Email'
         value={correo}
         onChange={handleChange}
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
         onChange={handleChange}
       />
     <motion.div
       initial={{ x: -100, opacity: 0 }}
       animate={{ x: 0, opacity: 1 }}
       transition={{ delay: 0.6, duration: 0.5 }}
       >
          <input
       className='input'
         type='password'
         name='password2'
         placeholder='Confirm password'
         value={password2}
         onChange={handleChange}
/>
       </motion.div>
             </motion.div>
    
       <motion.div
       className='container__button'>
       <Boton as="button" type='submit' >Create Account !</Boton>
       </motion.div>
       <motion.div>
       
       </motion.div>
     
         

   </motion.form>
    
      <Alert
      type={alert.type}
      message={alert.message}
      statusAlert={estadoAlerta}
      changeAlert={changeAlertStatus}
      />
      <article className='article2'>

<img src={advantages1} className='' alt="" />
</article>
</article>
</section>
</main>

</div>   
 </>
  )

}
export default Registro_usuarios