import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DeliveryNotes.css";
import { Table, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const DeliveryNotes = () => {
  const navigate = useNavigate();

  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
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
        const response = await axios.get("http://localhost:3000/delivery-note/notes");
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

  const filterNotes = () => {
    const filteredData = clients.filter((client) =>
      Object.keys(searchInputs).every((key) =>
        client[key].toLowerCase().includes(searchInputs[key].toLowerCase())
      )
    );
    setFilteredClients(filteredData);
  };

  useEffect(() => {
    filterNotes();
  }, [searchInputs]);

  const [showModal, setShowModal] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [noteToEdit, setNoteToEdit] = useState(null);

  const handleEditClick = (note) => {
    console.log("Albaran seleccionado para editar:", note);
    navigate(`/update-delivery-note/${note.nro_albaran}`, {
      state: { noteData: note },
    });
    setShowModal(true);
  };

  const handleDeleteClick = (note) => {
    setNoteToDelete(note);
    setShowModal(true);
  };

  const handleConfirmAction = () => {
    if (noteToDelete) {
      axios
        .delete(
          `http://localhost:3000/delivey-note/notes/${noteToDelete.nro_albaran}`
        )
        .then((response) => {
          const updatedNotes = clients.filter(
            (note) => note.nro_albaran !== noteToDelete.nro_albaran
          );
          setClients(updatedNotes);
          setFilteredClients(updatedNotes);
        })
        .catch((error) => {
          console.error("Error deleting note:", error);
        });
    } else if (noteToEdit) {
      navigate(`/update-note/${noteToEdit.nro_albaran}`, {
        noteData: noteToEdit,
      });
    }
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNoteToDelete(null);
    setNoteToEdit(null);
  };

  const handleCreateClick = () => {
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
                  value={searchInputs.nro_albaran}
                  onChange={handleInputChange}
                  placeholder="Nro Albarán"
                  className="half-size-font"
                />
              </th>
              <th>
                <input
                  type="text"
                  name="date"
                  value={searchInputs.fecha}
                  onChange={handleInputChange}
                  placeholder="Fecha"
                  className="half-size-font"
                />
              </th>
              <th>
                <input
                  type="text"
                  name="client"
                  value={searchInputs.cliente}
                  onChange={handleInputChange}
                  placeholder="Cliente"
                  className="half-size-font"
                />
              </th>
              <th>
                <input
                  type="text"
                  name="cif-client"
                  value={searchInputs.cif_cliente}
                  onChange={handleInputChange}
                  placeholder="CIF cliente"
                  className="half-size-font"
                />
              </th>
              <th>
                <input
                  type="text"
                  name="check"
                  value={searchInputs.firmado}
                  onChange={handleInputChange}
                  placeholder="Firmado"
                  className="half-size-font"
                />
              </th>
              <th>
                <input
                  type="text"
                  name="total"
                  value={searchInputs.importe}
                  onChange={handleInputChange}
                  placeholder="Importe"
                  className="half-size-font"
                />
              </th>
              <th>
                <input
                  type="text"
                  name="invoiced"
                  value={searchInputs.facturado}
                  onChange={handleInputChange}
                  placeholder="Facturado"
                  className="half-size-font"
                />
              </th>
              <th>
                <input
                  type="text"
                  name="invoiced-nr"
                  value={searchInputs.pedido}
                  onChange={handleInputChange}
                  placeholder="Nro Pedido"
                  className="half-size-font"
                />
              </th>
              <th>
                <input
                  type="text"
                  name="bill-nr"
                  value={searchInputs.factura}
                  onChange={handleInputChange}
                  placeholder="Factura"
                  className="half-size-font"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((note) => (
              <tr key={note.nro_albaran}>
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
              {noteToDelete.nro_albaran} {noteToDelete.cliente}?
            </p>
          )}
          {noteToEdit && (
            <p>
              ¿Seguro que quieres editar el albaran {noteToEdit.nro_albaran}{" "}
              {noteToEdit.cliente}?
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
  