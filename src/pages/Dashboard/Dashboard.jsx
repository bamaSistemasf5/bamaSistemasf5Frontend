import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import CreateClientForm from '../../components/CreateClient/CreateClient';
import './Dashboard.css'; // Importar el archivo CSS que contiene los estilos
import Invoices from '../Invoices/invoices';

export default function Dashboard() {
  const [roleId, setRoleId] = useState(null);

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
        {/* Sidebar */}
        <Sidebar />
      </div>
      <div className="content">
        {/* Contenido del dashboard */}
        {roleId === 1 && <Invoices />} {/* Mostrar CreateClientForm solo si el rol es 1 */}
        {roleId === 2 && <CreateClientForm/>} {/* Mostrar ClientView solo si el rol es 2 */}
      </div>
    </div>
  );
}

