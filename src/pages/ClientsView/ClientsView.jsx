import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClientsView = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/clients-view');
        setClients(response.data);
      } catch (error) {
        console.error('Error fetching clients data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-5">
      <h1>Clients</h1>
      <table className="table">
        <thead>
          <tr>
            <th>CIF Cliente</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Población</th>
            <th>Provincia</th>
            <th>País</th>
            <th>Código Postal</th>
            <th>Teléfono</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client.cif_cliente}>
              <td>{client.cif_cliente}</td>
              <td>{client.nombre}</td>
              <td>{client.direccion}</td>
              <td>{client.poblacion}</td>
              <td>{client.provincia}</td>
              <td>{client.pais}</td>
              <td>{client.codigo_postal}</td>
              <td>{client.telefono}</td>
              <td>{client.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientsView;
