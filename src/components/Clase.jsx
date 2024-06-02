import React, { Component } from 'react';
import { Header } from '../elements/Header';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { db } from './../firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { useAtuh } from './../context/AuthContext';
// Aquí pondrías los datos directamente
const data ={
  "componentes": [
    {
      "tipo": "Tarjeta Gráfica",
      "nombre": "NVIDIA GeForce RTX 3080",
      "precio": 799,
      "marca": "NVIDIA"
    },
    {
      "tipo": "Tarjeta Gráfica",
      "nombre": "AMD Radeon RX 6800 XT",
      "precio": 649,
      "marca": "AMD"
    },
    {
      "tipo": "Tarjeta Gráfica",
      "nombre": "ASUS ROG Strix GeForce RTX 3090",
      "precio": 1499,
      "marca": "ASUS"
    },
    {
      "tipo": "Tarjeta Gráfica",
      "nombre": "GIGABYTE GeForce RTX 3070",
      "precio": 649,
      "marca": "GIGABYTE"
    },
    {
      "tipo": "Tarjeta Gráfica",
      "nombre": "MSI GeForce RTX 3060 Ti",
      "precio": 499,
      "marca": "MSI"
    },
    {
      "tipo": "Tarjeta Gráfica",
      "nombre": "EVGA GeForce RTX 3090 FTW3 Ultra",
      "precio": 1599,
      "marca": "EVGA"
    },
    {
      "tipo": "Memoria RAM",
      "nombre": "Corsair Vengeance LPX 16GB DDR4 3600MHz",
      "precio": 89.99,
      "marca": "Corsair"
    },
    {
      "tipo": "Memoria RAM",
      "nombre": "G.Skill Trident Z Neo 32GB DDR4 3600MHz",
      "precio": 169.99,
      "marca": "G.Skill"
    },
    {
      "tipo": "Memoria RAM",
      "nombre": "Crucial Ballistix RGB 32GB (2 x 16GB) DDR4 3200MHz",
      "precio": 129.99,
      "marca": "Crucial"
    },
    {
      "tipo": "Memoria RAM",
      "nombre": "HyperX Fury RGB 16GB DDR4 3200MHz",
      "precio": 79.99,
      "marca": "HyperX"
    },
    {
      "tipo": "Memoria RAM",
      "nombre": "Team T-Force Delta RGB 32GB (2 x 16GB) DDR4 3200MHz",
      "precio": 139.99,
      "marca": "Team"
    },
    {
      "tipo": "Memoria RAM",
      "nombre": "Patriot Viper Steel Series 16GB DDR4 4400MHz",
      "precio": 119.99,
      "marca": "Patriot"
    },
    {
      "tipo": "Placa Base",
      "nombre": "ASUS ROG Strix Z590-E Gaming",
      "precio": 329.99,
      "marca": "ASUS"
    },
    {
      "tipo": "Placa Base",
      "nombre": "MSI MPG B550 Gaming Plus",
      "precio": 149.99,
      "marca": "MSI"
    },
    {
      "tipo": "Placa Base",
      "nombre": "GIGABYTE B450 AORUS ELITE",
      "precio": 109.99,
      "marca": "GIGABYTE"
    },
    {
      "tipo": "Placa Base",
      "nombre": "ASRock B550M Steel Legend",
      "precio": 129.99,
      "marca": "ASRock"
    },
    {
      "tipo": "Placa Base",
      "nombre": "ASUS TUF Gaming X570-PLUS",
      "precio": 189.99,
      "marca": "ASUS"
    },
    {
      "tipo": "Placa Base",
      "nombre": "MSI MAG B550 TOMAHAWK",
      "precio": 179.99,
      "marca": "MSI"
    },
    {
      "tipo": "SSD",
      "nombre": "Samsung 980 PRO 1TB NVMe M.2",
      "precio": 199.99,
      "marca": "Samsung"
    },
    {
      "tipo": "SSD",
      "nombre": "Western Digital WD Black SN850 2TB NVMe M.2",
      "precio": 449.99,
      "marca": "Western Digital"
    },
    {
      "tipo": "SSD",
      "nombre": "Crucial P2 1TB NVMe M.2",
      "precio": 109.99,
      "marca": "Crucial"
    },
    {
      "tipo": "SSD",
      "nombre": "Sabrent Rocket Q 4TB NVMe M.2",
      "precio": 799.99,
      "marca": "Sabrent"
    },
    {
      "tipo": "SSD",
      "nombre": "ADATA XPG SX8200 Pro 2TB NVMe M.2",
      "precio": 249.99,
      "marca": "ADATA"
    },
    {
      "tipo": "SSD",
      "nombre": "GIGABYTE AORUS NVMe Gen4 SSD 2TB",
      "precio": 449.99,
      "marca": "GIGABYTE"
    },
    {
      "tipo": "Torre",
      "nombre": "NZXT H510i",
      "precio": 99.99,
      "imagen": "https://example.com/nzxt-h510i.jpg"
    },
    {
      "tipo": "Torre",
      "nombre": "Corsair Crystal 570X RGB",
      "precio": 189.99,
      "imagen": "https://example.com/corsair-crystal-570x.jpg"
    },
    {
      "tipo": "Torre",
      "nombre": "Phanteks Eclipse P300A Mesh",
      "precio": 69.99,
      "imagen": "https://example.com/phanteks-p300a.jpg"
    },
    {
      "tipo": "Torre",
      "nombre": "Cooler Master MasterCase H500P Mesh",
      "precio": 149.99,
      "imagen": "https://example.com/cooler-master-h500p.jpg"
    },
    {
      "tipo": "Torre",
      "nombre": "Fractal Design Meshify C",
      "precio": 89.99,
      "imagen": "https://example.com/fractal-design-meshify.jpg"
    },
    {
      "tipo": "Torre",
      "nombre": "Lian Li Lancool II Mesh",
      "precio": 99.99,
      "imagen": "https://example.com/lian-li-lancool-ii.jpg"
    },
    {
      "tipo": "CPU",
      "nombre": "Intel Core i9-11900K",
      "precio": 539.99,
      "marca": "Intel"},
{
"tipo": "CPU",
"nombre": "AMD Ryzen 7 5800X",
"precio": 449.99,
"marca": "AMD"
},
{
"tipo": "CPU",
"nombre": "Intel Core i7-11700K",
"precio": 399.99,
"marca": "Intel"
},
{
"tipo": "CPU",
"nombre": "AMD Ryzen 5 5600X",
"precio": 299.99,
"marca": "AMD"
},
{
"tipo": "CPU",
"nombre": "Intel Core i5-11600K",
"precio": 269.99,
"marca": "Intel"
},
{
"tipo": "CPU",
"nombre": "AMD Ryzen 3 3300X",
"precio": 129.99,
"marca": "AMD"
},
{
"tipo": "CPU",
"nombre": "Intel Core i3-10100",
"precio": 129.99,
"marca": "Intel"
}
]
}


class ComponentesListClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentes: []
    };
  }

  componentDidMount() {
    if (data.length > 0) {
      this.setState({ componentes: data[0].componentes });
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault();
   

    console.log(this.state.selectedOptions);
  try {
    //  await addDoc(collection(db, 'cesta'), this.state.selectedOptions);
      //setShowConfirmation(true);
    //  setFormError(''); // Limpiar el mensaje de error si todo está bien
     // setTimeout(() => setShowConfirmation(false), 3000); // Ocultar mensaje después de 3 segundos
  } catch (error) {
      console.error('Error adding document: ', error);
      alert('Error al añadir el ordenador.');
  }
};   
    render() {
      const { componentes, selectedOptions } = this.state;
  
      if (!componentes || Object.keys(componentes).length === 0) {
        return <div>Cargando...</div>;
      }
  
      return (
        <div>
          <form onSubmit={this.handleSubmit} className="form-container">
            {Object.keys(componentes).map((categoria, index) => (
              <div key={index} className="category-container">
                <h2 className="category-title">{categoria.replace(/_/g, ' ').toUpperCase()}</h2>
                <select
                  name={categoria.toLowerCase()}
                  id={categoria.toLowerCase()}
                  className="component-select"
                  value={selectedOptions[categoria]} // Establecer el valor seleccionado de acuerdo al estado
                  onChange={(event) => this.handleSelectChange(event, categoria)} // Manejar el cambio de selección
                >
                  <option value="">Seleccionar...</option> {/* Agregar una opción predeterminada */}
                  {componentes[categoria].map((item, itemIndex) => (
                    <option key={itemIndex} value={item.nombre}>{item.nombre} - {item.marca} - {item.precio} €</option>
                  ))}
                </select>
              </div>
            ))}
            <button type="submit" className="submit-button">Enviar</button>
          </form>
        </div>
      );
    }
  }


export default ComponentesListClass;
