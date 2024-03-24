import React, { useState, useEffect } from "react";
import { LineChart } from '@mui/x-charts/LineChart';
import { Stack, Checkbox, FormControlLabel } from "@mui/material"; // Importa los componentes de Material-UI
import axios from "axios";

const OrdersLineChart = ({ isCustomLineColors = false, isDashboard = false }) => {
    const [connectNulls, setConnectNulls] = useState(true); // Estado para controlar la opción de connectNulls
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/order/orders");
                const invoices = response.data;
                console.log("Invoices:", invoices);

                const totalsByYear = {};
                invoices.forEach((invoice) => {
                    const year = new Date(invoice.fecha_pedido).getFullYear();
                    console.log("Year:", year);
                    if (!totalsByYear[year]) {
                        totalsByYear[year] = { year, totalFacturado: 0, totalPendiente: 0 };
                    }
                    // Verificar si el valor de total_factura es válido antes de convertirlo a float
                    const totalFacturado = parseFloat(invoice.total);
                    console.log("Total Facturado:", totalFacturado);
                    if (!isNaN(totalFacturado)) {
                        totalsByYear[year].totalFacturado += totalFacturado;
                        if (invoice.estado === "Pendiente") {
                            totalsByYear[year].totalPendiente += totalFacturado;
                        }
                    } else {
                        console.error("Valor de total_factura no válido:", invoice.total_factura);
                    }
                });

                const formattedData = Object.values(totalsByYear).map((entry) => ({
                    year: entry.year,
                    Total_Facturado: entry.totalFacturado,
                    Pendiente_por_Cobrar: entry.totalPendiente,
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
            <FormControlLabel
                checked={connectNulls}
                control={
                    <Checkbox onChange={(event) => setConnectNulls(event.target.checked)} />
                }
                label="connectNulls"
                labelPlacement="end"
            />
            <LineChart
                xAxis={[{ data: data.map(entry => entry.year) }]} // Utiliza los años como datos para el eje x
                series={[
                    {
                        data: data.map(entry => entry.Total_Facturado), // Utiliza los datos de total facturado
                    },
                    {
                        data: data.map(entry => entry.Pendiente_por_Cobrar), // Utiliza los datos de pendiente de cobro
                        connectNulls, // Pasa la opción de connectNulls
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
