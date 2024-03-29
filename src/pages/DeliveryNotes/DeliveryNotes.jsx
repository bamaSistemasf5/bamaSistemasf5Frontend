import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DeliveryNotes.css";
import { Table, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';
import { FaDownload } from 'react-icons/fa';
import jsPDF from "jspdf";

const DeliveryNotes = () => {
  const navigate = useNavigate(); // Declara la constante navigate

  const [deliveries, setDeliveries] = useState([]);
  const [filteredDeliveries, setFilteredDeliveries] = useState([]);
  const [searchInputs, setSearchInputs] = useState({
    no_albaran: "",
    fecha_albaran: null, 
    cliente: "",
    cif_cliente: "",
    importe: "",
    facturado_o_no_facturado: "",
    pedido: "",
    producto: "",
    firmado: "",
  });

  const [sortBy, setSortBy] = useState({
    column: "no_albaran",
    ascending: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/delivery-note/notes");
        setDeliveries(response.data);
        setFilteredDeliveries(response.data);
      } catch (error) {
        console.error("Error fetching orders data:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setSearchInputs((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? e.target.checked : value,
    }));
  };
  

  const handleDownloadPDF = (delivery) => {
    try {
      if (delivery) {
        const pdf = new jsPDF();
        // Definir la posición inicial del texto
        let yPos = 10;
        // Agregar cada elemento de texto con una posición Y incrementada
        pdf.text(`No_Albarán: ${delivery.no_albaran}`, 10, yPos);
        yPos += 10; // Incrementar la posición Y
        pdf.text(`Fecha Albaran: ${delivery.fecha_albaran}`, 10, yPos);
        yPos += 10; // Incrementar la posición Y
        pdf.text(`Cliente: ${delivery.cliente}`, 10, yPos);
        yPos += 10; // Incrementar la posición Y
        pdf.text(`CIF Cliente: ${delivery.cif_cliente}`, 10, yPos);
        yPos += 10; // Incrementar la posición Y
        pdf.text(`Importe: ${delivery.importe}`, 10, yPos);
        yPos += 10; // Incrementar la posición Y
        pdf.text(`Facturado o no facturado: ${delivery.facturado_o_no_facturado}`, 10, yPos);
        yPos += 10; // Incrementar la posición Y
        pdf.text(`Pedido: ${delivery.pedido}`, 10, yPos);
        yPos += 10; // Incrementar la posición Y
        pdf.text(`Firmado: ${delivery.firmado}`, 10, yPos);
        yPos += 10; // Incrementar la posición Y
        // ...
        pdf.save("albaran.pdf"); // Guarda el PDF con el nombre "albaran.pdf"
      }
    } catch (error) {
      console.error('Error al generar el PDF:', error);
    }
  };


  const handleDateChange = (date) => {
    setSearchInputs((prevState) => ({
      ...prevState,
      fecha_albaran: date,
    }));
  };

  const handleSortClick = (column) => {
    setSortBy({
      column: column,
      ascending: sortBy.column === column ? !sortBy.ascending : true,
    });
  };

  useEffect(() => {
    filterDeliveries();
  }, [searchInputs, sortBy]);

  function filterDeliveries() {
    let filteredData = deliveries.filter((delivery) =>
      delivery.cliente.toLowerCase().includes(searchInputs.cliente.toLowerCase())
    );

    if (searchInputs.fecha_albaran) {
      const year = format(new Date(searchInputs.fecha_albaran), 'yyyy');
      const month = format(new Date(searchInputs.fecha_albaran), 'MM');
      const day = format(new Date(searchInputs.fecha_albaran), 'dd');

      filteredData = filteredData.filter((delivery) => {
        const deliveryYear = format(new Date(delivery.fecha_albaran), 'yyyy');
        const deliveryMonth = format(new Date(delivery.fecha_albaran), 'MM');
        const deliveryDay = format(new Date(delivery.fecha_albaran), 'dd');

        return (
          deliveryYear === year &&
          deliveryMonth === month &&
          deliveryDay === day
        );
      });
    }

    filteredData.sort((a, b) => {
      const dateA = new Date(a[sortBy.column]);
      const dateB = new Date(b[sortBy.column]);
      if (sortBy.ascending) {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });
    filteredData = filteredData.filter((delivery) => {
      const searchValues = Object.values(searchInputs).filter(Boolean);
      const deliveryValues = Object.values(delivery).map(val => {
        if (typeof val === 'string') {
          return val.toLowerCase();
        } else {
          return val.toString().toLowerCase();
        }
      });
    
      return searchValues.every(val =>
        deliveryValues.some(deliveryVal => deliveryVal.includes(val.toLowerCase()))
      );
    });
    


    setFilteredDeliveries(filteredData);
  }

  const [showModal, setShowModal] = useState(false);
  const [deliveryToDelete, setDeliveryToDelete] = useState(null);
  const [deliveryToEdit, setDeliveryToEdit] = useState(null);

  const handleEditClick = (delivery) => {
    setDeliveryToEdit(delivery);
    setShowModal(true);
  };

  const handleDeleteClick = (delivery) => {
    setDeliveryToDelete(delivery);
    setShowModal(true);
  };

  const handleConfirmAction = () => {
    if (deliveryToDelete) {
      axios
        .delete(
          `http://localhost:3000/delete-note/:id/${deliveryToDelete.albaran}`
        )
       
        .then((response) => {
          const updatedDeliveries = deliveries.filter(
            (delivery) => delivery.cif_cliente !== deliveryToDelete.cif_cliente
         
            );
            setDeliveries(updatedDeliveries);
            setFilteredDeliveries(updatedDeliveries);
          })
          .catch((error) => {
            console.error("Error deleting delivery:", error);
          });
      } else if (deliveryToEdit) {
        navigate(`/update-note/${deliveryToEdit.cif_cliente}`, {
          state: { deliveryData: deliveryToEdit },
        });
      }
      
      setShowModal(false);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
      setDeliveryToDelete(null);
      setDeliveryToEdit(null);
    };
  
   

  
    const handleCreateDeliveryNoteClick = () => {
      navigate("/create-note"); // Redirige a la página de creación de albarán
    };
  
    return (
      <div>
        <h1 className="text-center mb-4 pedidos">Albaranes</h1>
        <div>
          <Table striped bordered responsive hover>
            <thead>
              <tr>
                <th onClick={() => handleSortClick("no_albaran")}>
                  <span
                    onClick={() => handleSortClick("no_albaran")}
                    style={{ cursor: 'pointer' }}
                    >
                    Nº Albarán
                    {sortBy.column === "no_albaran" && (
                      <span>{sortBy.ascending ? "↓" : "↑"}</span>
                    )}
                  </span>
                </th>
                <th>
                  <span className="large-font"></span>
                  <DatePicker 
                    selected={searchInputs["fecha_albaran"]}
                    onChange={handleDateChange}
                    placeholderText="Seleccionar fecha"
                    dateFormat="yyyy-MM-dd"
                  />
                </th>
                <th>
                  <span className="large-font"></span>
                  <input
                    type="text"
                    name="cliente"
                    value={searchInputs.cliente}
                    onChange={handleInputChange}
                    placeholder="Cliente"
                    className="large-font"
                  />
                </th>
                <th>
                  <span className="large-font"></span>
                  <input
                    type="text"
                    name="cif_cliente"
                    value={searchInputs.cif_cliente}
                    onChange={handleInputChange}
                    placeholder="CIF Cliente"
                    className="large-font"
                  />
                </th>
                <th><input
                    type="text"
                    name="firmado"
                    value={searchInputs.firmado}
                    onChange={handleInputChange}
                    placeholder="Firmado"
                    className="large-font"
                  /></th>
                <th onClick={() => handleSortClick("importe")}>
                  <span
                    onClick={() => handleSortClick("importe")}
                    style={{ cursor: 'pointer' }}
                  >
                    Importe
                    {sortBy.column === "importe" && (
                      <span>{sortBy.ascending ? "↓" : "↑"}</span>
                    )}
                  </span>
                </th>
                <th><input
                    type="text"
                    name="facturado_o_no_facturado"
                    value={searchInputs.facturado_o_no_facturado}
                    onChange={handleInputChange}
                    placeholder="Fcturado o no facturado"
                    className="large-font"
                  /></th>
                <th className="table-header">Pedido</th>
                <th className="table-header">Editar</th>
                <th className="table-header">Descargar PDF</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(filteredDeliveries) && filteredDeliveries.map((delivery_notes) => (
                <tr key={delivery_notes.albaran}>
                  <td className="table-data npedido">{delivery_notes.no_albaran}</td>
                  <td className="table-data fecha-delivery">{delivery_notes.fecha_albaran}</td>
                  <td className="table-data cliente-delivery">{delivery_notes.cliente}</td>
                  <td className="table-data cif-delivery">{delivery_notes.cif_cliente}</td>
                  <td className="table-data firmado-delivery">{delivery_notes.firmado === 1 ? 'Sí' : 'No'}</td>
                  <td className="table-data importe-delivery">{delivery_notes.importe}</td>
                  <td className="table-data facturado-delivery">{delivery_notes.facturado_o_no_facturado}</td>
                  <td className="table-data pedido-delivery">{delivery_notes.pedido}</td>
                  <td className="table-data edit">
                    <Button
                      variant="warning"
                      onClick={() => handleEditClick(delivery_notes)}
                      className="edit-order"
                    >
                      🖋️
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="success"
                      onClick={() => handleDownloadPDF(delivery_notes)}
                    >
                      <FaDownload /> Descargar PDF
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
            {deliveryToEdit && (
              <p>¿Seguro que quieres editar el pedido {deliveryToEdit.albaran} {deliveryToEdit.cliente}?</p>
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
          <Button variant="success" onClick={handleCreateDeliveryNoteClick}>
            Crear Nuevo Albarán
          </Button>
        </div>
      </div>
    );
  };
  
  export default DeliveryNotes;
  
