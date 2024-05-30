import { Header } from '../elements/Header'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import load from './../assets/images/carga-unscreen.gif'
export const NewOrdenador = () => {

  const [gpuData, setGpuData] = useState([]);
  const [cpuData, setCpuData] = useState([]);
  const [ssdData, setSsdData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    debugger
    const fetchData = async () => {
      try {
        const responseGpu = await axios.get('http://localhost:3001/api/gpus');
        setGpuData(responseGpu.data);

        const responseCpu = await axios.get('http://localhost:3001/api/cpus');
        setCpuData(responseCpu.data);

        const responseSsd = await axios.get('http://localhost:3001/api/ssds');
        setSsdData(responseSsd.data);
      } catch (error) {
        setError('Error fetching data');
        console.error('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);



  return (
    <>
      <Header />
      <div className='container__ordenadores'>
        <section>
          <article className='text-center'>
            <div>
              <motion.h2
                className='h2'
              >
                <em>Añadir un nuevo ordenador a tu </em>
              </motion.h2>
              <p >
                <Link to={"/ordenadores/newordenador"}>Volver a todos tus Equipos </Link>
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
            <h1>GPU List</h1>
            <select>
              {gpuData.map((gpu, index) => (
                <option key={index} value={gpu}>
                  {gpu}
                </option>
              ))}
            </select>

            <h1>CPU List</h1>
            <select>
              {cpuData.map((cpu, index) => (
                <option key={index} value={cpu}>
                  {cpu}
                </option>
              ))}
            </select>

            <h1>SSD List</h1>
            <select>
              {ssdData.map((ssd, index) => (
                <option key={index} value={ssd}>
                  {ssd}
                </option>
              ))}
            </select>
          </>
        )}
      </div>
    </>
  )
}