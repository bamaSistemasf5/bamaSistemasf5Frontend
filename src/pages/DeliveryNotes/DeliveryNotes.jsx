import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DeliveryNotes.css";
import { Table, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';
import { FaDownload } from 'react-icons/fa';
import jsPDF from "jspdf";

const DeliveryNotes = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchInputs, setSearchInputs] = useState({
    "No albarán": "",
    "Fecha albarán": null, 
    Cliente: "",
    "CIF cliente": "",
    Importe: "",
    "Facturado o no facturado": "",
    Pedido: "",
    Producto: "",
    Firmado: "",
  });

  const [sortBy, setSortBy] = useState({
    column: "Fecha albarán",
    ascending: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5173/delivery-note/notes");
        setOrders(response.data);
        setFilteredOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders data:", error);
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

  const handleDownloadPDF = (order) => {
    try {
      if (order) {
        const pdf = new jsPDF();
        // Definir la posición inicial del texto
        let yPos = 10;
        // Agregar cada elemento de texto con una posición Y incrementada
        pdf.text(`Número de pedido: ${order.id_pedido}`, 10, yPos);
        yPos += 10; // Incrementar la posición Y
        pdf.text(`Fecha Pedido: ${order.fecha_pedido}`, 10, yPos);
        yPos += 10; // Incrementar la posición Y
        pdf.text(`Cliente: ${order.cliente}`, 10, yPos);
        yPos += 10; // Incrementar la posición Y
        pdf.text(`CIF Cliente: ${order.cif_cliente}`, 10, yPos);
        yPos += 10; // Incrementar la posición Y
        pdf.text(`Total: ${order.total}`, 10, yPos);
        yPos += 10; // Incrementar la posición Y
        pdf.text(`Estado: ${order.estado}`, 10, yPos);
        yPos += 10; // Incrementar la posición Y
        pdf.text(`Albaranes: ${order.albaranes}`, 10, yPos);
        yPos += 10; // Incrementar la posición Y
        // ...
        pdf.save("pedido.pdf"); // Guarda el PDF con el nombre "pedido.pdf"
      }
    } catch (error) {
      console.error('Error al generar el PDF:', error);
    }
  };

  const handleDateChange = (date) => {
    setSearchInputs((prevState) => ({
      ...prevState,
      "Fecha albarán": date,
    }));
  };

  const handleSortClick = (column) => {
    setSortBy({
      column: column,
      ascending: sortBy.column === column ? !sortBy.ascending : true,
    });
  };

  useEffect(() => {
    filterOrders();
  }, [searchInputs, sortBy]);

  const filterOrders = () => {
    let filteredData = orders.filter((order) =>
      order.cliente.toLowerCase().includes(searchInputs.Cliente.toLowerCase())
    );

    if (searchInputs["Fecha albarán"]) {
      const year = format(new Date(searchInputs["Fecha albarán"]), 'yyyy');
      const month = format(new Date(searchInputs["Fecha albarán"]), 'MM');
      const day = format(new Date(searchInputs["Fecha albarán"]), 'dd');

      filteredData = filteredData.filter((order) => {
        const orderYear = format(new Date(order["Fecha albarán"]), 'yyyy');
        const orderMonth = format(new Date(order["Fecha albarán"]), 'MM');
        const orderDay = format(new Date(order["Fecha albarán"]), 'dd');

        return (
          orderYear === year &&
          orderMonth === month &&
          orderDay === day
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

    setFilteredOrders(filteredData);
  };

  const [showModal, setShowModal] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [orderToEdit, setOrderToEdit] = useState(null);

  const handleEditClick = (order) => {
    setOrderToEdit(order);
    setShowModal(true);
  };

  const handleDeleteClick = (order) => {
    setOrderToDelete(order);
    setShowModal(true);
  };

  const handleConfirmAction = () => {
    if (orderToDelete) {
      axios
        .delete(
          `http://localhost:3000/order/delete-order/${orderToDelete.id_pedido}`
        )
        .then((response) => {
          const updatedOrders = orders.filter(
            (order) => order.cif_cliente !== orderToDelete.cif_cliente
          );
          setOrders(updatedOrders);
          setFilteredOrders(updatedOrders);
        })
        .catch((error) => {
          console.error("Error deleting order:", error);
        });
    } else if (orderToEdit) {
      navigate(`/update-order/${orderToEdit.cif_cliente}`, {
        state: { orderData: orderToEdit },
      });
    }
    
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setOrderToDelete(null);
    setOrderToEdit(null);
  };

  const handleCreateOrderClick = () => {
    navigate("/create-order");
  };

  return (
    <div>
      <h1 className="text-center mb-4 pedidos">Albaranes</h1>
      <div>
        <Table striped bordered responsive hover>
          <thead>
            <tr>
            <th onClick={() => handleSortClick("Total")}>
                <span
                  onClick={() => handleSortClick("Total")}
                  style={{ cursor: 'pointer' }}
                >
                  Nº Albarán
                  {sortBy.column === "Albarán" && (
                    <span>{sortBy.ascending ? "↓" : "↑"}</span>
                  )}
                </span>
              </th>
              <th><span className="large-font">Nº Albarán</span></th>
              <th onClick={() => handleSortClick("Fecha albarán")}>
                <DatePicker
                  selected={searchInputs["Fecha albarán"]}
                  onChange={handleDateChange}
                  placeholderText="Seleccionar fecha"
                  dateFormat="yyyy-MM-dd"
                />
              </th>
              <th><span className="large-font">CIF Cliente</span></th>
              <th onClick={() => handleSortClick("Total")}>
                <span
                  onClick={() => handleSortClick("Total")}
                  style={{ cursor: 'pointer' }}
                >
                  Total
                  {sortBy.column === "Total" && (
                    <span>{sortBy.ascending ? "↓" : "↑"}</span>
                  )}
                </span>
              </th>
              <th><input
                type="text"
                name="estado"
                value={searchInputs.estado}
                onChange={handleInputChange}
                placeholder="Estado"
                className="large-font"
              /></th>
              <th><span className="large-font">Albaranes</span></th>
              <th className="table-header">Editar</th>
              <th className="table-header">Descargar PDF</th>
            </tr>
          </thead>
          <tbody>
          {Array.isArray(filteredOrders) && filteredOrders.map((delivery_notes) => (
  <tr key={delivery_notes["no albarán"]}>
    <td className="table-data npedido">{delivery_notes["no albarán"]}</td>
    <td className="table-data fpedido">{delivery_notes["fecha albarán"]}</td>
    <td className="table-data client-delivery">{delivery_notes.cliente}</td>
    <td className="table-data cif-delivery">{delivery_notes["cif cliente"]}</td>
    <td className="table-data total-delivery">{delivery_notes.importe}</td>
    <td className="table-data estado-delivery">{delivery_notes["facturado o no facturado"]}</td>
    <td className="table-data albaranes">{delivery_notes.pedido}</td>
    <td className="table-data albaranes">{delivery_notes.producto}</td>
    <td className="table-data albaranes">{delivery_notes.firmado}</td>
    <td className="table-data edit">
      <Button
        variant="warning"
        onClick={() => handleEditClick(delivery_notes)}
        className="edit-order"
      >
        🖋️
      </Button>
    </td>
    <td className="table-data descarga">
      <Button
        variant="success"
        onClick={() => handleDownloadPDF(order)}
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
          {orderToEdit && (
            <p>¿Seguro que quieres editar el pedido {orderToEdit.id_pedido} {orderToEdit.cliente}?</p>
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
        <Button variant="success" onClick={handleCreateOrderClick}>
          Crear Nuevo Pedido
        </Button>
      </div>
    </div>
  );
};

export default DeliveryNotes;
