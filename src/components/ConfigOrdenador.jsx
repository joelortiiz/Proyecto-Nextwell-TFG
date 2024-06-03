import React, { useState, useEffect } from 'react';
import useComponentes from './../services/hooks/useGetComponents';
import { Header } from '../elements/Header';
import './ConfigOrdenador.css';
import jsPDF from 'jspdf';
import logo from '../assets/images/logos/Untitled design.png';
import Alert from '../elements/Alert'
import load from './../assets/images/carga-unscreen.gif';

import { db } from './../firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { useAtuh } from './../context/AuthContext';

export const ConfigOrdenador = () => {
  const componentes = useComponentes();
  console.log(componentes);
  const { usuario } = useAtuh();

  const keyObj = Object.values(componentes);

  const [selectedGpu, setSelectedGpu] = useState('');
  const [selectedCpu, setSelectedCpu] = useState('');
  const [selectedSsd, setSelectedSsd] = useState('');
  const [selectedRam, setSelectedRam] = useState('');
  const [selectedTorre, setSelectedTorre] = useState('');
  const [selectedPlaca, setSelectedPlaca] = useState('');

  const [precioGpu, setPrecioGpu] = useState(0);
  const [precioCpu, setPrecioCpu] = useState(0);
  const [precioSsd, setPrecioSsd] = useState(0);
  const [precioRam, setPrecioRam] = useState(0);
  const [precioTorre, setPrecioTorre] = useState(0);
  const [precioPlaca, setPrecioPlaca] = useState(0);

  const [precioTotal, setPrecioTotal] = useState(0);
  const [animationClass, setAnimationClass] = useState('');
  const [estadoAlerta, changeAlertStatus] = useState(false)
  const [alert, changeAlert] = useState({})
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPrecioTotal(precioGpu + precioCpu + precioSsd + precioRam + precioTorre + precioPlaca);
  }, [precioGpu, precioCpu, precioSsd, precioRam, precioTorre, precioPlaca]);

