import React from 'react';
import card1 from './../../assets/images/productos/card1.jpg'
import card2 from './../../assets/images/productos/config.jpg'
import card3 from './../../assets/images/productos/tuspedidos.jpg'
import './../global/Card.css'
import { Link } from 'react-router-dom';
const cardsData = [
    {
      title: 'Tus Ordenadores',
      description: 'Visualiza los detalles de tu equipo, solicita una reparación o cambia sus componentes',
      image: card1,
      link: '/Ordenadores', 
    },
    {
      title: 'Comprar Productos',
      description: 'Actualiza tu ordenador y dale la potencia que te mereces !',
      image: card2,
      link: '/User/Compras', 
    },
    {
      title: 'Configurador de PC',
      description: 'Monta tu nuevo ordenador pieza a pieza y genera un presupuesto en minutos !',
      image: card3,
      link: '/Configurador-Pc', 
    },
  ];

const ClientActions = ()=> {
  return (
    <>
    <div className='client__container'>


    {
      cardsData.map((dato, index)=> (
        <Link to={dato.link} >
    <div className="clientcard" key={index}>
        <img src={dato.image} className='clientcard-image' alt="" srcset="" />
        <div className="clientcard-content">
            <h2 className="clientcard-title">{dato.title}</h2>
            <p className="clientcard-description">{dato.description}</p>
        </div>
    </div>
    </Link>
      ))
    }    </div>
    
    </>
  );
}

export default ClientActions;
