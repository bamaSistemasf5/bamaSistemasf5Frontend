import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OrdersView.css";
import { Table, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';
import { FaDownload } from 'react-icons/fa';
import jsPDF from "jspdf";


const OrdersView = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchInputs, setSearchInputs] = useState({
    id_pedido: "",
    fecha_pedido: null, // Cambiado a null para el DatePicker
    cliente: "",
    cif_cliente: "",
    total: "",
    estado: "",
    albaranes: "",
  });

  const [sortBy, setSortBy] = useState({
    column: "fecha_pedido",
    ascending: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/order/orders");
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
      fecha_pedido: date,
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
      order.cliente.toLowerCase().includes(searchInputs.cliente.toLowerCase())
    );

    if (searchInputs.fecha_pedido) {
      const year = format(new Date(searchInputs.fecha_pedido), 'yyyy');
      const month = format(new Date(searchInputs.fecha_pedido), 'MM');
      const day = format(new Date(searchInputs.fecha_pedido), 'dd');

      filteredData = filteredData.filter((order) => {
        const orderYear = format(new Date(order.fecha_pedido), 'yyyy');
        const orderMonth = format(new Date(order.fecha_pedido), 'MM');
        const orderDay = format(new Date(order.fecha_pedido), 'dd');

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
    console.log("Order selected for editing:", order);
    navigate(`/order/update-order/${order.id_pedido}`, {
      state: { orderData: order },
    });
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
      <h1 className="text-center mb-4 pedidos">Pedidos</h1>
      <div>
        <Table striped bordered responsive hover>
          <thead>
            <tr>
            <th>
                <span className="large-font">Nº Pedido</span>
              </th>
              <th onClick={() => handleSortClick("fecha_pedido")}>
  <DatePicker
    selected={searchInputs.fecha_pedido}
    onChange={handleDateChange}
    placeholderText="Seleccionar fecha"
    dateFormat="yyyy-MM-dd"
  />
</th>


              <th>
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
                <span className="large-font">CIF Cliente</span>
              </th>
              <th onClick={() => handleSortClick("fecha_pedido")}>
  <span
    onClick={() => handleSortClick("fecha_pedido")}
    style={{ cursor: 'pointer' }}
  >
    Total
    {sortBy.column === "fecha_pedido" && (
      <span>{sortBy.ascending ? "↓" : "↑"}</span>
    )}
  </span>
</th>

              <th>
                <input
                  type="text"
                  name="estado"
                  value={searchInputs.estado}
                  onChange={handleInputChange}
                  placeholder="Estado"
                  className="large-font"
                />
              </th>
              <th>
                <span className="large-font">Albaranes</span>
              </th>
              
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id_pedido}>
                <td className="table-data npedido">{order.id_pedido}</td>
                <td className="table-data fpedido">{order.fecha_pedido}</td>
                <td className="table-data client-order">{order.cliente}</td>
                <td className="table-data cif-order">{order.cif_cliente}</td>
                <td className="table-data total-order">{order.total}</td>
                <td className="table-data estado-order">{order.estado}</td>
                <td className="table-data albaranes">{order.albaranes}</td>
                <td className="table-data edit">
                <Button
        variant="warning"
        onClick={() => handleEditClick(order)} // Llama a handleEditClick al hacer clic en editar
        className="edit-order"
      >
        🖋️
      </Button>
                </td>
                <td className="table-data descarga"><Button
                variant="success"
                onClick={() => handleDownloadPDF(order)} >
                  <FaDownload /> Descargar PDF</Button>
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
          <Button variant="primary" onClick={handleCloseModal}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="text-center ">
        <Button variant="success" onClick={handleCreateOrderClick}>
          Crear Nuevo Pedido
        </Button>
      </div>
    </div>
  );
};

export default OrdersView;
