import React, { useState } from 'react';
import { useGetUsuarios } from '../services/hooks/useGetUsuarios';
import { HeaderAdmin } from '../elements/global/HeaderAdmin';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import Alert from '../elements/global/Alert';
import { Link } from 'react-router-dom';

const foto = "https://www.w3schools.com/howto/img_avatar.png";
const foto2 = "https://www.w3schools.com/w3images/avatar2.png";

export const ListaUsuarios = () => {
    const [usuarios] = useGetUsuarios();
    const [popUp, setPopUp] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [formData, setFormData] = useState({
        nombre: '',
        permisos: ''
    });

    const [estadoAlerta, changeAlertStatus] = useState(false)

    const editUser = (usuario) => {
        setSelectedUser(usuario);
        setPopUp(true);
        setFormData({
            nombre: usuario.nombre,
            permisos: usuario.isAdmin ? 'admin' : 'cliente'
        });
        
    }

    const closePopUp = () => {
        setPopUp(false);
        setSelectedUser(null);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const usuarioRef = doc(db, 'usuarios', selectedUser.id);
        await updateDoc(usuarioRef, {
            nombre: formData.nombre,
            isAdmin: formData.permisos === 'admin' // Convertimos 'admin' a true, 'cliente' a false
        });
        console.log('Formulario enviado', formData);
        closePopUp();
    }

    return (
        <>
            <HeaderAdmin />
            <h1>
            Listado de usuarios
            </h1>
            <h2>
            <Link to="/admin">Inicio</Link>
            </h2>
            <div className='container__lista'>
                <main>
                    <section className='grid-container'>
                        {
                            usuarios.map((usuario, index) => (
                                
                                <article key={index} className='card__user'>
                                    {console.log(usuario)}
                                    <div className="card-foto">
                                        {
                                            usuario.isAdmin ? (
                                                <img src={foto2} className='pfp__lista' alt="Foto" />
                                            ) : (
                                                <img src={foto} className='pfp__lista' alt="Foto" />
                                            )
                                        }
                                    </div>
                                    {
                                        usuario.isAdmin ? (
                                            <div className='card__contenido__admin'>
                                                <h3>Nombre de usuario: {usuario.nombre}</h3>
                                                <p>Permisos de seguimiento de compras, confirmación de pedidos, edición de usuarios.</p>
                                            </div>
                                        ) : (
                                            <div className='card__contenido__cliente'>
                                                <h3>Nombre de usuario: {usuario.nombre}</h3>
                                                <p>Permisos de comprar, historial de pedidos, configurar ordenadores, generar presupuestos personalizados.</p>
                                            </div>
                                        )
                                    }
                                    <div className="card-boton">
                                        {
                                            usuario.isAdmin ? (
                                                <button disabled={true} className='button__isAdmin'>
                                                    <span>Admin</span>
                                                </button>
                                            ) : (
                                                <button className='button__isClient' onClick={() => editUser(usuario)}>
                                                    <span>Editar</span>
                                                </button>
                                            )
                                        }
                                    </div>
                                </article>
                            ))
                        }
                    </section>
                </main>
            </div>
            {popUp && selectedUser && (
                <div className="popup">
                    <div className="popup-inner">
                        <h2>Editando Usuario: {selectedUser.nombre}</h2>
                        <form onSubmit={handleSubmit}>
    <div className="form-group">
        <label htmlFor="nombre">Nombre:</label>
        <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
        />
    </div>
  
    <div className="form-group">
        <label htmlFor="permisos">Permisos:</label>
        <select
            id="permisos"
            name="permisos"
            value={formData.permisos}
            onChange={handleChange}
        >
            <option value="cliente">Cliente</option>
            <option value="admin">Admin</option>
        </select>
    </div>
    <button type="submit">Guardar Cambios</button>
    <button className='close' onClick={closePopUp}>Cerrar</button>
</form>
                    </div>
                </div>
            )}
            <Alert
              type={alert.type}
              message={alert.message}
              statusAlert={estadoAlerta}
              changeAlert={changeAlertStatus}/>
        </>
    );
}

export default ListaUsuarios;
