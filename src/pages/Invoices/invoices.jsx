import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Invoices.css";
import { Table, Button, Modal } from "react-bootstrap";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import jsPDF from "jspdf";
import { format } from 'date-fns';

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [searchInputs, setSearchInputs] = useState({
    nro_factura: "",
    fecha: null,
    cliente: "",
    cif_cliente: "",
    fecha_vencimiento: null,
    estado: "",
    base_imponible: "",
    porcentaje_iva: "",
    iva_total: "",
    total_factura: "",
    pedido: "",
    albaran: ""
  });

  const [sortBy, setSortBy] = useState({
    column: "total_factura", // Columna inicial para ordenar
    ascending: true,
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

  const handleSortClick = (column) => {
    setSortBy(prevState => ({
      column: column,
      ascending: sortBy.column === column ? !sortBy.ascending : true,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchInputs(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  const handleDateChange = (date, name) => {
    setSearchInputs(prevState => ({
      ...prevState,
      [name]: date,
    }));
  };

  const filterInvoices = () => {
    let filteredData = invoices.filter((invoice) => {
      const matchesCliente = invoice.cliente.toLowerCase().includes(searchInputs.cliente.toLowerCase());
      const matchesCifCliente = invoice.cif_cliente.toLowerCase().includes(searchInputs.cif_cliente.toLowerCase());
      const matchesFecha = !searchInputs.fecha || format(new Date(invoice.fecha), 'yyyy-MM-dd') === format(new Date(searchInputs.fecha), 'yyyy-MM-dd');
      const matchesFechaVencimiento = !searchInputs.fecha_vencimiento || format(new Date(invoice.fecha_vencimiento), 'yyyy-MM-dd') === format(new Date(searchInputs.fecha_vencimiento), 'yyyy-MM-dd');
      return matchesCliente && matchesCifCliente && matchesFecha && matchesFechaVencimiento;
    });

    filteredData.sort((a, b) => {
      if (sortBy.column === "albaran") {
        return sortBy.ascending ? a.albaran.localeCompare(b.albaran) : b.albaran.localeCompare(a.albaran);
      } else {
        return sortBy.ascending ? a[sortBy.column] - b[sortBy.column] : b[sortBy.column] - a[sortBy.column];
      }
    });

    setFilteredInvoices(filteredData);
  };

  useEffect(() => {
    filterInvoices();
  }, [searchInputs, sortBy]);

  const [showModal, setShowModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const handleShowModal = (invoice) => {
    setSelectedInvoice(invoice);
    setShowModal(true);
  };
  
  const handleCloseModal = () => setShowModal(false);

  const handleDownloadPDF = async (invoice) => {
    try {
      if (invoice) {
        const pdf = new jsPDF();
        let yPos = 10;
        const lineHeight = 10;
        pdf.text(`Número de factura: ${invoice.nro_factura}`, 10, yPos);
        yPos += lineHeight;
        pdf.text(`Fecha: ${invoice.fecha}`, 10, yPos);
        yPos += lineHeight;
        pdf.text(`Cliente: ${invoice.cliente}`, 10, yPos);
        yPos += lineHeight;
        pdf.text(`CIF Cliente: ${invoice.cif_cliente}`, 10, yPos);
        yPos += lineHeight;
        pdf.text(`Fecha de vencimiento: ${invoice.fecha_vencimiento}`, 10, yPos);
        yPos += lineHeight;
        pdf.text(`Estado: ${invoice.estado}`, 10, yPos);
        yPos += lineHeight;
        pdf.text(`Base imponible: ${invoice.base_imponible}`, 10, yPos);
        yPos += lineHeight;
        pdf.text(`% IVA: ${invoice.porcentaje_iva}`, 10, yPos);
        yPos += lineHeight;
        pdf.text(`Total IVA: ${invoice.iva_total}`, 10, yPos);
        yPos += lineHeight;
        pdf.text(`Total factura: ${invoice.total_factura}`, 10, yPos);
        yPos += lineHeight;
        pdf.text(`Pedido: ${invoice.pedido}`, 10, yPos);
        yPos += lineHeight;
        pdf.text(`Albarán: ${invoice.albaran}`, 10, yPos);
        yPos += lineHeight;
        pdf.save("invoice.pdf");
      }
    } catch (error) {
      console.error("Error al generar y guardar el PDF:", error);
    }
  };

  return (
    <div>
      <h1 className="text-center mb-4 facturas">Facturas</h1>
      <div className="table-responsive">
        <Table striped bordered responsive hover>
          <thead>
            <tr>
              <th>
                <input
                  type="text"
                  name="nro_factura"
                  value={searchInputs.nro_factura}
                  onChange={handleInputChange}
                  placeholder="Nro Factura"
                  className="large-font"
                />
              </th>
              <th>
                <DatePicker
                  selected={searchInputs.fecha ? new Date(searchInputs.fecha) : null}
                  onChange={date => handleDateChange(date, 'fecha')}
                  placeholderText="Fecha"
                  className="large-font"
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
                <input
                  type="text"
                  name="cif_cliente" 
                  value={searchInputs.cif_cliente}
                  onChange={handleInputChange}
                  placeholder="Cif Cliente"
                  className="large-font"
                />
              </th>
              <th>
              <DatePicker
                 selected={searchInputs.fecha_vencimiento ? new Date(searchInputs.fecha_vencimiento) : null}
                 onChange={(date) => handleDateChange(date, 'fecha_vencimiento')}
                 placeholderText="Fecha de vencimiento"
                 className="large-font"
                 dateFormat="yyyy-MM-dd"
              />
              </th>
              <th>
                <input
                  type="text"
                  name="check"
                  value={searchInputs.estado}
                  onChange={handleInputChange}
                  placeholder="Estado"
                  className="large-font"
                />
              </th>
              <th>
                <input
                  type="text"
                  name="base-imponible"
                  value={searchInputs.base_imponible}
                  onChange={handleInputChange}
                  placeholder="Base imponible"
                  className="large-font"
                />
              </th>
              <th>
                <input
                  type="number"
                  name="% IVA"
                  value={searchInputs.porcentaje_iva}
                  onChange={handleInputChange}
                  placeholder="% IVA"
                  className="large-font"
                />
              </th>
              <th>
                <input
                  type="number"
                  name="iva_total"
                  value={searchInputs.iva_total}
                  onChange={handleInputChange}
                  placeholder="Total IVA"
                  className="large-font"
                />
              </th>
              <th onClick={() => handleSortClick("total_factura")}>
  <span
    onClick={() => handleSortClick("total_factura")}
    style={{ cursor: 'pointer' }}
  >
    Total Factura
    {sortBy.column === "total_factura" && (
      <span>{sortBy.ascending ? "↓" : "↑"}</span>
    )}
  </span>
</th>
              <th>
                <input
                  type="text"
                  name="pedido"
                  value={searchInputs.pedido}
                  onChange={handleInputChange}
                  placeholder="Pedido"
                  className="large-font"
                />
              </th>
              <th onClick={() => handleSortClick("albaran")}>
  <span
    onClick={() => handleSortClick("fecha_pedido")}
    style={{ cursor: 'pointer' }}
  >
    Albaran
    {sortBy.column === "albaran" && (
      <span>{sortBy.ascending ? "↓" : "↑"}</span>
    )}
  </span>
</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.map((invoice) => (
              <tr key={invoice.nro_factura} className="datos">
                <td className="table-data">{invoice.nro_factura}</td>
                <td className="table-data">{invoice.fecha}</td>
                <td className="table-data">{invoice.cliente}</td>
                <td className="table-data">{invoice.cif_cliente}</td>
                <td className="table-data">{invoice.fecha_vencimiento}</td>
                <td className="table-data">{invoice.estado}</td>
                <td className="table-data">{invoice.base_imponible}</td>
                <td className="table-data">{invoice.porcentaje_iva}</td>
                <td className="table-data">{invoice.iva_total}</td>
                <td className="table-data">{invoice.total_factura}</td>
                <td className="table-data">{invoice.pedido}</td>
                <td className="table-data">{invoice.albaran}</td>
                <td className="table-data">
                  <Button
                    variant="secondary"
                    onClick={() => handleShowModal(invoice)}
                  >
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
          {selectedInvoice && (
            <div>
              <p>Número de factura: {selectedInvoice.nro_factura}</p>
              <p>Fecha: {selectedInvoice.fecha}</p>
              <p>Cliente: {selectedInvoice.cliente}</p>
              <p>CIF Cliente: {selectedInvoice.cif_cliente}</p>
              <p>Fecha de vencimiento: {selectedInvoice.fecha_vencimiento}</p>
              <p>Estado: {selectedInvoice.estado}</p>
              <p>Base imponible: {selectedInvoice.base_imponible}</p>
              <p>% IVA: {selectedInvoice.porcentaje_iva}</p>
              <p>Total IVA: {selectedInvoice.iva_total}</p>
              <p>Total factura: {selectedInvoice.total_factura}</p>
              <p>Pedido: {selectedInvoice.pedido}</p>
              <p>Albarán: {selectedInvoice.albaran}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => handleDownloadPDF(selectedInvoice)}>
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
