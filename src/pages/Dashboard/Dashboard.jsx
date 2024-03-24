import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import CreateClientForm from '../../components/CreateClient/CreateClient';
import './Dashboard.css'; // Importar el archivo CSS que contiene los estilos
import Invoices from '../Invoices/invoices';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./DashboardTheme.js";
import TopBar from '../../components/TopBar/TopBar.jsx';
//import DashboardSidebar from '../../components/DashboardSidebar/DashboardSidebar';
import DashboardPieChart from '../../components/DashboardPieChart/DashboardPieChart.jsx';
import DashboardTable from '../../components/DashboardTable/DashboardTable.jsx';
import DashboardBarChart from '../../components/DashboardBarChart/DashboardBarChart.jsx';
import OrdersLineChart from '../../components/OrdersLineChart/OrdersLineChart.jsx';

export default function Dashboard() {
  const [roleId, setRoleId] = useState(null);
  const [theme, colorMode] = useMode();

  useEffect(() => {
    // Recuperar el id_rol del usuario del localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setRoleId(user.id_rol);
      console.log(user);
    }
  }, []);

  return (
    <div className='min-h-screen dashboard-container'>
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="content">
        {/* Modo oscuro del dashboard */}
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
        {/* Contenido del dashboard */}
        <TopBar />
        {/* <DashboardSidebar /> */}
        <div className="dashboard-pie-container">
        <DashboardPieChart />
        </div>
        <div className="dashboard-bar-container">
        <DashboardBarChart />
        </div>
        <div className="dashboard-line-container">
        <OrdersLineChart />
        </div>
        <div className="dashboard-table-container">
        <DashboardTable/>
        </div>


          </ThemeProvider>
        </ColorModeContext.Provider>

        {roleId === 1 && <Invoices />} {/* Mostrar CreateClientForm solo si el rol es 1 */}
        {roleId === 2 && <CreateClientForm/>} {/* Mostrar ClientView solo si el rol es 2 */}
      </div>
    </div>
  );
}

