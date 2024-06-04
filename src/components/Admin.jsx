import React from 'react'
import { Header } from '../elements/global/Header'
import { Link } from 'react-router-dom'

export const Admin = () => {
  return (
    <>
    <Header/>
    <div className="dashboard-container">
      <h1 className="dashboard-title">Panel de Control</h1>
      <div className="cards-container">
        <div className="card" style={{ backgroundImage: 'url(path/to/pedidos_realizados.jpg)' }}>
          <div className="card-content">
            <h2 className="card-title">Comprar</h2>
            <Link to="/User/Compras/Pedidos" className="card-link">Ver más</Link>
          </div>
        </div>
        <div className="card" style={{ backgroundImage: 'url(path/to/pedidos_realizados.jpg)' }}>
          <div className="card-content">
            <h2 className="card-title">Pedidos Confirmados</h2>
            <Link to="/User/Compras/Pedidos" className="card-link">Ver más</Link>
          </div>
        </div>
        <div className="card" style={{ backgroundImage: 'url(./../assets/images/cards/card_compras2.jpg' }}>
          <div className="card-content">
            <h2 className="card-title">Compras Pendientes</h2>
            <Link to="/User/Compras/En-Curso" className="card-link">Ver más</Link>
          </div>
        </div>
        <div className="card" style={{ backgroundImage: 'url(path/to/contacto.jpg)' }}>
          <div className="card-content">
            <h2 className="card-title">Contacto</h2>
            <Link to="/contacto" className="card-link">Ver más</Link>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}
