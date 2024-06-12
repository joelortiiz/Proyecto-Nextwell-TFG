import React from 'react';
import './tabla.css';

export const ListaPedidosConfirmed = ({ pedidos }) => {
  const formatDate = (timestamp) => {
    const date = timestamp.toDate();
    return date.toLocaleDateString(); // Puedes personalizar el formato aquí
  };

  return (
    <div>
      <h2>Tabla Pedidos</h2>
      {pedidos.map((pedidoAr, index) => (
        <div key={index} className="table-container">
          <table className="pedidos-table" key={pedidoAr.id}>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Cliente</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {pedidoAr.map((pedido) => (
                <tr key={pedido.id}>
                  <td>{pedido.nombre}</td>
                  <td>{pedido.cliente}</td>
                  <td>{formatDate(pedido.fecha)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

