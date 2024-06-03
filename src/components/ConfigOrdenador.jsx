import React, { useState } from 'react';
import useComponentes from './../services/hooks/useGetComponents';
import { Header } from '../elements/Header';
import './ConfigOrdenador.css';
export const ConfigOrdenador = () => {
  const componentes = useComponentes();
  console.log(componentes);


  const keyObj = Object.values(componentes);

  return (
    <>
    <Header />

    <div className='config-ordenador-container'>

      {keyObj.map((key, index) => (
        <div className='category-container'>


          {key[0].tipo}

          <form className="form-container">
            <select key={index} className="custom-select">
              {key.map((categoria, index) => (
                <>
                  {console.log(categoria.tipo)}

                  {categoria.tipo === "SSD" ?
                    <option key={index} value={categoria.nombre}>{categoria.nombre}</option>
                    : null}
                </>

              ))}
            </select>
            <select key={index} className="custom-select">
              {key.map((categoria, index) => (
                <>
                  {console.log(categoria.tipo)}

                  {categoria.tipo === "Memoria RAM" ?
                    <option key={index} value={categoria.nombre}>{categoria.nombre}</option>
                    : null}
                </>

              ))}
            </select>
            <select key={index} className="custom-select">
              {key.map((categoria, index) => (
                <>
                  {console.log(categoria.tipo)}

                  {categoria.tipo === "Placa Base" ?
                    <option key={index} value={categoria.nombre}>{categoria.nombre}</option>
                    : null}
                </>

              ))}
            </select>
            <button type="submit" className="submit-button">Enviar</button>
          </form>


          <form className="form-container">

            <button type="submit" className="submit-button">Enviar</button>
          </form>
        </div>))}

    </div>
    </>
  );
};


