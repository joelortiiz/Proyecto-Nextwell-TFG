import { useState, useEffect } from 'react';
import { db } from './../firebase/firebaseConfig';
import { useAtuh } from '../context/AuthContext';
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { subDays } from 'date-fns';

import { Line, Bar } from 'react-chartjs-2';
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
    const [pedidosMes, setPedidosMes] = useState([]);

    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                const fechaActual = new Date();
                const pedidosPorDia = [];

                // Iterar sobre los últimos 7 días
                for (let i = 0; i < 7; i++) {
                    const fechaHaceNDias = subDays(fechaActual, i);
                    const fechaInicio = Timestamp.fromDate(subDays(fechaHaceNDias, 1));
                    const fechaFin = Timestamp.fromDate(fechaHaceNDias);

                    const queryDoc = query(
                        collection(db, 'cesta'),
                        where('fecha', '>=', fechaInicio),
                        where('fecha', '<=', fechaFin)
                    );

                    const consulta = await getDocs(queryDoc);
                    const cantidadDocumentos = consulta.size;
                    pedidosPorDia.unshift(cantidadDocumentos);
                }

                setPedidosData(pedidosPorDia);
                console.log("Pedidos por día de la última semana:", pedidosPorDia);
            } catch (error) {
                console.error('Error fetching pedidos:', error);
            }
        };

        const fetchPedidosMes = async () => {
            try {
                const fechaActual = new Date();
                const pedidosPorMes = [];

                // Iterar sobre los últimos 12 meses
                for (let i = 0; i < 12; i++) {
                    const fechaHaceNMeses = new Date(fechaActual.getFullYear(), fechaActual.getMonth() - i, 1);
                    const fechaInicio = new Date(fechaHaceNMeses.getFullYear(), fechaHaceNMeses.getMonth(), 1);
                    const fechaFin = new Date(fechaHaceNMeses.getFullYear(), fechaHaceNMeses.getMonth() + 1, 0, 23, 59, 59);

                    const queryDoc = query(
                        collection(db, 'cesta'),
                        where('fecha', '>=', Timestamp.fromDate(fechaInicio)),
                        where('fecha', '<=', Timestamp.fromDate(fechaFin))
                    );

                    const consulta = await getDocs(queryDoc);
                    const cantidadDocumentos = consulta.size;
                    pedidosPorMes.unshift({
                        mes: `${fechaHaceNMeses.getFullYear()}-${(fechaHaceNMeses.getMonth() + 1).toString().padStart(2, '0')}`,
                        cantidad: cantidadDocumentos
                    });
                }

                setPedidosMes(pedidosPorMes);
                console.log("Pedidos por mes del último año:", pedidosPorMes);
            } catch (error) {
                console.error('Error fetching pedidos:', error);
            }
        };

        fetchPedidos();
        fetchPedidosMes();
    }, [usuario]);

    const pedidosMesLabels = pedidosMes.map(p => p.mes);
    const pedidosMesData = pedidosMes.map(p => p.cantidad);

    const midata = {
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

    const midata2 = {
        labels: pedidosMesLabels,
        datasets: [
            {
                type: 'bar',
                label: 'Pedidos Anuales',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                data: pedidosMesData
            }
        ]
    };

    const misoptions = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        <>
            <Line data={midata} options={misoptions} />

            <h2>
                Total de pedidos anuales
            </h2>
            <Bar data={midata2} options={misoptions} />
        </>
    );
};
