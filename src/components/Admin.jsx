import React from 'react';

import { LinesChart } from './PedidosControl';
import { HeaderAdmin } from '../elements/global/HeaderAdmin';
import cajas from './../assets/images/logos/cajas.svg';
import users from './../assets/images/logos/users.svg';
import { Link } from 'react-router-dom';

export const Admin = () => {

  const fechaActual = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const fechaFormateada = fechaActual.toLocaleDateString('es-ES', options);

  return (
    <div>
      <HeaderAdmin />

      <h2>Pedidos de la última semana</h2>

      <div className="CardAdmin__Container">
        <Link to="/Admin/revisar-pedidos">
          <div className="Card">
            <img src={cajas} className='cajas' alt="" />
            <h2 className="CardTitle">Revisar pedidos</h2>
          </div>
        </Link>
        <Link to="/Admin/lista-usuarios">
          <div className="Card" >
            <img src={users} className='cajas' alt="" />

            <h2 className="CardTitle">Lista de usuarios</h2>
          </div>
        </Link>
      </div>

      <LinesChart />
      <footer>
        <p className='text-center'>
          <em>

         
          Hoy es

          {
            " " + fechaFormateada
          }
           </em>
        </p>
      </footer>
    </div>
  );
};

