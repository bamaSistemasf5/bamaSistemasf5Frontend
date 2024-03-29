import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../pages/Dashboard/DashboardTheme";

import axios from "axios"; // Importar axios para hacer la solicitud GET

const DashboardOrdersTable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  // Definir las columnas de la tabla
  const columns = [
   
    { field: "id_pedido", headerName: "Nro. Pedido", flex: 1 },
    { field: "cif_cliente", headerName: "CIF CLiente", flex: 1 },
    { field: "cliente", headerName: "Cliente", flex: 1 },
    { field: "fecha_pedido", headerName: "Fecha Pedido", flex: 1 },
    { field: "total", headerName: "Total", flex: 1 },
    { field: "estado", headerName: "Estado", flex: 1 },

  ];

  // Estado para almacenar los datos de la tabla
  const [rows, setRows] = useState([]);

  // Función para obtener los datos del servidor y establecerlos en el estado de la tabla
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/order/orders");
        // Agregar nro_factura como id único a cada fila
        const rowsWithId = response.data.map(row => ({
          ...row,
          id: row.id_pedido, // Usar nro_factura como id
        }));
        setRows(rowsWithId); // Establecer los datos con nro_factura como id en el estado de la tabla
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  // El segundo argumento del useEffect es un array vacío, lo que significa que solo se ejecutará una vez al montar el componente

  return (
    <Box m="20px">
      <Box
        m="40px 0 0 0"
        height="75vh"
        width="80vw"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            // backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        {/* Usar los datos obtenidos del servidor para llenar la tabla */}
        <DataGrid checkboxSelection rows={rows} columns={columns} />
      </Box>
    </Box>
  );
};

export default DashboardOrdersTable;
