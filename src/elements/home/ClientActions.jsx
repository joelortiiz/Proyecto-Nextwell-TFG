import React from 'react';
import Cards from './../Card'; // Ajusta la ruta según sea necesario
import card1 from './../../assets/images/cards/card1.jpg'

const cardsData = [
    {
      title: 'Tus Ordenadores',
      description: 'Visualiza los detalles de tu equipo, solicita una reparación o cambia sus componentes',
      image: card1,
      link: '/Ordenadores', // Agrega el enlace para cada tarjeta
    },
    {
      title: 'Comprar Productos',
      description: 'Actualiza tu ordenador y dale la potencia que te mereces !',
      image: 'https://via.placeholder.com/',
      link: '/page2', // Agrega el enlace para cada tarjeta
    },
    {
      title: 'Configurador de PC',
      description: 'Monta tu nuevo ordenador pieza a pieza y genera un presupuesto en minutos !',
      image: 'https://via.placeholder.com/',
      link: '/Configurador-Pc', // Agrega el enlace para cada tarjeta
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
