import React, { useState } from 'react';
import { HeaderAdmin } from '../elements/global/HeaderAdmin';
import { useGetPedidos } from '../services/hooks/useGetPedidos';
import { Link, useNavigate } from 'react-router-dom';
import { Timestamp, addDoc, collection, doc, updateDoc } from 'firebase/firestore'; // Asegúrate de importar las funciones necesarias
import { db } from '../firebase/firebaseConfig';
import { useGetPedidosConfirmed } from '../services/hooks/useGetPedidosConfirmed';
import Alert from '../elements/global/Alert';
import load from './../assets/images/carga-unscreen.gif';
import pdf from './../assets/images/logos/export.svg'
import jsPDF from 'jspdf';
import logo from '../assets/images/logos/Untitled design.png';
import { useAtuh } from '../context/AuthContext';


export const RevisarPedidos = () => {
    const {usuario} = useAtuh();
    const [pedidos, fetchPedidos] = useGetPedidos();
    const [pedidosConfirm, setPedidosConfirm] = useGetPedidosConfirmed(); 
    const [alert, changeAlert] = useState({})
    const [loading, setLoading] = useState(false);
    const [estadoAlerta, changeAlertStatus] = useState(false)
    const [confirmarCompra, setConfirmarCompra] = useState(false);
    const [productToBuy, setProductoAComprar] = useState(null);

    
const handleCompra = async (pedido) => {
    setProductoAComprar(pedido);
    setConfirmarCompra(true);
}
const cancelCompraHandler = () => {
    setConfirmarCompra(false);
};
    const confirmarPedido = async (pedido) => {
        console.log(pedido)
        const pedidoRef = doc(db, 'cesta', pedido.id);
        await updateDoc(pedidoRef, { confirmado: 'T'  })

        const newPedidoCompletado = {
                    
              nombre: pedido.nombre,
              cliente: pedido.cliente,
            adminId: usuario.uid,
            clienteId: pedido.userId,
            precio: pedido.precio,
            fecha: Timestamp.fromDate(new Date()),
        };
        await addDoc(collection(db, 'pedidos_completados'), newPedidoCompletado);

        setConfirmarCompra(false)
        changeAlertStatus(true)
        changeAlert({
          type: 'exito',
          message: 'Compra confirmada correctamente'
        });
        fetchPedidos();
        console.log(pedidosConfirm) // Refrescar los pedidos después de actualizar
    };

    const generatePDF = (pedido) => {
        const pdf = new jsPDF();
        
        // Agrega el logo
        const imgWidth = 35;
        const imgHeight = 35;
        pdf.addImage(logo, 'PNG', 10, 10, imgWidth, imgHeight);
      
        // Agrega el título
        pdf.setFontSize(20);
        pdf.text('Factura Admin.', 70, 40);
      
        // Agrega las selecciones de componentes con precios
        pdf.setFontSize(11);
        pdf.text(20, 65, `Nombre del producto: ${pedido.nombre}`);
        pdf.text(20, 75, `Cliente: ${pedido.cliente} - Precio: ${pedido.precio} €`);
      
        // Agrega el precio total
        pdf.setFontSize(16);
      
        // Guarda el archivo PDF
        pdf.save('factura_pedido.pdf');
    };
    
    const navigate = useNavigate();

    return (
        
        <>
       
            <HeaderAdmin />
            <p>
            <Link to="/admin">Inicio</Link>
            </p>
            <h2 className='text-center'>Pedidos sin confirnar</h2>
            <table className="ordenador-table">
                <thead>
                    <tr>
                        <th>Categoria</th>
                        <th>Modelo</th>
                        <th>Fecha</th>
                        <th>Precio</th>
                        <th>Action</th>
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
                                <button className='font' onClick={() => handleCompra(pedido)}>Confirmar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        <h2 className='text-center'>
            Pedidos confirmados por este administrador
        </h2>
        <table className="ordenador-table">
                <thead>
                    <tr>
                        <th>Nombre del producto</th>
                        <th>Cliente</th>
                        <th>Fecha de confirmación</th>
                        <th>
                            Estado
                        </th>
                        <th>Generar Factura</th>

                    </tr>
                </thead>
                <tbody>
                    {pedidosConfirm.map((pedido) => (
                        <tr key={pedido.id}>
                            <td>{pedido.nombre}</td>
                            <td>
                        {pedido.cliente}
                            </td>
                            <td>
                                {pedido.fecha && typeof pedido.fecha.toDate === 'function'
                                    ? pedido.fecha.toDate().toLocaleDateString()
                                    : 'Fecha no disponible'}
                            </td>
                            <td>
                                Correcto
                            </td>
                            <td>
                               <button className='export__button' onClick={()=>  generatePDF(pedido)} >
                               <img src={pdf} className='pdf' alt="" srcset="" />

                               </button>
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
                {confirmarCompra && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Confirmar Compra</h2>
                        <p>¿Está seguro de que quieres confirmar la compra {productToBuy.nombre}?</p>
                        <div>
                            <button className='' onClick={()=> confirmarPedido(productToBuy)}>{loading ? <img src={load} className='load_cesta' alt="loading" /> : 'Confirmar'}
             </button>
                            <button onClick={cancelCompraHandler}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
