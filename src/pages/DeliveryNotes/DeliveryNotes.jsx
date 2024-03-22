import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DeliveryNotes.css";
import { Table, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Importa useNavigate (mejor que usenavigate) para manejar la redirección

const DeliveryNotes = () => { const navigate = useNavigate(); // Inicializa useNavigate

  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredNotes] = useState([]);
  const [searchInputs, setSearchInputs] = useState({
    nro_albaran: "",
    fecha: "",
    cliente: "",
    cif_cliente: "",
    firmado: "",
    importe: "",
    facturado: "",
    pedido: "",
    factura: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/clients-view");
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
    console.log("Albaran seleccionado para editar:", client);
    navigate(`/update-delivery-note/${note.nro_albaran}`, {
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
          `http://localhost:3000/clients-view/${noteToDelete.nro_albaran}`
        )
        .then((response) => {
          const updateNote = note.filter(
            (note) => note.nro_albaran !== noteToDelete.nro_albaran
          ); setNote(updateNote);

          setFilteredNotes(updateNote);
        })
        .catch((error) => {
          console.error("Error deleting note:", error);
        });
    } else if (noteToEdit) {
      // Redirige a la página de edición con los detalles del cliente
      navigate(`/update-note/${noteToEdit.nro_albaran}`, {
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

const handleCreateDNClick = () => {
  navigate("/create-delivery-note");
};

  return (
    <div>
      <h1 className="text-center mb-4">Albaranes</h1>
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
                  placeholder="Nro Albarán"
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
                  type="text"
                  name="check"
                  value={searchInputs.provincia}
                  onChange={handleInputChange}
                  placeholder="Firmado"
                  className="half-size-font"
                />
              </th>
              <th>
                <input
                  type="text"
                  name="total"
                  value={searchInputs.pais}
                  onChange={handleInputChange}
                  placeholder="Importe"
                  className="half-size-font"
                />
              </th>
              <th>
                <input
                  type="text"
                  name="invoiced"
                  value={searchInputs.codigo_postal}
                  onChange={handleInputChange}
                  placeholder="Facturado"
                  className="half-size-font"
                />
              </th>
              <th>
                <input
                  type="text"
                  name="invoiced-nr"
                  value={searchInputs.telefono}
                  onChange={handleInputChange}
                  placeholder="Nro Pedido"
                  className="half-size-font"
                />
              </th>
              <th>
                <input
                  type="text"
                  name="bill-nr"
                  value={searchInputs.email}
                  onChange={handleInputChange}
                  placeholder="Factura"
                  className="half-size-font"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((client) => (
              <tr key={client.cif_cliente}>
                <td className="table-data">{note.nro_albaran}</td>
                <td className="table-data">{note.fecha}</td>
                <td className="table-data">{note.cliente}</td>
                <td className="table-data">{note.cif_cliente}</td>
                <td className="table-data">{note.firmado}</td>
                <td className="table-data">{note.importe}</td>
                <td className="table-data">{note.facturado}</td>
                <td className="table-data">{note.pedido}</td>
                <td className="table-data">{note.factura}</td>
                <td className="table-data">
                  <Button
                    variant="warning"
                    onClick={() => handleEditClick(note)}
                  >
                    🖋️
                  </Button>
                </td>
                <td className="table-data">
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteClick(note)}
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
          {noteToDelete && (
            <p>
              ¿Seguro que quieres eliminar el albaran{" "}
              {noteToDelete.cif_cliente} {noteToDelete.nombre}?
            </p>
          )}
          {noteToEdit && (
            <p>
              ¿Seguro que quieres editar al albaran {noteToEdit.cif_cliente}{" "}
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
        <Button variant="success" onClick={handleCreateClick}>
          Crear Nuevo Albaran
        </Button>
      </div>
    </div>
  );
};

export default DeliveryNotes