import React from 'react';
import Cards from './../Card'; 
import card1 from './../../assets/images/cards/card1.jpg'

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
      image: 'https://via.placeholder.com/',
      link: '/User/Compras', 
    },
    {
      title: 'Configurador de PC',
      description: 'Monta tu nuevo ordenador pieza a pieza y genera un presupuesto en minutos !',
      image: 'https://via.placeholder.com/',
      link: '/Configurador-Pc', 
    },
  ];

const ClientActions = ()=> {
  return (
    <div className="App">
      <Cards cardsData={cardsData} />
    </div>
  );
}

export default ClientActions;
