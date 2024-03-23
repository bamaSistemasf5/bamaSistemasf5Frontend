import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OrdersView.css";
import { Table, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const OrdersView = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchInputs, setSearchInputs] = useState({
    cliente: "",
    fecha_pedido: "",
    cif_cliente: "",
    total: "",
    estado: "",
    albaranes: "",
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

  const filterOrders = () => {
    const filteredData = orders.filter((order) =>
      order.cliente.toLowerCase().includes(searchInputs.cliente.toLowerCase())
    );
    setFilteredOrders(filteredData);
  };

  useEffect(() => {
    filterOrders();
  }, [searchInputs]);

  const [showModal, setShowModal] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [orderToEdit, setOrderToEdit] = useState(null);

  const handleEditClick = (order) => {
    console.log("Order selected for editing:", order);
    navigate(`/order/update-order/${order.cif_cliente}`, {
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
        orderData: orderToEdit,
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
      <h1 className="text-center mb-4">Pedidos</h1>
      <div>
        <Table striped bordered responsive hover>
          <thead>
            <tr>
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
                <input
                  type="date"
                  name="fecha_pedido"
                  value={searchInputs.fecha_pedido}
                  onChange={handleInputChange}
                  placeholder="Fecha pedido"
                  className="large-font"
                />
              </th>
              <th>
                <input
                  type="text"
                  name="cif_cliente"
                  value={searchInputs.cif_cliente}
                  onChange={handleInputChange}
                  placeholder="CIF Cliente"
                  className="large-font"
                />
              </th>
              <th>
                <input
                  type="text"
                  name="total"
                  value={searchInputs.total}
                  onChange={handleInputChange}
                  placeholder="Total"
                  className="large-font"
                />
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
                <input
                  type="text"
                  name="albaranes"
                  value={searchInputs.albaranes}
                  onChange={handleInputChange}
                  placeholder="Albaranes"
                  className="large-font"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id_pedido}>
                <td className="table-data cliente">{order.cliente}</td>
                <td className="table-data fpedido">{order.fecha_pedido}</td>
                <td className="table-data cif">{order.cif_cliente}</td>
                <td className="table-data total">{order.total}</td>
                <td className="table-data estado">{order.estado}</td>
                <td className="table-data albaranes">{order.albaranes}</td>
                <td className="table-data edit">
                  <Button
                    variant="warning"
                    onClick={() => handleEditClick(order)}
                    className="edit-order"
                  >
                    🖋️
                  </Button>
                </td>
                <td className="table-data delete">
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteClick(order)}
                    className=""
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
          {orderToDelete && (
            <p>
              ¿Seguro que quieres eliminar el pedido{" "}
              {orderToDelete.nro_pedido} {orderToDelete.cliente}?
            </p>
          )}
          {orderToEdit && (
            <p>
              ¿Seguro que quieres editar el pedido {orderToEdit.id_pedido}{" "}
              {orderToEdit.cliente}?
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
        <Button variant="success" onClick={handleCreateOrderClick}>
          Crear Nuevo Pedido
        </Button>
      </div>
    </div>
  );
};

export default OrdersView;


