import { ResponsivePie } from "@nivo/pie";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material";
import axios from "axios";
import { tokens } from "../../pages/Dashboard/DashboardTheme.js";
import React from "react";

const DashboardPieChart = () => {
 

  const [totalFacturado, setTotalFacturado] = useState(0);
  const [totalPendiente, setTotalPendiente] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/invoices-view");
        const invoices = response.data;
        // console.log(invoices);

        // Calcular el total facturado y el total pendiente
        let totalFacturado = 0;
        let totalPendiente = 0;
        invoices.forEach((invoice) => {
          const factura = parseFloat(invoice.total_factura);
          if (!isNaN(factura)) {
            const invoiceYear = new Date(invoice.fecha).getFullYear();
            const invoiceMonth = new Date(invoice.fecha).getMonth();
            const currentYear = new Date().getFullYear();
            const currentMonth = new Date().getMonth();

            if (invoiceYear === currentYear && invoiceMonth === currentMonth) {
              totalFacturado += factura;
              if (invoice.estado === "Pendiente") {
                totalPendiente += factura;
              }
            }
          } else {
           // console.error("Total_factura inválido:", invoice.total_factura);
          }
        });

        //console.log("Total facturado:", totalFacturado);
        //console.log("Total pendiente:", totalPendiente);

        setTotalFacturado(totalFacturado);
        setTotalPendiente(totalPendiente);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const data = [
    { id: "Total Facturado", 
      label: "Total Facturado",
       value: totalFacturado },
    {
      id: "Pendiente por Cobrar",
      label: "Pendiente por Cobrar",
      value: totalPendiente,
    },
  ];

   return (
    <ResponsivePie
      data={data}
      colors={{ scheme: 'category10' }}
      // colors={{ scheme: "nivo" }} // Puedes cambiar el esquema de color aquí
      margin={{ top: 20, right: 40, bottom: 20, left: 40 }}
      innerRadius={0.2}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor="red"
    
      arcLinkLabelsTextColor="red"
    
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor="red"

      arcLabelsTextColor="black"
      width={window.innerWidth * 0.8} // La mitad del ancho de la ventana
      height={window.innerHeight * 0.5} // La mitad de la altura de la ventana
    />
  );
};


export default DashboardPieChart;
