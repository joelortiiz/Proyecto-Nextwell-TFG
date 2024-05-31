import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header } from '../elements/Header';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { db } from './../firebase/firebaseConfig'; // Importa la configuración de Firebase
import { collection, addDoc } from 'firebase/firestore';
import { useAtuh } from './../context/AuthContext'
import load from './../assets/images/carga-unscreen.gif';
import './Ordenador.css'; // Importa tus estilos CSS
import torre1 from './../assets/images/componentes/torre1.webp'
import torre2 from './../assets/images/componentes/torre2.webp'
import torre3 from './../assets/images/componentes/torre3.webp'

export const NewOrdenador = () => {
	const {usuario} = useAtuh();

  const [nombre, setNombre] = useState('');
  const [gpuData, setGpuData] = useState([]);
  const [cpuData, setCpuData] = useState([]);
  const [ssdData, setSsdData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGpu, setSelectedGpu] = useState('');
  const [selectedCpu, setSelectedCpu] = useState('');
  const [selectedSsd, setSelectedSsd] = useState('');
  const [selectedTorre, setSelectedTorre] = useState('');
  const [customTorre, setCustomTorre] = useState('');
  const [formError, setFormError] = useState(''); 
  const [soWindows, setSoWindows] = useState([]);
  const [soLinux, setSoLinux] = useState([]);

  const torres = [
    {
      name: "Forgeon Tiberium ARGB Cristal Templado USB 3.0 Blanca",
      img: torre1
    },
    {
      name: "Tempest Mirage RGB Mesh Torre ATX Blanca",
      img: torre2
    },
    {
      name: "Nox Hummer TGX Rainbow RGB 3.0 USB Cristal Templado LED Negra",
      img: torre3
    }
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseGpu = await axios.get('http://localhost:3001/api/gpus');
        setGpuData(responseGpu.data);

        const responseCpu = await axios.get('http://localhost:3001/api/cpus');
        setCpuData(responseCpu.data);

        const responseSsd = await axios.get('http://localhost:3001/api/ssds');
        setSsdData(responseSsd.data);
        
        const responseSoWindows = await axios.get('http://localhost:3001/api/os');
        console.log(responseSoWindows)
      
          setSoWindows(responseSoWindows.data[0].editions);
        
        const responseSoLinux = await axios.get('http://localhost:3001/api/os');
       
        setSoLinux(responseSoLinux.data[0].editions);
        
      } catch (error) {
        setError('Error fetching data');
        console.error('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTorreChange = (event) => {
    const selectedName = event.target.value;
    setSelectedTorre(selectedName);
    if (selectedName === 'Otra') {
      setCustomTorre('');
    }
  };

  const handleCustomTorreChange = (event) => {
    setCustomTorre(event.target.value);
  };
  const handleNameChange = (event) => {
    setNombre(event.target.value);
  };


  const handleAddOrdenador = async () => {
    debugger
    if ( nombre === "" || !selectedGpu || !selectedCpu || !selectedSsd || (!selectedTorre && selectedTorre !== 'Otra') || (selectedTorre === 'Otra' && !customTorre)) {
      setFormError('Todos los campos deben ser rellenados.');
      return;
    }
   
    const newOrdenador = {
      nombre: nombre,
      gpu: selectedGpu,
      cpu: selectedCpu,
      ssd: selectedSsd,
      torre: selectedTorre === 'Otra' ? customTorre : selectedTorre,
      userId: usuario.uid,
    };

    try {
      await addDoc(collection(db, 'ordenadores'), newOrdenador);
      alert('Ordenador añadido correctamente!');
      setFormError(''); // Limpiar el mensaje de error si todo está bien
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Error al añadir el ordenador.');
    }
  };
  const selectedTorreData = torres.find(torre => torre.name === selectedTorre);

  return (
    <>
      <Header />
      <div className='container__ordenadores'>
        <section>
          <article className='text-center'>
            <div>
              <motion.h2 className='h2'>
                <em>Añadir un nuevo ordenador a tu </em>
              </motion.h2>
              <p>
                <Link to={"/ordenadores"}>Volver a todos tus Equipos </Link>
              </p>
            </div>
          </article>
        </section>
      </div>
      <div>
        {loading ? (
          <div className='load'>
            <img src={load} alt="Loading..." className='load__img' />
          </div>
        ) : error ? (
          <div>
            <p>{error}</p>
          </div>
        ) : (
          <>
            <div className='select-container'>

            <h1>Nombre del Equipo</h1>
            <input type="text" className='custom-select' placeholder='Ej: Ordenador trabajo, Ordenador personal...'
            value={nombre}
            onChange={handleNameChange}
             />

                 <h1>GPU List</h1>
            <select className='custom-select' value={selectedGpu} onChange={(e) => setSelectedGpu(e.target.value)}>
              <option value="">Selecciona una GPU</option>
              {gpuData.map((gpu, index) => (
                <option key={index} value={gpu}>
                  {gpu}
                </option>
              ))}
            </select>

            <h1>CPU List</h1>
            <select className='custom-select' value={selectedCpu} onChange={(e) => setSelectedCpu(e.target.value)}>
              <option value="">Selecciona una CPU</option>
              {cpuData.map((cpu, index) => (
                <option key={index} value={cpu}>
                  {cpu}
                </option>
              ))}
            </select>

            <h1>SSD List</h1>
            <select className='custom-select' value={selectedSsd} onChange={(e) => setSelectedSsd(e.target.value)}>
              <option value="">Selecciona un SO de Windows</option>
              {ssdData.map((ssd, index) => (
                <option key={index} value={ssd}>
                  {ssd}
                </option>
              ))}
            </select>
            <h1>Windows List</h1>
            <select className='custom-select' value={selectedSsd} onChange={(e) => setSelectedSsd(e.target.value)}>
              <option value="">Selecciona un SSD</option>
              {soWindows.map((ssd, index) => (
                <option key={index} value={ssd}>
                  {ssd}
                </option>
              ))}
            </select>

            <div className='select-container'>
            <h1>Torre List</h1>
            <select className='custom-select' value={selectedTorre} onChange={handleTorreChange}>
              <option value="">Selecciona una torre</option>
              {torres.map((torre, index) => (
                <option key={index} value={torre.name}>
                  {torre.name}
                </option>
              ))}
              <option value="Otra">Otra</option>
            </select>

            {selectedTorreData && (
              <div className='selected-torre'>
                <h2>{selectedTorreData.name}</h2>
                <img src={selectedTorreData.img} alt={selectedTorreData.name} className='selected-torre-image' />
              </div>
            )}

            {selectedTorre === 'Otra' && (
              <div className='custom-torre-input'>
                <label htmlFor="custom-torre">Escribe el nombre de tu torre:</label>
                <input
                  type="text"
                  id="custom-torre"
                  value={customTorre}
                  onChange={handleCustomTorreChange}
                />
              </div>
            )}

            {formError && <div className='error-message'>{formError}</div>} {/* Mostrar mensaje de error si hay alguno */}
            
            <button onClick={handleAddOrdenador}>Añadir Ordenador</button>
     
        
            </div>
            </div>
            </>
        )}
      </div>
    </>
  );
};
