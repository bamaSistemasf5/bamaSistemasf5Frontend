import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { saveAs } from 'file-saver';
import InvoiceDetail from './InvoiceDetail'; // Componente para mostrar los detalles de la factura

function InvoiceDetail({ invoices }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const handleInvoiceClick = (invoice) => {
    setSelectedInvoice(invoice);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDownloadPDF = () => {
    // Lógica para generar el PDF y descargarlo
    // Aquí puedes utilizar una librería como jsPDF o react-pdf
    // Genera el PDF con la información de la factura seleccionada
    const pdfBlob = generatePDF(selectedInvoice);

    // Descarga el PDF
    saveAs(pdfBlob, `invoice_${selectedInvoice.id}.pdf`);
  };

  return (
    <>
      {/* Tabla de facturas */}
      <table>
        <thead>
          {/* Encabezados de la tabla */}
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id} onClick={() => handleInvoiceClick(invoice)}>
              {/* Celdas de la tabla */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para mostrar detalles de la factura */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Detalle de la Factura</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedInvoice && <InvoiceDetail invoice={selectedInvoice} />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Cerrar</Button>
          <Button variant="primary" onClick={handleDownloadPDF}>Descargar PDF</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default InvoiceDetail;
