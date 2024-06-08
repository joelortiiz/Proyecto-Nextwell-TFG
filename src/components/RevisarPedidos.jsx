import React, { useState } from 'react';
import { HeaderAdmin } from '../elements/global/HeaderAdmin';
import { useGetPedidos } from '../services/hooks/useGetPedidos';
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore'; // Asegúrate de importar las funciones necesarias
import { db } from '../firebase/firebaseConfig';
import { Alert } from '@mui/material';

export const RevisarPedidos = () => {
    const [pedidos, fetchPedidos] = useGetPedidos();
    const [alert, changeAlert] = useState({})
    const [estadoAlerta, changeAlertStatus] = useState(false)

    const confirmarPedido = async (pedidoId) => {
        const pedidoRef = doc(db, 'cesta', pedidoId);
        await updateDoc(pedidoRef, { confirmado: 'T'  })
        changeAlertStatus(true)
        changeAlert({
          type: 'exito',
          message: 'Compra confirmada correctamente'
        });
        fetchPedidos(); // Refrescar los pedidos después de actualizar
    };

    const navigate = useNavigate();

    return (
        <>
            <HeaderAdmin />
            <h2>Tabla Ordenadores</h2>
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
                    {pedidos.map((pedido) => (
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
                    ))}
                </tbody>
            </table>
            
            <Alert
                 type={alert.type}
                 message={alert.message}
                 statusAlert={estadoAlerta}
                 changeAlert={changeAlertStatus}
            />
        </>
    );
};