const handleSubmit = async (e) => {
  e.preventDefault();
  changeAlertStatus(false)
  changeAlert({})
  if (!selectedGpu || !selectedCpu || !selectedSsd || (!selectedTorre && selectedTorre === '') || (selectedTorre === '' )) {
    changeAlertStatus(true)
    changeAlert({
      type: 'error',
      message: 'Debes seleccionar todos los componentes para enviar el formulario.'
    })
    return;
} else {
  setLoading(true);
  const newOrdenadorDeseado = {
    gpu: selectedGpu,
    cpu: selectedCpu,
    ram: selectedRam,
    ssd: selectedSsd,
    torre: selectedTorre,
    placa: selectedPlaca,
    precioTotal: precioTotal,
    userId: usuario.uid,
};
  await addDoc(collection(db, 'cesta'), newOrdenadorDeseado);
    setLoading(false);
  changeAlertStatus(true)
  changeAlert({
    type: 'exito',
    message: 'Se ha guardado a tu Cesta de deseados!'
  })
}
};


  const getComponentByPrice = (type, highest = false) => {
    const components = keyObj.flatMap(category => category.filter(component => component.tipo === type));
    if (components.length === 0) return { nombre: '', precio: 0 };
    return components.reduce((prev, curr) => {
      if (highest) return prev.precio > curr.precio ? prev : curr;
      else return prev.precio < curr.precio ? prev : curr;
    });
  };

  const getMedianComponent = (type) => {
    const components = keyObj.flatMap(category => category.filter(component => component.tipo === type));
    if (components.length === 0) return { nombre: '', precio: 0 };
    const sortedComponents = components.sort((a, b) => a.precio - b.precio);
    const medianIndex = Math.floor(sortedComponents.length / 2);
    return sortedComponents[medianIndex];
  };
  

  const selectOptionByPrice = (type) => {
    let gpu, cpu, ssd, ram, torre, placa;

    switch(type) {
      case 'low':
        gpu = getComponentByPrice('Tarjeta Gráfica');
        cpu = getComponentByPrice('CPU');
        ssd = getComponentByPrice('SSD');
        ram = getComponentByPrice('Memoria RAM');
        torre = getComponentByPrice('Torre');
        placa = getComponentByPrice('Placa Base');
        break;
      case 'medium':
        gpu = getMedianComponent('Tarjeta Gráfica');
        cpu = getMedianComponent('CPU');
        ssd = getMedianComponent('SSD');
        ram = getMedianComponent('Memoria RAM');
        torre = getMedianComponent('Torre');
        placa = getMedianComponent('Placa Base');
        break;
      case 'high':
        gpu = getComponentByPrice('Tarjeta Gráfica', true);
        cpu = getComponentByPrice('CPU', true);
        ssd = getComponentByPrice('SSD', true);
        ram = getComponentByPrice('Memoria RAM', true);
        torre = getComponentByPrice('Torre', true);
        placa = getComponentByPrice('Placa Base', true);

        break;
      default:
        return;
    }

    setSelectedGpu(gpu.nombre);
    setPrecioGpu(gpu.precio);
    setSelectedCpu(cpu.nombre);
    setPrecioCpu(cpu.precio);
    setSelectedSsd(ssd.nombre);
    setPrecioSsd(ssd.precio);
    setSelectedRam(ram.nombre);
    setPrecioRam(ram.precio);
    setSelectedTorre(torre.nombre);
    setPrecioTorre(torre.precio);
    setSelectedPlaca(placa.nombre);
    setPrecioPlaca(placa.precio);

       // Aplicar animación
       setAnimationClass('animate');
       setTimeout(() => {
         setAnimationClass('');
       }, 1000); // Duración de la animación en milisegundos
  };
  
  const generatePDF = () => {
    const pdf = new jsPDF();
    
    // Agrega el logo
    const imgWidth = 35;
    const imgHeight = 35;
    pdf.addImage(logo, 'PNG', 10, 10, imgWidth, imgHeight);

    // Agrega el título
    pdf.setFontSize(20);
    pdf.text('Presupuesto de Configuración de Ordenador', 70, 40);

    // Agrega las selecciones de componentes con precios
    pdf.setFontSize(11);
    pdf.text(20, 50, 'Componentes Seleccionados:');
    pdf.text(20, 60, `Tarjeta Gráfica: ${selectedGpu} - Precio: ${precioGpu} €`);
    pdf.text(20, 70, `CPU: ${selectedCpu} - Precio: ${precioCpu} €`);
    pdf.text(20, 80, `SSD: ${selectedSsd} - Precio: ${precioSsd} €`);
    pdf.text(20, 100, `Placa Base : ${selectedPlaca} - Precio: ${precioPlaca} €`);
    pdf.text(20, 90, `Memoria RAM: ${selectedRam} - Precio: ${precioRam} €`);
    pdf.text(20, 100, `Torre: ${selectedTorre} - Precio: ${precioTorre} €`);

    // Agrega el precio total
    pdf.setFontSize(16);
    pdf.text(20, 120, `Precio Total: ${precioTotal.toFixed(2)} €`);

    // Guarda el archivo PDF
    pdf.save('presupuesto_ordenador.pdf');
  };

  return (
    <>
      <Header />
      {
        componentes.length <= 0 ? <p>Cargando...</p> : (
        
    <main className='config__main'>
      <div className='config-ordenador-container'>
        {keyObj.map((key, index) => (
          <div className='category-container' key={index}>
            <form className="form-container" onSubmit={handleSubmit}>
              <div>
                <h2>CPU</h2>
                <select 
                   className={`custom-select ${!selectedCpu ? 'error' : ''}`} 
                  value={selectedCpu}
                  onChange={(e) => {
                    const selectedOption = key.find(categoria => categoria.nombre === e.target.value);
                    setSelectedCpu(e.target.value);
                    setPrecioCpu(selectedOption ? selectedOption.precio : 0);
                  }}
                >
                     <option value="">Selecciona una CPU</option>
                  {key.map((categoria, idx) => (
                    categoria.tipo === "CPU" ? 
                      <option key={idx} value={categoria.nombre}>
                        {categoria.nombre} - ${categoria.precio}
                      </option>
                    : null
                  ))}
                </select>

                <h2>Torres</h2>
                <select 
                   className={`custom-select ${!selectedCpu ? 'error' : ''}`} 
                  value={selectedTorre}
                  onChange={(e) => {
                    const selectedOption = key.find(categoria => categoria.nombre === e.target.value);
                    setSelectedTorre(e.target.value);
                    setPrecioTorre(selectedOption ? selectedOption.precio : 0);
                  }}
                >
                     <option value="">Selecciona una Torre</option>
                  {key.map((categoria, idx) => (
                    categoria.tipo === "Torre" ? 
                      <option key={idx} value={categoria.nombre}>
                        {categoria.nombre} - ${categoria.precio}
                      </option>
                    : null
                  ))}
                </select>

                <h2>Tarjetas Gráficas</h2>
                <select 
                   className={`custom-select ${!selectedCpu ? 'error' : ''}`} 
                  value={selectedGpu}
                  onChange={(e) => {
                    const selectedOption = key.find(categoria => categoria.nombre === e.target.value);
                    setSelectedGpu(e.target.value);
                    setPrecioGpu(selectedOption ? selectedOption.precio : 0);
                  }}
                >
                     <option value="">Selecciona una Tarjeta Gráfica</option>
                  {key.map((categoria, idx) => (
                    categoria.tipo === "Tarjeta Gráfica" ? 
                      <option key={idx} value={categoria.nombre}>
                        {categoria.nombre} - ${categoria.precio}
                      </option>
                    : null
                  ))}
                </select>

                <h2>SSD</h2>
                <select 
                   className={`custom-select ${!selectedCpu ? 'error' : ''}`} 
                  value={selectedSsd}
                  onChange={(e) => {
                    const selectedOption = key.find(categoria => categoria.nombre === e.target.value);
                    setSelectedSsd(e.target.value);
                    setPrecioSsd(selectedOption ? selectedOption.precio : 0);
                  }}
                >
                     <option value="">Selecciona un SSD</option>
                  {key.map((categoria, idx) => (
                    categoria.tipo === "SSD" ? 
                      <option key={idx} value={categoria.nombre}>
                        {categoria.nombre} - ${categoria.precio}
                      </option>
                    : null
                  ))}
                </select>
              </div>

              <div>
                <h2>Memorias RAM</h2>
                <select 
                   className={`custom-select ${!selectedCpu ? 'error' : ''}`} 
                  value={selectedRam}
                  onChange={(e) => {
                    const selectedOption = key.find(categoria => categoria.nombre === e.target.value);
                    setSelectedRam(e.target.value);
                    setPrecioRam(selectedOption ? selectedOption.precio : 0);
                  }}
                >
                     <option value="">Selecciona una Memoria RAM</option>
                  {key.map((categoria, idx) => (
                    categoria.tipo === "Memoria RAM" ? 
                      <option key={idx} value={categoria.nombre}>
                        {categoria.nombre} - ${categoria.precio}
                      </option>
                    : null
                  ))}
                </select>

                <h2>Placas Madre</h2>
                <select 
                   className={`custom-select ${!selectedCpu ? 'error' : ''}`} 
                  value={selectedPlaca}
                  onChange={(e) => {
                    const selectedOption = key.find(categoria => categoria.nombre === e.target.value);
                    setSelectedPlaca(e.target.value);
                    setPrecioPlaca(selectedOption ? selectedOption.precio : 0);
                  }}
                >
                     <option value="">Selecciona una Placa Base</option>
                  {key.map((categoria, idx) => (
                    categoria.tipo === "Placa Base" ? 
                      <option key={idx} value={categoria.nombre}>
                        {categoria.nombre} - ${categoria.precio}
                      </option>
                    : null
                  ))}
                </select>
              </div>

              <p>
                Precio Total: ${precioTotal.toFixed(2)}
              </p>
              <button type="submit" className={`add-button ${animationClass}`}>
                
                {loading ? <img src={load} className='load_cesta' alt="loading" /> : 'Añadir a la Cesta'}
              </button>
            <button className='export-button' onClick={generatePDF}>Generar PDF</button>
    
            </form>

            
          </div>
        ))}
      </div>
      <div className='options__container'>
        <button onClick={() => selectOptionByPrice('low')} className='price-button'>Opción Bajo Precio</button>
        <button onClick={() => selectOptionByPrice('medium')}  className='price-button'>Opción Precio Medio</button>
        <button onClick={() => selectOptionByPrice('high')}  className='price-button'>Opción Alto Precio</button>
      </div>
    </main>
    )
  }


    <Alert
      type={alert.type}
      message={alert.message}
      statusAlert={estadoAlerta}
      changeAlert={changeAlertStatus}
      />
    </>
  );
};
