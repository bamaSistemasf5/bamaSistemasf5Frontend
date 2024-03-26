import { useEffect, useState } from "react";
import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../../pages/Dashboard/DashboardTheme.js";
import { format } from "date-fns";
import axios from "axios";

const DashboardBarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/invoices-view");
        const formattedData = response.data.map((item) => ({
            ...item,
            fecha: format(new Date(item.fecha), "MMMM"), // Formato mes completo
          }));
          setData(formattedData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    fetchData();
  }, []);
  return (
     <ResponsiveBar
      data={data}
      keys={["total_factura"]}
      indexBy="fecha"
      margin={{ top: 50, right: 120, bottom: 50, left: 100 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "category10" }}
    
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Fecha Factura",
        legendPosition: "middle",
        legendOffset: 32,
      
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Total Factura",
        legendPosition: "middle",
        legendOffset: -50,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      barAriaLabel={(e) => `${e.indexValue}: ${e.formattedValue} in Fecha Factura: ${e.indexValue}`}
      width={window.innerWidth * 0.5} // La mitad del ancho de la ventana
      height={window.innerHeight * 0.5} // La mitad de la altura de la ventana
    />
  );

};

export default DashboardBarChart;
