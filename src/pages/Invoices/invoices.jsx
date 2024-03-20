import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Invoices.css";
import { Table, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Importa useNavigate (mejor que usenavigate) para manejar la redirección

const Invoices = () => { const navigate = useNavigate(); // Inicializa useNavigate

const [invoices, setInvoices] = useState([]);
const [filteredinvoices, setFilteredInvoices] = useState([]);
const [searchInputs, setSearchInputs] = useState({
  nro_factura: "",
  fecha: "",
  invoicee: "",
  cif_invoicee: "",
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
      const response = await axios.get("http://localhost:3000/invoices-view");
      setInvoices(response.data);
      setFilteredInvoices(response.data);
    } catch (error) {
      console.error("Error fetching invoices data:", error);
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

const filterInvoices = () => {
  const filteredData = invoices.filter((invoice) =>
    Object.keys(searchInputs).every((key) =>
      invoice[key].toLowerCase().includes(searchInputs[key].toLowerCase())
    )
  );
  setFilteredInvoices(filteredData);
};

useEffect(() => {
  filterInvoices();
}, [searchInputs]);

const [showModal, setShowModal] = useState(false);
const [invoiceToDelete, setinvoiceToDelete] = useState(null);
const [invoiceToEdit, setinvoiceToEdit] = useState(null);

const handleEditClick = (invoice) => {
  console.log("invoice seleccionado para editar:", invoice);
  navigate(`/update-invoice/${invoice.cif_invoice}`, {
    state: { invoiceData: invoice },
  });
  setShowModal(true);
};

const handleDeleteClick = (invoice) => {
  setinvoiceToDelete(invoice);
  setShowModal(true);
};

const handleConfirmAction = () => {
  if (invoiceToDelete) {
    axios
      .delete(
        `http://localhost:3000/invoices-view/${invoiceToDelete.cif_invoice}`
      )
      .then((response) => {
        const updatedinvoices = invoices.filter(
          (invoice) => invoice.cif_invoice !== invoiceToDelete.cif_invoice
        );
        setInvoices(updatedinvoices);
        setFilteredInvoices(updatedinvoices);
      })
      .catch((error) => {
        console.error("Error deleting invoice:", error);
      });
  } else if (invoiceToEdit) {
    // Redirige a la página de edición con los detalles del invoicee
    navigate(`/update-invoice/${invoiceToEdit.cif_invoice}`, {
      invoiceData: invoiceToEdit,
    });
  }
  setShowModal(false);
};

const handleCloseModal = () => {
  setShowModal(false);
  setinvoiceToDelete(null);
  setinvoiceToEdit(null);
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
                value={searchInputs.nro_factura}
                onChange={handleInputChange}
                placeholder="Nro Factura"
                className="half-size-font"
              />
            </th>
            <th>
              <input
                type="date"
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
                name="invoice"
                value={searchInputs.cliente}
                onChange={handleInputChange}
                placeholder="Cliente"
                className="half-size-font"
              />
            </th>
            <th>
              <input
                type="text"
                name="cif-cliente"
                value={searchInputs.cif_cliente}
                onChange={handleInputChange}
                placeholder="Cif Cliente"
                className="half-size-font"
              />
            </th>
            <th>
              <input
                type="date"
                name="check"
                value={searchInputs.fecha_vencimiento}
                onChange={handleInputChange}
                placeholder="Fecha de vencimiento"
                className="half-size-font"
              />
            </th>
            <th>
              <input
                type="date"
                name="check"
                value={searchInputs.fecha_cobro}
                onChange={handleInputChange}
                placeholder="Fecha de cobro"
                className="half-size-font"
              />
            </th>
            <th>
              <input
                type="text"
                name="check"
                value={searchInputs.estado}
                onChange={handleInputChange}
                placeholder="Estado"
                className="half-size-font"
              />
            </th>
            <th>
              <input
                type="number"
                name="base-imponible"
                value={searchInputs.base_imponible}
                onChange={handleInputChange}
                placeholder="Base imponible"
                className="half-size-font"
              />
            </th>
            <th>
              <input
                type="number"
                name="porc-iva"
                value={searchInputs.porc_iva}
                onChange={handleInputChange}
                placeholder="% IVA"
                className="half-size-font"
              />
            </th>
            <th>
              <input
                type="number"
                name="importe-iva"
                value={searchInputs.importe_iva}
                onChange={handleInputChange}
                placeholder="Total IVA"
                className="half-size-font"
              />
            </th>
            <th>
              <input
                type="number"
                name="total-factura"
                value={searchInputs.total_factura}
                onChange={handleInputChange}
                placeholder="Total factura"
                className="half-size-font"
              />
            </th>
            <th>
              <input
                type="text"
                name="nro-pedido"
                value={searchInputs.nro_pedido}
                onChange={handleInputChange}
                placeholder="Nro de pedido"
                className="half-size-font"
              />
            </th>
            <th>
              <input
                type="text"
                name="pedido"
                value={searchInputs.pedido}
                onChange={handleInputChange}
                placeholder="Pedido"
                className="half-size-font"
              />
            </th>
            <th>
              <input
                type="text"
                name="albaran"
                value={searchInputs.albaran}
                onChange={handleInputChange}
                placeholder="Albarán"
                className="half-size-font"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredinvoices.map((invoice) => (
            <tr key={invoice.cif_invoicee}>
              <td className="table-data">{invoice.nro_factura}</td>
              <td className="table-data">{invoice.fecha}</td>
              <td className="table-data">{invoice.cliente}</td>
              <td className="table-data">{invoice.cif_cliente}</td>
              <td className="table-data">{invoice.fecha_vencimiento}</td>
              <td className="table-data">{invoice.fecha_cobro}</td>
              <td className="table-data">{invoice.estado}</td>
              <td className="table-data">{invoice.base_imponible}</td>
              <td className="table-data">{invoice.porc_iva}</td>
              <td className="table-data">{invoice.importe_iva}</td>
              <td className="table-data">{invoice.total_factura}</td>
              <td className="table-data">{invoice.nro_pedido}</td>
              <td className="table-data">{invoice.pedido}</td>
              <td className="table-data">{invoice.albaran}</td>
              <td className="table-data">
                <Button
                  variant="warning"
                  onClick={() => handleEditClick(invoice)}
                >
                  🖋️
                </Button>
              </td>
              <td className="table-data">
                <Button
                  variant="danger"
                  onClick={() => handleDeleteClick(invoice)}
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
        {invoiceToDelete && (
          <p>
            ¿Seguro que quieres eliminar al invoice{" "}
            {invoiceToDelete.cif_invoice} {invoiceToDelete.nombre}?
          </p>
        )}
        {invoiceToEdit && (
          <p>
            ¿Seguro que quieres editar al invoice {invoiceToEdit.cif_invoice}{" "}
            {invoiceToEdit.nombre}?
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