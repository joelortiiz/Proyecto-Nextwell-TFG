import React, { useState, useEffect } from 'react';
import { db } from './../firebase/firebaseConfig';
import { subDays, startOfToday, format, parse } from 'date-fns'; // Importa funciones de date-fns

// Importa la librería de gráficos que prefieras (por ejemplo, Chart.js)
import { Line } from 'react-chartjs-2';
import { useGetPedidos } from './../services/hooks/useGetPedidos';
import { LogOutButton } from '../elements/global/LogOutButton';
import { useAtuh } from '../context/AuthContext';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { LinesChart } from './PedidosControl';
import { HeaderAdmin } from '../elements/global/HeaderAdmin';
import cajas from './../assets/images/logos/cajas.svg';
import users from './../assets/images/logos/users.svg';
import { Link } from 'react-router-dom';

export const Admin = () => {
 

    return (
        <div>
            <HeaderAdmin/>

            <h2>Pedidos de la última semana</h2>
          <LinesChart/>
            <div className="CardContainer">
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
        </div>
    );
};

