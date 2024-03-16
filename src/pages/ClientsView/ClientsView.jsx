import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ClientsView.css";
import { Table, Button, Modal, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ClientsView = () => {
  const navigate = useNavigate();
  const [clientDeleted, setClientDeleted] = useState(false);
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [searchInputs, setSearchInputs] = useState({
    cif_cliente: "",
    nombre: "",
    direccion: "",
    poblacion: "",
    provincia: "",
    pais: "",
    codigo_postal: "",
    telefono: "",
    email: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/clients-view");
        setClients(response.data);
        setFilteredClients(response.data);
      } catch (error) {
        console.error("Error fetching clients data:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const filterClients = () => {
    const filteredData = clients.filter((client) =>
      Object.keys(searchInputs).every((key) =>
        client[key].toLowerCase().includes(searchInputs[key].toLowerCase())
      )
    );
    setFilteredClients(filteredData);
  };

  useEffect(() => {
    filterClients();
  }, [searchInputs]);

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [clientToDelete, setClientToDelete] = useState(null);
  const [clientToEdit, setClientToEdit] = useState(null);

  const handleEditClick = (client) => {
    console.log("Cliente seleccionado para editar:", client);
    navigate(`/update-client/${client.cif_cliente}`, {
      state: { clientData: client },
    });
  };

  const handleDeleteClick = (client) => {
    setClientToDelete(client);
    setShowModal(true); // Aquí asegúrate de que showModal se establezca en true
    setModalMessage(`¿Seguro que quieres eliminar al cliente ${client.cif_cliente} ${client.nombre}?`);
  };
  
  const handleConfirmAction = () => {
    if (clientToDelete) {
      axios
        .delete(
          `http://localhost:3000/clients-view/${clientToDelete.cif_cliente}`
        )
        .then((response) => {
          const updatedClients = clients.filter(
            (client) => client.cif_cliente !== clientToDelete.cif_cliente
          );
          setClients(updatedClients);
          setFilteredClients(updatedClients);
          setClientToDelete(null);
          setClientDeleted(true);
        })
        .catch((error) => {
          console.error("Error deleting client:", error);
          setShowModal(true);
          if (error.response) {
            const status = error.response.status;
            let errorMessage = "Error desconocido.";
            switch (status) {
              case 400:
                errorMessage = "Petición incorrecta.";
                break;
              case 401:
                errorMessage = "No autorizado.";
                break;
              case 403:
                errorMessage = "Acción no permitida.";
                break;
              case 404:
                errorMessage = "Recurso no encontrado.";
                break;
              case 500:
                errorMessage = "Acción no permitida por restricción en pagos pendientes. Gracias, Luis.";
                break;
              default:
                errorMessage = "Ocurrió un error.";
            }
            setModalMessage(errorMessage);
          } else if (error.request) {
            setModalMessage("Imposible conectar con la base de datos.");
          } else {
            setModalMessage("Error al procesar la solicitud.");
          }
        });
    }
  };
  
  

  const handleCloseModal = () => {
    setShowModal(false);
    setClientToDelete(null);
    setClientToEdit(null);
  };

  const handleCreateUserClick = () => {
    navigate("/create-client");
  };

  return (
    <Container className="Container">
      <h1 className="text-center mb-4">Clientes</h1>
      <div >
        <Table className="table-responsive" striped bordered hover>
          <thead>
            <tr>
              <th>
                <input
                  type="text"
                  name="cif_cliente"
                  value={searchInputs.cif_cliente}
                  onChange={handleInputChange}
                  placeholder="CIF Cliente"
                  className="half-size-font"
                />
              </th>
              <th>
                <input
                  type="text"
                  name="nombre"
                  value={searchInputs.nombre}
                  onChange={handleInputChange}
                  placeholder="Nombre"
                  className="half-size-font"
                />
              </th>
              <th>
                <input
                  type="text"
                  name="direccion"
                  value={searchInputs.direccion}
                  onChange={handleInputChange}
                  placeholder="Dirección"
                  className="half-size-font"
                />
              </th>
              <th>
                <input
                  type="text"
                  name="poblacion"
                  value={searchInputs.poblacion}
                  onChange={handleInputChange}
                  placeholder="Población"
                  className="half-size-font"
                />
              </th>
              <th>
                <input
                  type="text"
                  name="provincia"
                  value={searchInputs.provincia}
                  onChange={handleInputChange}
                  placeholder="Provincia"
                  className="half-size-font"
                />
              </th>
              <th>
                <input
                  type="text"
                  name="pais"
                  value={searchInputs.pais}
                  onChange={handleInputChange}
                  placeholder="País"
                  className="half-size-font"
                />
              </th>
              <th>
                <input
                  type="text"
                  name="codigo_postal"
                  value={searchInputs.codigo_postal}
                  onChange={handleInputChange}
                  placeholder="Código Postal"
                  className="half-size-font"
                />
              </th>
              <th>
                <input
                  type="text"
                  name="telefono"
                  value={searchInputs.telefono}
                  onChange={handleInputChange}
                  placeholder="Teléfono"
                  className="half-size-font"
                />
              </th>
              <th>
                <input
                  type="text"
                  name="email"
                  value={searchInputs.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="half-size-font"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((client) => (
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
                <td className="buttons-column">
                  <Button className="ed-button"
                    variant="warning"
                    onClick={() => handleEditClick(client)}
                  >
                    🖋️
                  </Button>
                </td>
                <td className="buttons-column">
                  <Button className="ed-button" 
                    variant="danger"
                    onClick={() => handleDeleteClick(client)}
                  >
                    🗑️
                  </Button>
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
      {clientDeleted ? (
        <p>Cliente eliminado con éxito.</p>
      ) : (
        <p>{modalMessage}</p>
      )}
    </Modal.Body>
    <Modal.Footer>
      {clientDeleted ? (
        <Button variant="secondary" onClick={handleCloseModal}>
          Cerrar
        </Button>
      ) : (
        <>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleConfirmAction}>
            Confirmar
          </Button>
        </>
      )}
    </Modal.Footer>
  </Modal>
      <div className="text-center">
        <Button variant="success" onClick={handleCreateUserClick}>
          Crear Nuevo Usuario
        </Button>
      </div>
    </Container>
  );
};

export default ClientsView;
