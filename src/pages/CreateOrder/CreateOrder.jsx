import React, { useState } from "react";
import axios from "axios";
import "./CreateOrder.css";
import jsPDF from "jspdf";
import { RiDownload2Line } from 'react-icons/ri';
import { RiFileTextLine } from 'react-icons/ri';


const CreateOrder = () => {
  const [formData, setFormData] = useState({
    cif_cliente: "",
    base_imponible: ""
  });

  const [errors, setErrors] = useState({});
  const [orderResponse, setOrderResponse] = useState(null);
  const [albaranNumber, setAlbaranNumber] = useState(null); 
  const [showPedidoModal, setShowPedidoModal] = useState(false); 
  const [showAlbaranModal, setShowAlbaranModal] = useState(false); 

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors = {};
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const generateUniqueAlbaranNumber = () => {
    return Math.floor(Math.random() * 1000000) + 1;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post("http://localhost:3000/order/create-order", formData);
        setOrderResponse(response.data);
        setShowPedidoModal(true);
      } catch (error) {
        console.error("Error al crear el pedido:", error);
      }
    }
  };

  const generateAlbaran = async () => {
    try {
      if (!orderResponse) {
        console.error("Error: No se ha creado un pedido válido.");
        return;
      }

      const numeroAlbaran = generateUniqueAlbaranNumber();

      const albaranData = {
        id_albaran: numeroAlbaran,
        id_pedido: orderResponse.id_pedido,
        Firmado: true
      };
      const albaranResponse = await axios.post("http://localhost:3000/delivery-note/create-note", albaranData);
      
      setAlbaranNumber(numeroAlbaran); 
      setShowAlbaranModal(true); 
    } catch (error) {
      console.error("Error al generar el albarán:", error);
    }
  };

  const handleClosePedidoModal = () => {
    setShowPedidoModal(false);
  };

  const handleCloseAlbaranModal = () => {
    setShowAlbaranModal(false);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    try {


      doc.text("Datos del Pedido", 10, 40);
      doc.text(`CIF Cliente: ${formData.cif_cliente}`, 10, 50);
      doc.text(`Base Imponible: ${formData.base_imponible}`, 10, 60);
      if (albaranNumber) {
        doc.text(`Número de Albarán: ${albaranNumber}`, 10, 70);
      }
      doc.save("pedido.pdf");
    } catch (error) {
      console.error("Error al generar el PDF:", error);
    }
  };

  return (
    <div className="create-order-container">
      <h2 className="crear-header">Crear Pedido</h2>
      <form onSubmit={handleSubmit} className="formulario-crear-order">
        <div className="form-group">
          <label>CIF Cliente:</label>
          <input type="text" name="cif_cliente" value={formData.cif_cliente} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Base Imponible:</label>
          <input type="text" name="base_imponible" value={formData.base_imponible} onChange={handleInputChange} />
        </div>
        <button type="submit">Crear Pedido</button>
      </form>
      <div className="button-group">
        <button onClick={generatePDF} className="pdf-create-order"><RiDownload2Line /> Generar PDF</button>
        <button onClick={generateAlbaran} className="create-albaran-order"><RiFileTextLine />Generar Albarán
      </button>
      </div>

      {showPedidoModal && (
        <div className="modal" onClick={handleClosePedidoModal}>
          <div className="modal-content">
            <span className="close">&times;</span>
            <p>¡Pedido creado con éxito!</p>
          </div>
        </div>
      )}

      {showAlbaranModal && (
        <div className="modal" onClick={handleCloseAlbaranModal}>
          <div className="modal-content">
            <span className="close">&times;</span>
            <p>Número de Albarán: {albaranNumber}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateOrder;




















