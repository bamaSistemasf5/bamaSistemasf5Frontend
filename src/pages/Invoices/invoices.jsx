import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Invoices.css";
import { Table, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const InvoicesView = () => { const navigate = useNavigate(); 

const [invoices, setInvoices] = useState([]);
const [filteredInvoices, setFilteredInvoices] = useState([]);
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
const [invoiceToDelete, setInvoiceToDelete] = useState(null);
const [invoiceToEdit, setInvoiceToEdit] = useState(null);
//ver detalle
const [selectedInvoice, setSelectedInvoice] = useState(null);

const handleEditClick = (invoice) => {
  console.log("Factura seleccionada para editar:", invoice);
  navigate(`/update-invoice/${invoice.nro_factura}`, {
    state: { invoiceData: invoice },
  });
  setShowModal(true);
};

const handleDeleteClick = (invoice) => {
  setInvoiceToDelete(invoice);
  setShowModal(true);
};

//modal ver detalle
const handleDetailClick = (invoice) => {
  setSelectedInvoice(invoice);
  setShowModal(true);
};

// const handleCloseModal = () => {
//   setShowModal(false);
// };

const handleDownloadPDF = () => {
  // Aquí deberías implementar la lógica para descargar la factura en PDF
};
//hasta aquí ver detalle modal
const handleConfirmAction = () => {
  if (invoiceToDelete) {
    axios
      .delete(
        `http://localhost:3000/invoices-view/${invoiceToDelete.nro_factura}`
      )
      .then((response) => {
        const updatedInvoices = invoices.filter(
          (invoice) => invoice.nro_factura !== invoiceToDelete.nro_factura
        );
        setInvoices(updatedInvoices);
        setFilteredInvoices(updatedInvoices);
      })
      .catch((error) => {
        console.error("Error deleting Invoice:", error);
      });
  } else if (invoiceToEdit) {
    // Redirige a la página de edición con los detalles del factura
    navigate(`/update-invoice/${invoiceToEdit.nro_factura}`, {
      invoiceData: invoiceToEdit,
    });
  }
  setShowModal(false);
};

const handleCloseModal = () => {
  setShowModal(false);
  setInvoiceToDelete(null);
  setInvoiceToEdit(null);
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
                type="number"
                name="dn-number"
                value={searchInputs.nro_factura}
                onChange={handleInputChange}
                placeholder="Nro Factura"
                className="half-size-font"
              />
            </th>
            <th>
              <input
                type="number"
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
                value={searchInputs.cif_cliente}
                onChange={handleInputChange}
                placeholder="Cif cliente"
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
                name="total"
                value={searchInputs.base_imponible}
                onChange={handleInputChange}
                placeholder="Base imponible"
                className="half-size-font"
              />
            </th>
            <th>
              <input
                type="number"
                name="invoiced"
                value={searchInputs.porc_iva}
                onChange={handleInputChange}
                placeholder="% IVA"
                className="half-size-font"
              />
            </th>
            <th>
              <input
                type="number"
                name="invoiced-nr"
                value={searchInputs.importe_iva}
                onChange={handleInputChange}
                placeholder="Total IVA"
                className="half-size-font"
              />
            </th>
            <th>
              <input
                type="number"
                name="bill-nr"
                value={searchInputs.total_factura}
                onChange={handleInputChange}
                placeholder="Total factura"
                className="half-size-font"
              />
            </th>
            <th>
              <input
                type="number"
                name="check"
                value={searchInputs.nro_pedido}
                onChange={handleInputChange}
                placeholder="Número de pedido"
                className="half-size-font"
              />
            </th>
            <th>
              <input
                type="text"
                name="check"
                value={searchInputs.pedido}
                onChange={handleInputChange}
                placeholder="Pedido"
                className="half-size-font"
              />
            </th>
            <th>
              <input
                type="number"
                name="check"
                value={searchInputs.albaran}
                onChange={handleInputChange}
                placeholder="Albarán"
                className="half-size-font"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredInvoices.map((invoice) => (
            <tr key={invoice.nro_factura}>
              <td className="table-data">{invoice.nro_factura}</td>
              <td className="table-data">{invoice.fecha}</td>
              <td className="table-data">{invoice.direccion}</td>
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
                  variant="secondary"
                  onClick={() => handleDeleteClick(invoice)}
                >
                  Ver Detalle
                </Button>
                </td>
                <td>
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
            ¿Seguro que quieres eliminar la factura{" "}
            {invoiceToDelete.nro_factura} {invoiceToDelete.cliente}?
          </p>
        )}
        {invoiceToEdit && (
          <p>
            ¿Seguro que quieres editar la factura {invoiceToEdit.nro_factura}{" "}
            {invoiceToEdit.cliente}?
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

export default InvoicesView