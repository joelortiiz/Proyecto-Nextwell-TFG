import React from 'react';
import './tabla.css';
import { useGetPedidosNotConfirmedUser } from '../../services/hooks/useGetPedidosNotConfirmed';
import { Header } from '../global/Header';
import Footer from '../global/Footer';

export const ListaPedidosConfirmedNotConfirmed = () => {
  const pedidos = useGetPedidosNotConfirmedUser();

  const formatDate = (timestamp) => {
    const date = timestamp.toDate();
    return date.toLocaleDateString(); 
  };

  return (
    <>
      <Header />
      <div className="table-container">
        <h2 className='text-center'>Tabla Pedidos sin confirmar</h2>
        <table className="pedidos-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Cliente</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedidoAr, index) => (
              pedidoAr.map((pedido) => (
                <tr key={pedido.id}>
                  <td>{pedido.nombre}</td>
                  <td>{pedido.cliente}</td>
                  <td>{formatDate(pedido.fecha)}</td>
                </tr>
              ))
            ))}
          </tbody>
        </table>
      </div>
      <Footer/>
    </>
  );
};
