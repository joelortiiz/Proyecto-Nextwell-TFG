import React, { useState } from 'react'
import { HeaderAdmin } from '../elements/global/HeaderAdmin'
import { useGetPedidos } from '../services/hooks/useGetPedidos';
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc } from "firebase/firestore"; // Asegúrate de importar las funciones necesarias
import { db } from '../firebase/firebaseConfig';


export const RevisarPedidos = () => {


    const pedidos = useGetPedidos();


    const confirmarPedido = async (pedidoId) => {
        const pedidoRef = doc(db, "cesta", pedidoId);
        await updateDoc(pedidoRef, {
          confirmado: "T"
        });
      };
   
  const navigate = useNavigate();

 

  return (
    <>
     <HeaderAdmin/>
     <h2>
                Tabla Ordenadores
            </h2>
            <table className="ordenador-table">
  <thead>
    <tr>
      <th>Categoria</th>
      <th>Modelo</th>
      <th>Fecha</th>
      <th>Precio</th>
      <th>Generar Factura</th>
    </tr>
  </thead>
  <tbody>
    {pedidos.map((subArr, index) => 
      subArr.map((pedido) => (
        <tr key={pedido.id}>
          <td>{pedido.categoria}</td>
          <td>{pedido.nombre}</td>
          <td>
            {pedido.fecha && typeof pedido.fecha.toDate === 'function'
              ? pedido.fecha.toDate().toLocaleDateString()
              : 'Fecha no disponible'}
          </td>
          <td>{pedido.precio} €</td>
          <td>
          <button onClick={() => confirmarPedido(pedido.id)}>Confirmar</button>
             
          </td>
          
        </tr>
      ))
    )}
  </tbody>
</table>


    </>
  )
}
