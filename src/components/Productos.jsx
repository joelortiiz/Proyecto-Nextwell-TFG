import React, {useState} from 'react'
import useProductos from '../services/hooks/useGetProductos';
import { useAtuh } from '../context/AuthContext';
import { db } from './../firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import './Productos.css';
import Alert from '../elements/global/Alert'
import load from './../assets/images/carga-unscreen.gif';

export const Productos = () => {

    const productos = useProductos();
    const { usuario } = useAtuh();
    const [loading, setLoading] = useState(false);
    const [confirmarCompra, setConfirmarCompra] = useState(false);
    const [productToBuy, setProductoAComprar] = useState(null);
    const [estadoAlerta, changeAlertStatus] = useState(false)
    const [alert, changeAlert] = useState({})

    const ProductosObj = Object.values(productos);




    const handleCompra = async (producto) => {
        setProductoAComprar(producto);
        setConfirmarCompra(true);
    };

    const cancelCompraHandler = () => {
        setConfirmarCompra(false);
    };

    const ConfirmhandleCompra = async () => {

        if(productToBuy) {
            try {
                setLoading(true);
                const newProducto = {
                    
                  categoria: productToBuy.tipo,
                    nombre: productToBuy.nombre,
                    precio: productToBuy.precio,
                  userId: usuario.uid,
                  cliente: usuario.email.split('@')[0],
                  tipo: "producto",
                    fecha: new Date().toLocaleDateString(),
                    confirmado: "F",
              };
              await addDoc(collection(db, 'cesta'), newProducto);
            setLoading(false);
            setConfirmarCompra(false);
          changeAlertStatus(true)
          changeAlert({
            type: 'exito',
            message: 'Compra realizada! Puedes ver tus compras en el apartado de compras.'
          })
            } catch (error) {
                
            }
        }
       
    }

    return (
    <>
    {
        ProductosObj.map((producto, index)=> (
            <section className='product__section' key={index}>
            {
                 producto.map((card, index) => (
                    
                        card.imagen === null ? card.imagen = 'https://via.placeholder.com/800x400?text=Image+1' : (
                            <div key={index} className='product_card'>
                            <h3 className='product__title'>
                              {card.nombre}
                            </h3>
                              <article className='article__product'>
                                  <div className='container__img'>
                                      <img src={`${card.imagen}`} className='product__img' alt={card.nombre} />
                                  </div>
                                  <footer className='product__footer'>
                                      <button onClick={()=> {
                                        handleCompra(card)
                                      }}>
                                          COMPRAR <p className='product__price'>
                                              {card.precio} €
                                          </p>
                                      </button>
                                  </footer>
                              </article>
                              </div>
                        )

                        
                    
                 
                )
                  
                )
            }
            </section>
        ))
        
    }
      {confirmarCompra && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Confirmar Compra</h2>
                        <p>¿Está seguro de que desea comprar {productToBuy.nombre}?</p>
                        <div>
                            <button onClick={ConfirmhandleCompra}>{loading ? <img src={load} className='load_cesta' alt="loading" /> : 'Sí, comprar'}
             </button>
                            <button onClick={cancelCompraHandler}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
          <Alert
      type={alert.type}
      message={alert.message}
      statusAlert={estadoAlerta}
      changeAlert={changeAlertStatus}
      />
    </>
  )
}
