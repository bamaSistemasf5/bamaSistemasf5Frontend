import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import './Dashboard.css'; // Importar el archivo CSS que contiene los estilos
import DashboardPieChart from '../../components/DashboardPieChart/DashboardPieChart.jsx'
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./DashboardTheme.js";
import TopBar from '../../components/TopBar/TopBar.jsx';
//import DashboardSidebar from '../../components/DashboardSidebar/DashboardSidebar';
import DashboardOrdersTable from '../../components/DashboarOrdersTable/DashboardOrdersTable.jsx';

export default function Dashboard() {
  const [roleId, setRoleId] = useState(null);
  const [theme, colorMode] = useMode();

  useEffect(() => {
    // Recuperar el id_rol del usuario del localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setRoleId(user.id_rol);
     // console.log(user);
    }
  }, []);

  return (
    <div className='min-h-screen dashboard-container'>
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="dashboard-content">
        {/* Modo oscuro del dashboard */}
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
       
            <CssBaseline />
            <TopBar colorMode={colorMode} theme={theme} />
     


          </ThemeProvider>
        </ColorModeContext.Provider>

        {roleId === 1 && <DashboardPieChart />} {/* Mostrar CreateClientForm solo si el rol es 1 */}
        {roleId === 2 && <DashboardOrdersTable/>} {/* Mostrar ClientView solo si el rol es 2 */}
      </div>
    </div>
  );
}

