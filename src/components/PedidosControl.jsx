import { useState, useEffect } from 'react'
import { db } from './../firebase/firebaseConfig';
import { useAtuh } from '../context/AuthContext';
import { collection, onSnapshot, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { startOfToday, subDays } from 'date-fns';

import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    Title,
} from 'chart.js';

// import { Chart } from 'react-chartjs-2';
// import { useGetPedidos } from "../services/hooks/useGetPedidos";
ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Legend,
    Tooltip
);

export const LinesChart = () => {

    
        const { usuario } = useAtuh();
        const [pedidosData, setPedidosData] = useState([]);

        useEffect(() => {
            const fetchPedidos = async () => {
                try {
                    const fechaActual = new Date();
                    const pedidosPorDia = [];
    
                    // Iterar sobre los últimos 7 días
                    for (let i = 0; i < 7; i++) {
                        // Calcular la fecha hace i días
                        const fechaHaceNDias = subDays(fechaActual, i);
                        const año = fechaHaceNDias.getFullYear();
                        const mes = fechaHaceNDias.getMonth() + 1;
                        const dia = fechaHaceNDias.getDate();
                        const fechaFormateada = `${año}-${mes < 10 ? '0' : ''}${mes}-${dia < 10 ? '0' : ''}${dia}`;
    
                        // Crear un nuevo rango de fechas para la consulta
                        const fechaInicio = Timestamp.fromDate(subDays(fechaHaceNDias, 1));
                        const fechaFin = Timestamp.fromDate(fechaHaceNDias);
    
                        // Realizar la consulta para el día actual
                        const queryDoc = query(collection(db, 'cesta'),
                        where('fecha', '>=', fechaInicio)
                        , where('fecha', '<=', fechaFin))
                        
                        const consulta = await getDocs(queryDoc);
                        const cantidadDocumentos = consulta.size;
    
                        // Agregar la cantidad de pedidos para el día actual al array
                        pedidosPorDia.unshift(cantidadDocumentos);
                        
                    }
                    setPedidosData(pedidosPorDia);
                    console.log("Pedidos por día de la última semana:", pedidosPorDia);
                } catch (error) {
                    console.error('Error fetching user:', error);
                }
            };
            fetchPedidos();
        }, [usuario]); // Asegúrate de incluir usuario en las dependencias de useEffect si es necesario
    ;
    
    var midata = {

        labels: ['1', '2', '3', '4', '5', '6', '7'],
        datasets: [
            {
                type: 'line',
                label: 'Pedidos totales del dia',
                borderColor: 'greenyellow',
                borderWidth: 2,
                fill: false,
                data: pedidosData
            }

        ]
    };

    var misoptions = {
        scales: {
            y: {
                beginAtZero: true
            }
        }

    };

    return <Line data={midata} options={misoptions} />
}