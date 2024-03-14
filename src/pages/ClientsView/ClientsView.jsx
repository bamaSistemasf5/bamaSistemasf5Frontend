import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ClientsView.css';
import { Table, Button, Modal } from 'react-bootstrap';


// Hook para navegar entre rutas

const ClientsView = () => {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [searchInputs, setSearchInputs] = useState({
    cif_cliente: '',
    nombre: '',
    direccion: '',
    poblacion: '',
    provincia: '',
    pais: '',
    codigo_postal: '',
    telefono: '',
    email: ''
  });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/clients-view');
        setClients(response.data);
        setFilteredClients(response.data);
      } catch (error) {
        console.error('Error fetching clients data:', error);
      }
    };
    
    fetchData();
  }, []);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchInputs(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const filterClients = () => {
    const filteredData = clients.filter(client =>
      Object.keys(searchInputs).every(key =>
        client[key].toLowerCase().includes(searchInputs[key].toLowerCase())
        )
        );
        setFilteredClients(filteredData);
      };
      
      useEffect(() => {
        filterClients();
      }, [searchInputs]);
      
      
      
      
      
      const [showModal, setShowModal] = useState(false);
      const [clientToDelete, setClientToDelete] = useState(null);
      const [clientToEdit, setClientToEdit] = useState(null);
     
      
      const handleEditClick = (client) => {
    setClientToEdit(client);
    setShowModal(true);
  };

  const handleDeleteClick = (client) => {
    setClientToDelete(client);
    setShowModal(true);
  };

  const handleConfirmAction = () => {
    if (clientToDelete) {
    
      axios.delete(`http://localhost:300/clients-view/${clientToDelete.id}`)
      .then(response => {
      //Actualizar la lista de clientes después de eliminar
      const updatedClients = clients.filter(client => client.id !== clientToDelete.id);
      setClients(updatedClients);
      setFilteredClients(updatedClients);
      })
    .catch(error => {
      console.error('Error deleting client:', error);
      });
    } else if (clientToEdit) {
      // Lógica para editar al cliente
      // Aquí puedes implementar la llamada a la API para editar al cliente
      // Por ejemplo:
      axios.put(`http://localhost:3000/clients-view/${clientToEdit.id}`, clientToEdit)
      .then(response => {
      // Actualizar la lista de clientes después de editar
      const updatedClients = clients.map(client => {
      if (client.id === clientToEdit.id) {
        return response.data;
       }
      return client;
           });
           setClients(updatedClients);
           setFilteredClients(updatedClients);
         })
        .catch(error => {
           console.error('Error editing client:', error);
         });
    }
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setClientToDelete(null);
    setClientToEdit(null);
  };


  return (
    <div>
    <h1 className="text-center mb-4">Clientes</h1>
    
    <div>
    <Table striped bordered responsive hover>
        <thead>
          <tr>
            <th><input type="text" name="cif_cliente" value={searchInputs.cif_cliente} onChange={handleInputChange} placeholder="CIF Cliente" className="half-size-font" /></th>
            <th><input type="text" name="nombre" value={searchInputs.nombre} onChange={handleInputChange} placeholder="Nombre" className="half-size-font" /></th>
            <th><input type="text" name="direccion" value={searchInputs.direccion} onChange={handleInputChange} placeholder="Dirección" className="half-size-font" /></th>
            <th><input type="text" name="poblacion" value={searchInputs.poblacion} onChange={handleInputChange} placeholder="Población" className="half-size-font" /></th>
            <th><input type="text" name="provincia" value={searchInputs.provincia} onChange={handleInputChange} placeholder="Provincia" className="half-size-font" /></th>
            <th><input type="text" name="pais" value={searchInputs.pais} onChange={handleInputChange} placeholder="País" className="half-size-font" /></th>
            <th><input type="text" name="codigo_postal" value={searchInputs.codigo_postal} onChange={handleInputChange} placeholder="Código Postal" className="half-size-font" /></th>
            <th><input type="text" name="telefono" value={searchInputs.telefono} onChange={handleInputChange} placeholder="Teléfono" className="half-size-font" /></th>
            <th><input type="text" name="email" value={searchInputs.email} onChange={handleInputChange} placeholder="Email" className="half-size-font" /></th>
          </tr>
        </thead>
        <tbody>
          {filteredClients.map(client => (
            <tr key={client.cif_cliente}>
              <td className="table-data">{client.cif_cliente}</td>
              <td className="table-data">{client.nombre}</td>
              <td className="table-data">{client.direccion}</td>
              <td className="table-data">{client.poblacion}</td>
              <td className="table-data">{client.provincia}</td>
              <td className="table-data">{client.pais}</td>
              <td className="table-data">{client.codigo_postal}</td>
              <td className="table-data">{client.telefono}</td>
              <td className="table-data">{client.email}</td>
              <td className="table-data">
                  <Button variant="warning" onClick={() => handleEditClick(client)}>🖋️</Button>
                </td>
                <td className="table-data">
                  <Button variant="danger" onClick={() => handleDeleteClick(client)}>🗑️</Button>
                </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
    <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {clientToDelete && (
            <p>¿Seguro que quieres eliminar al cliente {clientToDelete.cif_cliente} {clientToDelete.nombre}?</p>
          )}
          {clientToEdit && (
            <p>¿Seguro que quieres editar al cliente {clientToEdit.cif_cliente} {clientToEdit.nombre}?</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleConfirmAction}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
  </div>
  );
};

export default ClientsView;
