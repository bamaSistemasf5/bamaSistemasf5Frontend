import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Invoices.css";
import { Table, Button, Modal } from "react-bootstrap";

const Invoices = () => { 
const [invoices, setInvoices] = useState([]);
const [filteredInvoices, setFilteredInvoices] = useState([]);
const [searchInputs, setSearchInputs] = useState({
  nro_factura: "",
  fecha: "",
  invoice: "",
  cif_invoice: "",
  fecha_vencimiento: "",
  fecha_cobro: "",
  estado: "",
  // base_imponible: "",
  // porc_iva: "",
  iva_total: "",
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
//const [invoiceToDownload, setInvoiceToDownload] = useState(null);

//Para ver en detalle la fctura
const handleDownloadPDF = async () => {
  try {
    // Endpoint para generar y guardar el PDF
    await axios.post(`/invoices-view/${invoices}/download`);
    console.log("Descargando PDF...")
    // Lógica adicional después de descargar el PDF, como mostrar un mensaje de éxito
  } catch (error) {
    console.error('Error al generar y guardar el PDF:', error);
    // Manejo de errores, como mostrar un mensaje de error al usuario
  }
};
const handleCloseModal = () => setShowModal(false);

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
                name="cliente"
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
                name="fecha vencimiento"
                value={searchInputs.fecha_vencimiento}
                onChange={handleInputChange}
                placeholder="Fecha de vencimiento"
                className="half-size-font"
              />
            </th>
            <th>
              <input
                type="date"
                name="fecha cobro"
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
            {/* <th>
              <input
                type="number"
                name="base-imponible"
                value={searchInputs.base_imponible}
                onChange={handleInputChange}
                placeholder="Base imponible"
                className="half-size-font"
              />
            </th> */}
            {/* <th>
              <input
                type="number"
                name="porc-iva"
                value={searchInputs.porc_iva}
                onChange={handleInputChange}
                placeholder="% IVA"
                className="half-size-font"
              />
            </th> */}
            <th>
              <input
                type="number"
                name="iva_total"
                value={searchInputs.iva_total}
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
          {filteredInvoices.map((invoice) => (
            <tr key={invoice.cif_invoice}>
              <td className="table-data">{invoice.nro_factura}</td>
              <td className="table-data">{invoice.fecha}</td>
              <td className="table-data">{invoice.cliente}</td>
              <td className="table-data">{invoice.cif_cliente}</td>
              <td className="table-data">{invoice.fecha_vencimiento}</td>
              <td className="table-data">{invoice.fecha_cobro}</td>
              <td className="table-data">{invoice.estado}</td>
              {/* <td className="table-data">{invoice.base_imponible}</td> */}
              {/* <td className="table-data">{invoice.porc_iva}</td> */}
              <td className="table-data">{invoice.iva_total}</td>
              <td className="table-data">{invoice.total_factura}</td>
              <td className="table-data">{invoice.nro_pedido}</td>
              <td className="table-data">{invoice.pedido}</td>
              <td className="table-data">{invoice.albaran}</td>
              <td className="table-data">
                <Button
                  variant="secondary"
                  onClick={() => setShowModal(true)}>
                  Ver Detalle
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>DETALLE DE FACTURA</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          Contenido del detalle de la factura
        </Modal.Body>
      <Modal.Footer>
      <Button variant="primary" onClick={handleDownloadPDF}>
          Descargar PDF
        </Button>
        <Button variant="secondary" onClick={handleCloseModal}>
          Cancelar
        </Button> 
      </Modal.Footer>
    </Modal>

  </div>
);
};

export default Invoices;