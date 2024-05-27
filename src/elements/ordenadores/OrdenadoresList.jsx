import React from 'react';
import './OrdenadorTable.css';

const OrdenadorTable = ({ ordenadores }) => (
  <table className="ordenador-table">
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Marca</th>
        <th>Modelo</th>
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
            <td>{ordenador.marca}</td>
            <td>{ordenador.modelo}</td>
            <td>{ordenador.procesador}</td>
            <td>{ordenador.ram}</td>
            <td>{ordenador.disco}</td>
            <td>{ordenador.tarjetaGrafica}</td>
            <td>{ordenador.sistemaOperativo}</td>
          </tr>
        ))
      ))}
    </tbody>
  </table>
);

export default OrdenadorTable;
