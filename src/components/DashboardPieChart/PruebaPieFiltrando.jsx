import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";
import axios from "axios";

const PieChart = () => {
  const theme = useTheme();

  const [totalFacturado, setTotalFacturado] = useState(0);
  const [totalPendiente, setTotalPendiente] = useState(0);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // getMonth() devuelve el índice del mes (0-11)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/invoices-view");
        const invoices = response.data;

        let totalFacturado = 0;
        let totalPendiente = 0;

        invoices.forEach((invoice) => {
          const factura = parseFloat(invoice.total_factura);
          if (!isNaN(factura) && factura !== null) {
            const invoiceYear = new Date(invoice.fecha).getFullYear();
            const invoiceMonth = new Date(invoice.fecha).getMonth() + 1; // getMonth() devuelve el índice del mes (0-11)

            if (
              invoiceYear === selectedYear &&
              invoiceMonth === selectedMonth
            ) {
              totalFacturado += factura;
              if (invoice.estado === "Pendiente") {
                totalPendiente += factura;
              }
            }
          } else {
            console.error(
              "Total factura inválido o nulo:",
              invoice.total_factura
            );
          }
        });

        setTotalFacturado(totalFacturado);
        setTotalPendiente(totalPendiente);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedYear, selectedMonth]);

  const data = [
    { id: "Total Facturado", label: "Total Facturado", value: totalFacturado },
    {
      id: "Pendiente por Cobrar",
      label: "Pendiente por Cobrar",
      value: totalPendiente,
    },
  ];

  console.log("data recogida:", data);

  return (
    <div>
      <div>
        <label>Año:</label>
        <input
          type="number"
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
        />
      </div>
      <div>
        <label>Mes:</label>
        <input
          type="number"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
        />
      </div>
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
      />
    </div>
  );
};

export default PieChart;
