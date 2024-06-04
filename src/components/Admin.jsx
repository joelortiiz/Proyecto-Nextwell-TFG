import React, { useState, useEffect } from 'react';
import { db } from './../firebase/firebaseConfig';
import { subDays, startOfToday, format } from 'date-fns'; // Importa funciones de date-fns

// Importa la librería de gráficos que prefieras (por ejemplo, Chart.js)
import { Line } from 'react-chartjs-2';

export const Admin = () => {
    const [pedidosData, setPedidosData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const today = startOfToday(); // Fecha de hoy
                const lastWeek = subDays(today, 7); // Fecha hace una semana

                // Realiza una consulta a Firestore para obtener los pedidos de la última semana
                const querySnapshot = await db.collection('pedidos')
                    .where('fecha', '>=', lastWeek)
                    .get();

                // Procesa los datos para contar la cantidad de pedidos por día
                const data = Array(7).fill(0); // Inicializa un array con ceros para contar los pedidos por día

                querySnapshot.forEach(doc => {
                    const fecha = doc.data().fecha.toDate(); // Convierte la fecha de Firestore a un objeto Date
                    const dayIndex = Math.floor((today - fecha) / (1000 * 60 * 60 * 24)); // Calcula el índice del día en el array
                    if (dayIndex >= 0 && dayIndex < 7) { // Asegúrate de que el día esté dentro de la semana
                        data[dayIndex]++; // Incrementa el contador de pedidos para el día correspondiente
                    }
                });

                // Construye el objeto de datos para la gráfica
                const labels = Array.from({ length: 7 }, (_, i) => format(subDays(today, 6 - i), 'yyyy-MM-dd')); // Genera etiquetas para los días de la semana
                const chartData = {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Pedidos',
                            data: data,
                            fill: false,
                            backgroundColor: 'rgba(75,192,192,0.4)',
                            borderColor: 'rgba(75,192,192,1)',
                        },
                    ],
                };

                // Actualiza el estado con los datos de la gráfica
                setPedidosData(chartData);
            } catch (error) {
                console.error('Error fetching pedidos:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Pedidos de la última semana</h2>
            <Line data={pedidosData} />
        </div>
    );
};

