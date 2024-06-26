import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header } from '../elements/global/Header';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { db } from './../firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { useAtuh } from './../context/AuthContext';
import load from './../assets/images/carga-unscreen.gif';
import torre1 from './../assets/images/componentes/torre1.webp';
import torre2 from './../assets/images/componentes/torre2.webp';
import torre3 from './../assets/images/componentes/torre3.webp';
import windowsLogo from './../assets/images/logos/windows.png';
import linuxLogo from './../assets/images/logos/linux.webp';
import './Ordenador.css';

export const NewOrdenador = () => {
    const { usuario } = useAtuh();
    const [nombre, setNombre] = useState('');
    const [gpuData, setGpuData] = useState([]);
    const [cpuData, setCpuData] = useState([]);
    const [ssdData, setSsdData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedGpu, setSelectedGpu] = useState('');
    const [selectedCpu, setSelectedCpu] = useState('');
    const [selectedSsd, setSelectedSsd] = useState('');
    const [selectedRam, setSelectedRam] = useState('');
    const [selectedTorre, setSelectedTorre] = useState('');
    const [customTorre, setCustomTorre] = useState('');
    const [formError, setFormError] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);

    const [selectedOS, setSelectedOS] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [soWindows, setSoWindows] = useState([]);
    const [soLinux, setSoLinux] = useState([]);

    const handleOSClick = (os) => {
        setSelectedOS(os);
        setSelectedOption('');
    };

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const torres = [
        { name: "Forgeon Tiberium ARGB Cristal Templado USB 3.0 Blanca", img: torre1 },
        { name: "Tempest Mirage RGB Mesh Torre ATX Blanca", img: torre2 },
        { name: "Nox Hummer TGX Rainbow RGB 3.0 USB Cristal Templado LED Negra", img: torre3 }
    ];

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
                setSoWindows(responseSoWindows.data[0].editions);

                const responseSoLinux = await axios.get('http://localhost:3001/api/os');
                setSoLinux(responseSoLinux.data[1].editions);

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
        if (nombre === "" || !selectedGpu || !selectedCpu || !selectedSsd || (!selectedTorre && selectedTorre !== 'Otra') || (selectedTorre === 'Otra' && !customTorre)) {
            setFormError('Todos los campos deben ser rellenados.');
            return;
        }

        const newOrdenador = {
            nombre,
            gpu: selectedGpu,
            cpu: selectedCpu,
            ram: selectedRam,
            ssd: selectedSsd,
            torre: selectedTorre === 'Otra' ? customTorre : selectedTorre,
            userId: usuario.uid,
            so: selectedOption
        };

        try {
            await addDoc(collection(db, 'ordenadores'), newOrdenador);
            setShowConfirmation(true);
            setFormError(''); // Limpiar el mensaje de error si todo está bien
            setTimeout(() => setShowConfirmation(false), 3000); // Ocultar mensaje después de 3 segundos
        } catch (error) {
            console.error('Error adding document: ', error);
            alert('Error al añadir el ordenador.');
        }
    };

    const selectedTorreData = torres.find(torre => torre.name === selectedTorre);

    return (
        <>
            <Header />
            <div className="container__ordenadores">
                <section>
                    <article className="text-center">
                        <div>
                            <motion.h2 className="h2">
                                <em>Añadir un nuevo ordenador a tu colección</em>
                            </motion.h2>
                            <p>
                                <Link to="/ordenadores">Volver a todos tus Equipos</Link>
                            </p>
                        </div>
                    </article>
                </section>
            </div>
            <div className="content">
                {loading ? (
                    <div className="load">
                        <img src={load} alt="Loading..." className="load__img" />
                    </div>
                ) : error ? (
                    <div>
                        <p>{error}</p>
                    </div>
                ) : (
                    <div className="form-container">
                        <div className="input-group">
                            <label>Nombre del Equipo</label>
                            <input
                                type="text"
                                className="custom-input"
                                placeholder="Ej: Ordenador trabajo, Ordenador personal..."
                                value={nombre}
                                onChange={handleNameChange}
                            />
                        </div>
                        <div className="input-group">
                            <label>GPU List</label>
                            <select className="custom-select" value={selectedGpu} onChange={(e) => setSelectedGpu(e.target.value)}>
                                <option value="">Selecciona una GPU</option>
                                {gpuData.map((gpu, index) => (
                                    <option key={index} value={gpu}>{gpu}</option>
                                ))}
                            </select>
                        </div>
                        <div className="input-group">
                            <label>CPU List</label>
                            <select className="custom-select" value={selectedCpu} onChange={(e) => setSelectedCpu(e.target.value)}>
                                <option value="">Selecciona una CPU</option>
                                {cpuData.map((cpu, index) => (
                                    <option key={index} value={cpu}>{cpu}</option>
                                ))}
                            </select>
                        </div>
                        <div className="input-group">
                            <label>Data Disk List</label>
                            <select className="custom-select" value={selectedSsd} onChange={(e) => setSelectedSsd(e.target.value)}>
                                <option value="">Elige tu Disco Duro o Ssd</option>
                                {ssdData.map((ssd, index) => (
                                    <option key={index} value={ssd}>{ssd}</option>
                                ))}
                            </select>
                        </div>
                        <div className="input-group">
                            <label>Memoria RAM</label>
                            <select className="custom-select" value={selectedRam} onChange={(e) => setSelectedRam(e.target.value)}>
                                <option value="">Selecciona la memoria RAM</option>
                                <option value="4 gb">4 Gb</option>
                                <option value="8 gb">8 Gb</option>
                                <option value="16 gb">16 Gb</option>
                                <option value="32 gb">32 Gb</option>
                                <option value="64 gb">64 Gb</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label>Torre List</label>
                            <select className="custom-select" value={selectedTorre} onChange={handleTorreChange}>
                                <option value="">Selecciona una torre</option>
                                {torres.map((torre, index) => (
                                    <option key={index} value={torre.name}>{torre.name}</option>
                                ))}
                                <option value="Otra">Otra</option>
                            </select>
                        </div>
                        {selectedTorreData && (
                            <div className="selected-torre">
                                <h2>{selectedTorreData.name}</h2>
                                <img src={selectedTorreData.img} alt={selectedTorreData.name} className="selected-torre-image" />
                            </div>
                        )}
                        {selectedTorre === 'Otra' && (
                            <div className="custom-torre-input">
                                <label htmlFor="custom-torre">Escribe el nombre de tu torre:</label>
                                <input
                                    type="text"
                                    id="custom-torre"
                                    value={customTorre}
                                    onChange={handleCustomTorreChange}
                                    className="custom-input"
                                />
                            </div>
                        )}
                        <div className="os-selection-container">
                            <h2>Select your Operating System</h2>
                            <div className="os-logos">
                                <img
                                    src={windowsLogo}
                                    alt="Windows"
                                    className={`os-logo ${selectedOS === 'windows' ? 'selected' : ''}`}
                                    onClick={() => handleOSClick('windows')}
                                />
                                <img
                                    src={linuxLogo}
                                    alt="Linux"
                                    className={`os-logo ${selectedOS === 'linux' ? 'selected' : ''}`}
                                    onClick={() => handleOSClick('linux')}
                                />
                            </div>
                            {selectedOS && (
                                <div className="os-options">
                                    <h3>Select a version of {selectedOS}</h3>
                                    <select value={selectedOption} className="custom-select" onChange={handleOptionChange}>
                                        <option value="">Select a version</option>
                                        {selectedOS === 'windows'
                                            ? soWindows.map((option, index) => (
                                                <option key={index} value={option}>{option}</option>
                                            ))
                                            : soLinux.map((option, index) => (
                                                <option key={index} value={option}>{option}</option>
                                            ))}
                                    </select>
                                </div>
                            )}
                        </div>
                        {formError && <div className="error-message">{formError}</div>}
                        {showConfirmation && <div className="confirmation-message">¡Ordenador añadido correctamente!</div>}
                        <button onClick={handleAddOrdenador} className="add-button">Añadir Ordenador</button>
                    </div>
                )}
            </div>
        </>
    );
};
