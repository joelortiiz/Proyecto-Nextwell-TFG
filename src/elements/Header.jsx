import styled from 'styled-components';

import React from 'react'
import './Header.css'
export const Header = () => {
  return (
  
          <nav className="nav-menu">
            <ul className="nav-list">
              <li className="nav-item"><a href="#home">Home</a></li>
              <li className="nav-item"><a href="#about">About</a></li>
              <li className="nav-item"><a href="#services">Services</a></li>
              <li className="nav-item"><a href="#contact">Contact</a></li>
            </ul>
          </nav>
        
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