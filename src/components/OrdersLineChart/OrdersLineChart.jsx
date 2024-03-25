import React, { useState, useEffect } from "react";
import { LineChart } from '@mui/x-charts/LineChart';
import { Stack } from "@mui/material"; // Importa los componentes necesarios de Material-UI
import axios from "axios";

const OrdersLineChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/order/orders");
                const orders = response.data;
                console.log("Ordenes data:", orders);
        
                const totalsByYear = {};
                orders.forEach((order) => {
                    const year = new Date(order.fecha_pedido).getFullYear();
                    console.log("Year:", year);
                    if (!totalsByYear[year]) {
                        totalsByYear[year] = { year, totalFacturado: 0, totalPendiente: 0, totalPagado: 0 };
                    }
                    // Verificar si el valor de total es válido antes de convertirlo a float
                    if (order.total !== null && order.total !== undefined) {
                        const totalFacturado = parseFloat(order.total);
                        console.log("Total Facturado:", totalFacturado);
                        if (!isNaN(totalFacturado)) {
                            totalsByYear[year].totalFacturado += totalFacturado;
                        } else {
                            console.error("Valor de total no válido:", order.total);
                        }
                        // Actualizar totalPendiente si el estado de la factura es "Pendiente"
                        if (order.estado === "Abierto") {
                            totalsByYear[year].totalPendiente += totalFacturado;
                        }
                        // Actualizar totalPagado si el estado de la factura es "Cerrado"
                        if (order.estado === "Cerrado") {
                            totalsByYear[year].totalPagado += totalFacturado;
                        }
                    }
                });
        
                const formattedData = Object.values(totalsByYear).map((entry) => ({
                    year: entry.year,
                    Total_Facturado: entry.totalFacturado,
                    Pendiente_por_Cobrar: entry.totalPendiente,
                    Pagado: entry.totalPagado, // Agregar el monto pagado al objeto de datos formateados
                }));
        
                setData(formattedData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        
        fetchData();
    }, []);

    return (
        <Stack sx={{ width: '100%' }}>
            <LineChart
                xAxis={[{ data: data.map(entry => entry.year) }]} // Utiliza los años como datos para el eje x
                series={[
                    {
                        label: 'Total Pedidos',
                        data: data.map(entry => entry.Total_Facturado), // Utiliza los datos de total facturado
                    },
                    {
                        label: 'Pendiente por cobrar',
                        data: data.map(entry => entry.Pendiente_por_Cobrar), // Utiliza los datos de pendiente de cobro
                        connectNulls: true, // Conecta los valores nulos
                        area: true, // Renderiza como área
                    },
                    {
                        label: 'Pagado',
                        data: data.map(entry => entry.Pagado), // Utiliza los datos de monto pagado
                        connectNulls: true, // Conecta los valores nulos
                        area: true, // Renderiza como área
                    },
                ]}
                height={200}
                margin={{ top: 10, bottom: 20 }}
                skipAnimation
            />
        </Stack>
    );
};

export default OrdersLineChart;
