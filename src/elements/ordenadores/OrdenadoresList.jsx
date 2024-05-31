import React from 'react';
import './OrdenadorTable.css';

const OrdenadorTable = ({ ordenadores }) => (

  <table className="ordenador-table">
      {console.log(ordenadores)}
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Procesador</th>
        <th>RAM</th>
        <th>Disco</th>
        <th>Tarjeta Gráfica</th>
        <th>Sistema Operativo</th>
      </tr>
    </thead>
    <tbody>
      {ordenadores.map((subArray, subIndex) => (
        subArray.map(ordenador => (
          <tr key={ordenador.id}>
            <td>{ordenador.nombre}</td>
            <td>{ordenador.cpu}</td>
            <td>{ordenador.gpu}</td>
            <td>{ordenador.torre}</td>
            <td>{ordenador.gpu}</td>
            <td>{ordenador.sistemaOperativo}</td>
          </tr>
        ))
      ))}
    </tbody>
  </table>
);

export default OrdenadorTable;
