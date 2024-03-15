import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Invoices.css";
import { Table, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Importa useNavigate (mejor que usenavigate) para manejar la redirección

const Invoices = () => { const navigate = useNavigate(); // Inicializa useNavigate

const [clients, setClients] = useState([]);
const [filteredClients, setFilteredClients] = useState([]);
const [searchInputs, setSearchInputs] = useState({
  nro_factura: "",
  fecha: "",
  cliente: "",
  cif_cliente: "",
  fecha_vencimiento: "",
  fecha_cobro: "",
  estado: "",
  base_imponible: "",
  porc_iva: "",
  importe_iva: "",
  total_factura: "",
  nro_pedido: "",
  pedido: "",
  albaran: ""
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
const [clientToDelete, setClientToDelete] = useState(null);
const [clientToEdit, setClientToEdit] = useState(null);

const handleEditClick = (client) => {
  console.log("Cliente seleccionado para editar:", client);
  navigate(`/update-invoice/${client.cif_cliente}`, {
    state: { clientData: client },
  });
  setShowModal(true);
};

const handleDeleteClick = (client) => {
  setClientToDelete(client);
  setShowModal(true);
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
      })
      .catch((error) => {
        console.error("Error deleting client:", error);
      });
  } else if (clientToEdit) {
    // Redirige a la página de edición con los detalles del cliente
    navigate(`/update-client/${clientToEdit.cif_cliente}`, {
      clientData: clientToEdit,
    });
  }
  setShowModal(false);
};

const handleCloseModal = () => {
  setShowModal(false);
  setClientToDelete(null);
  setClientToEdit(null);
};

const handleCreateClick = () => {
  navigate("/create-invoice");
};

return (
  <div>
    <h1 className="text-center mb-4">Facturas</h1>
    <div>
      <Table striped bordered responsive hover>
        <thead>
          <tr>
            <th>
              <input
                type="text"
                name="dn-number"
                value={searchInputs.cif_cliente}
                onChange={handleInputChange}
                placeholder="Nro Factura"
                className="half-size-font"
              />
            </th>
            <th>
              <input
                type="text"
                name="date"
                value={searchInputs.nombre}
                onChange={handleInputChange}
                placeholder="Fecha"
                className="half-size-font"
              />
            </th>
            <th>
              <input
                type="text"
                name="client"
                value={searchInputs.direccion}
                onChange={handleInputChange}
                placeholder="Cliente"
                className="half-size-font"
              />
            </th>
            <th>
              <input
                type="text"
                name="cif-client"
                value={searchInputs.poblacion}
                onChange={handleInputChange}
                placeholder="CIF cliente"
                className="half-size-font"
              />
            </th>
            <th>
              <input
                type="date"
                name="check"
                value={searchInputs.provincia}
                onChange={handleInputChange}
                placeholder="Fecha de vencimiento"
                className="half-size-font"
              />
            </th>
            <th>
              <input
                type="date"
                name="check"
                value={searchInputs.provincia}
                onChange={handleInputChange}
                placeholder="Fecha de cobro"
                className="half-size-font"
              />
            </th>
            <th>
              <input
                type="checkbox"
                name="check"
                value={searchInputs.provincia}
                onChange={handleInputChange}
                placeholder="Estado"
                className="half-size-font"
              />
            </th>
            <th>
              <input
                type="number"
                name="total"
                value={searchInputs.pais}
                onChange={handleInputChange}
                placeholder="Base imponible"
                className="half-size-font"
              />
            </th>
            <th>
              <input
                type="number"
                name="invoiced"
                value={searchInputs.codigo_postal}
                onChange={handleInputChange}
                placeholder="% IVA"
                className="half-size-font"
              />
            </th>
            <th>
              <input
                type="number"
                name="invoiced-nr"
                value={searchInputs.telefono}
                onChange={handleInputChange}
                placeholder="Total IVA"
                className="half-size-font"
              />
            </th>
            <th>
              <input
                type="number"
                name="bill-nr"
                value={searchInputs.email}
                onChange={handleInputChange}
                placeholder="Total factura"
                className="half-size-font"
              />
            </th>
            <th>
              <input
                type="text"
                name="check"
                value={searchInputs.provincia}
                onChange={handleInputChange}
                placeholder="Nro de pedido"
                className="half-size-font"
              />
            </th>
            <th>
              <input
                type="text"
                name="check"
                value={searchInputs.provincia}
                onChange={handleInputChange}
                placeholder="Pedido"
                className="half-size-font"
              />
            </th>
            <th>
              <input
                type="text"
                name="check"
                value={searchInputs.provincia}
                onChange={handleInputChange}
                placeholder="Albarán"
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
        {clientToDelete && (
          <p>
            ¿Seguro que quieres eliminar al cliente{" "}
            {clientToDelete.cif_cliente} {clientToDelete.nombre}?
          </p>
        )}
        {clientToEdit && (
          <p>
            ¿Seguro que quieres editar al cliente {clientToEdit.cif_cliente}{" "}
            {clientToEdit.nombre}?
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
      <Button variant="success" onClick={handleCreateClick}>
        Crear Nueva Factura
      </Button>
    </div>
  </div>
);
};

export default Invoices