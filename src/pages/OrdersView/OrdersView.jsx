import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OrdersView.css";
import { Table, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Importa useNavigate (mejor que usenavigate) para manejar la redirección

const OrdersView = () => {
  const navigate = useNavigate(); // Inicializa useNavigate

  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredNotes] = useState([]);
  const [searchInputs, setSearchInputs] = useState({
    nro_pedido: "",
    fecha: "",
    cliente: "",
    cif_cliente: "",
    importe: "",
    porcentaje_facturado: "",
    estado: "",
    facturas: "",
    albaranes: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/order/orders");
        setClients(response.data);
        setFilteredNotes(response.data);
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

  const filterNotes = () => {
    const filteredData = clients.filter((client) =>
      Object.keys(searchInputs).every((key) =>
        client[key].toLowerCase().includes(searchInputs[key].toLowerCase())
      )
    );
    setFilteredNotes(filteredData);
  };

  useEffect(() => {
    filterNotes();
  }, [searchInputs]);

  const [showModal, setShowModal] = useState(false);
  const [noteToDelete, setnoteToDelete] = useState(null);
  const [noteToEdit, setnoteToEdit] = useState(null);

  const handleEditClick = (client) => {
    console.log("Cliente seleccionado para editar:", client);
    navigate(`/order/update-order/${client.cif_cliente}`, {
      state: { noteData: client },
    });
    setShowModal(true);
  };

  const handleDeleteClick = (client) => {
    setnoteToDelete(client);
    setShowModal(true);
  };

  const handleConfirmAction = () => {
    if (noteToDelete) {
      axios
        .delete(
          `http://localhost:3000/clients-view/${noteToDelete.cif_cliente}`
        )
        .then((response) => {
          const updatedClients = clients.filter(
            (client) => client.cif_cliente !== noteToDelete.cif_cliente
          );
          setClients(updatedClients);
          setFilteredNotes(updatedClients);
        })
        .catch((error) => {
          console.error("Error deleting client:", error);
        });
    } else if (noteToEdit) {
      // Redirige a la página de edición con los detalles del cliente
      navigate(`/update-order/${noteToEdit.cif_cliente}`, {
        noteData: noteToEdit,
      });
    }
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setnoteToDelete(null);
    setnoteToEdit(null);
  };

  const handleCreateUserClick = () => {
    navigate("/create-order");
  };

  return (
    <div>
      <h1 className="text-center mb-4">Clientes</h1>
      <div>
        <Table striped bordered responsive hover>
          <thead>
            <tr>
              <th>
                <input
                  type="text"
                  name="cif_cliente"
                  value={searchInputs.cif_cliente}
                  onChange={handleInputChange}
                  placeholder="Nro Pedido"
                  className="half-size-font"
                />
              </th>
              <th>
                <input
                  type="text"
                  name="nombre"
                  value={searchInputs.nombre}
                  onChange={handleInputChange}
                  placeholder="Fecha pedido"
                  className="half-size-font"
                />
              </th>
              <th>
                <input
                  type="text"
                  name="direccion"
                  value={searchInputs.direccion}
                  onChange={handleInputChange}
                  placeholder="Cliente"
                  className="half-size-font"
                />
              </th>
              <th>
                <input
                  type="text"
                  name="poblacion"
                  value={searchInputs.poblacion}
                  onChange={handleInputChange}
                  placeholder="CIF cliente"
                  className="half-size-font"
                />
              </th>
              <th>
                <input
                  type="text"
                  name="provincia"
                  value={searchInputs.provincia}
                  onChange={handleInputChange}
                  placeholder="Importe"
                  className="half-size-font"
                />
              </th>
              <th>
                <input
                  type="text"
                  name="pais"
                  value={searchInputs.pais}
                  onChange={handleInputChange}
                  placeholder="Porcentaje facturado"
                  className="half-size-font"
                />
              </th>
              <th>
                <input
                  type="text"
                  name="Estado"
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
                  placeholder="Total facturas"
                  className="half-size-font"
                />
              </th>
              <th>
                <input
                  type="text"
                  name="email"
                  value={searchInputs.email}
                  onChange={handleInputChange}
                  placeholder="Total Albaranes"
                  className="half-size-font"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((client) => (
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
                  <Button
                    variant="warning"
                    onClick={() => handleEditClick(client)}
                  >
                    🖋️
                  </Button>
                </td>
                <td className="table-data">
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteClick(client)}
                  >
                    ↓
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
          {noteToDelete && (
            <p>
              ¿Seguro que quieres eliminar al cliente{" "}
              {noteToDelete.cif_cliente} {noteToDelete.nombre}?
            </p>
          )}
          {noteToEdit && (
            <p>
              ¿Seguro que quieres editar al cliente {noteToEdit.cif_cliente}{" "}
              {noteToEdit.nombre}?
            </p>
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
      <div className="text-center">
        <Button variant="success" onClick={handleCreateUserClick}>
          Crear Nuevo Pedido
        </Button>
      </div>
    </div>
  );
};

export default OrdersView;
