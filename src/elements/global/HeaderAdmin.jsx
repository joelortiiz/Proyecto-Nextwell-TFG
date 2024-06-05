import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useAtuh } from '../../context/AuthContext'
import '@fortawesome/fontawesome-free/css/all.css';
import { motion } from 'framer-motion';
import { LogOutButton } from './LogOutButton';
import logo from './../../assets/images/logos/favicon.png'
import './Header.css'
export const HeaderAdmin = () => {

	
  

    const { usuario } = useAtuh(); // Obtiene el usuario actual del contexto de AuthContext
    const navigate = useNavigate(); // Usa useNavigate para obtener la función de navegación
    const [open, setOpen] = useState(false);

    const toggleMenu = () => {
        setOpen(!open);
      };
    const handleNavigation = (route) => {
      navigate(route); // Navega a la ruta especificada cuando se hace clic en un enlace
    };

  return (
  
          <>
           <div className="menu">
      <div className="menu-header">
             <div className="menu-icon" onClick={toggleMenu}>
          <i className={open ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
        </div>
        <motion.div>
          <img src={logo} alt="" className='header__logo' />
        </motion.div>
        <motion.nav 
        className="nav-menu"
        initial={{ opacity: 0 }}
      animate={{ opacity: 1}}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
        >
             <p className='panel_admin'>
                Panel de control
             </p>
          </motion.nav>
          <motion.div
          
          >
            <div className='container__pfp'>
              <div>
              {
              usuario.photoURL ? <img src={usuario.photoURL} className='pfp' alt="" srcset="" /> : <img src='https://www.w3schools.com/howto/img_avatar.png' className='pfp' alt="" srcset="" />
            }
              </div>
            <div>
              {
              usuario.displayName ? <h3>{usuario.displayName}</h3> : <h3>{usuario.email.split('@')[0]}</h3>
              }
            </div>
            </div>
            <div>
            <LogOutButton/>
            </div>
            
           
          </motion.div>
          </div>
          </>
        
  )
}



const Headerr = styled.div`
    width: 100%;
    padding: 2.5rem; /* 40px */
    display: flex;
    justify-content: space-between;
    align-items: center;
 
    @media(max-width: 60rem){ /* 950px */
        justify-content: start;
    }
`;
 
const Titulo = styled.h1`
    font-weight: normal;
    text-transform: uppercase;
    font-size: 2.5rem; /* 40px */
 
    @media(max-width: 60rem){ /* 950px */
        font-size: 2rem; /* 32px */
    }
`;
 
const ContenedorHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
 
    @media(max-width: 60rem){ /* 950px */
        display: flex;
        flex-direction: column-reverse;
        align-items: center;
 
        & > div {
            display: flex;
            margin-bottom: 1.25rem; /* 20px */
            justify-content: end;
        }
    }
`;
 
const ContenedorBotones = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export {Headerr, Titulo, ContenedorHeader, ContenedorBotones};