import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';

import './Header.css'
export const Header = () => {
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
        <nav className="nav-menu">
             <ul className={open ? 'menu-list open' : 'menu-list'}>
              <li className="nav-item" onClick={() => handleNavigation('/home')}> <p>Home</p></li>
              <li className="nav-item" onClick={() =>handleNavigation('/Ordenadores/')}><p>Ordenadores</p></li>
              <li className="nav-item" onClick={() =>handleNavigation('/Servicios/')}><p>Services</p></li>
              <li className="nav-item" onClick={() =>handleNavigation('/aaa/')}><p>Contact</p></li>
            </ul>
          </nav>
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